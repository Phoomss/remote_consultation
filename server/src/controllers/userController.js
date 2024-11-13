const prisma = require("../config/db.config");
const InternalServer = require("../exceptions/internal-server");
const { hashPassword } = require("../helpers/hashPassword");

exports.userInfo = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        res.status(200).json({ message: "User info retrieved successfully", data: req.user });
    } catch (error) {
        InternalServer(res, error);
    }
};

exports.editProfile = async (req, res) => {
    const { title, full_name, phone, age, username, password } = req.body;
    const userId = req.user.id; // Assuming `req.user` has the logged-in user info

    try {
        const existingUsername = await prisma.user.findFirst({
            where: { username, id: { not: userId } } // Exclude the current user
        });

        const existingPhone = await prisma.user.findFirst({
            where: { phone, id: { not: userId } } // Exclude the current user
        });

        if (existingUsername) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        if (existingPhone) {
            return res.status(409).json({ message: 'Phone number already exists' });
        }

        const parsedAge = parseInt(age);

        if (isNaN(parsedAge)) {
            return res.status(400).json({ message: 'Invalid age value' });
        }

        const hashedPassword = await hashPassword(password);

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                title,
                full_name,
                phone,
                age: parsedAge,
                username,
                password: hashedPassword,
            },
        });

        res.status(200).json({
            message: "Profile updated successfully!",
            data: updatedUser,
        });
    } catch (error) {
        InternalServer(res, error);
    }
};
