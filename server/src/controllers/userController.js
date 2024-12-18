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

        const updatedData = {
            title,
            full_name,
            phone,
            age: parsedAge,
            username,
        };

        // Check if password is provided for update
        if (password) {
            const hashedPassword = await hashPassword(password);
            updatedData.password = hashedPassword;
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updatedData,
        });
        console.log(updatedUser)
        res.status(200).json({
            message: "Profile updated successfully!",
            data: updatedUser,
        });
    } catch (error) {
        InternalServer(res, error);
    }
};

exports.userList = async (req, res) => {
    try {
        const query = await prisma.user.findMany();

        res.status(200).json({ message: "User list retrieved successfully", data: query });
    } catch (error) {
        InternalServer(res, error);
    }
}

exports.userById = async (req, res) => {
    try {
        const userId = parseInt(req.params.id)
        const query = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        res.status(200).json({ message: "User list retrieved successfully", data: query });
    } catch (error) {
        InternalServer(res, error);
    }
}

exports.searchUser = async (req, res) => {
    try {
        const { role } = req.query;

        const whereClause = {};
        if (role) {
            whereClause.role = role;
        }

        const query = await prisma.user.findMany({ where: whereClause });

        if (query.length === 0) {
            return res.status(404).json({
                status_code: 404,
                msg: 'User not found'
            });
        }

        res.status(200).json({ message: "User search retrieved successfully", data: query });
    } catch (error) {
        InternalServer(res, error);
    }
}

exports.updateUser = async (req, res) => {
    const { title, full_name, phone, age, username, password } = req.body;
    const userId = parseInt(req.params.id); // รับ id ของผู้ใช้ที่ต้องการอัพเดตจาก URL params

    try {
        // ตรวจสอบว่ามีชื่อผู้ใช้หรือเบอร์โทรที่ซ้ำกันในระบบหรือไม่ (ยกเว้นผู้ใช้ที่กำลังอัพเดต)
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

        // ตรวจสอบว่า age เป็นค่าที่ถูกต้องหรือไม่
        const parsedAge = parseInt(age);
        if (isNaN(parsedAge)) {
            return res.status(400).json({ message: 'Invalid age value' });
        }

        // เตรียมข้อมูลที่จะอัพเดต
        const updatedData = {
            title,
            full_name,
            phone,
            age: parsedAge,
            username,
        };

        // หากมีการเปลี่ยนรหัสผ่าน ก็จะทำการแฮชรหัสผ่านใหม่
        if (password) {
            const hashedPassword = await hashPassword(password);
            updatedData.password = hashedPassword;
        }

        // อัพเดตข้อมูลผู้ใช้ในฐานข้อมูล
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updatedData,
        });

        // ส่งข้อมูลกลับไปที่ client
        res.status(200).json({
            message: "User updated successfully!",
            data: updatedUser,
        });
    } catch (error) {
        InternalServer(res, error);
    }
};

exports.countUser = async (req, res) => {
    try {
      // นับจำนวนผู้ใช้ทั้งหมด
      const totalUsers = await prisma.user.count({
        where: {
          role: {
            in: ['USER', 'OFFICER', 'COUNSELOR'] // เฉพาะ role ที่ระบุ
          }
        }
      });
  
      // นับจำนวนผู้ใช้แยกตาม role
      const query = await prisma.user.groupBy({
        by: ['role'],
        _count: {
          role: true
        },
        where: {
          role: {
            in: ['USER', 'OFFICER', 'COUNSELOR']
          }
        }
      });
  
      // ถ้าไม่พบข้อมูล
      if (!query || query.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
  
      // ส่งข้อมูลกลับไปพร้อมจำนวนผู้ใช้ทั้งหมด
      return res.status(200).json({
        message: "List of user retrieved successfully",
        data: query,
        totalUsers: totalUsers // จำนวนผู้ใช้ทั้งหมด
      });
    } catch (error) {
      InternalServer(res, error);
    }
  };
  