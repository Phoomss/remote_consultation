const { JWT_SECRET } = require("../../constants")
const prisma = require("../config/db.config")
const { hashPassword, comparePassword } = require("../helpers/hashPassword")
const jwt = require('jsonwebtoken')

const InternalServer = (res, error) => {
    console.log('Error:', error);
    return res.status(500).json({
        message: "Internal Server Error",
        error: error.message
    });
};

exports.singup = async (req, res, next) => {
    const { title, full_name, phone, age, username, password } = req.body

    try {
        const existingUsername = await prisma.user.findFirst({
            where: { username }
        })

        const existingPhone = await prisma.user.findFirst({
            where: { phone }
        })

        if (existingUsername) {
            return res.status(409).json({
                message: 'Username already exists'
            });
        }

        if (existingPhone) {
            return res.status(409).json({
                message: 'Phone already exists'
            });
        }

        const hashedPassword = await hashPassword(password)

        const newUser = await prisma.user.create({
            data: {
                title,
                full_name,
                phone,
                age,
                username,
                password: hashedPassword,
                role: "USER"
            }
        })

        res.status(201).json({
            message: "User registered successfully!",
            data: newUser,
        });
    } catch (error) {
        InternalServer(res, error)
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body

    try {
        const userWithIdentifier = await prisma.user.findFirst({
            where: { username }
        })

        if (!userWithIdentifier) {
            return res.status(401).json({
                message: 'Username not found'
            });
        }

        const matchPassword = await comparePassword(
            password,
            userWithIdentifier.password
        )

        if (!matchPassword) {
            return res.status(401).json({
                message: "Incorect password"
            })
        }

        const jwtToken = jwt.sign({
            userId: userWithIdentifier.id,
            username: userWithIdentifier.username
        },
            JWT_SECRET
        )

        res.status(200).json({
            message: "Login success",
            data: {
                full_name: userWithIdentifier.full_name,
                username: userWithIdentifier.username,
                token: jwtToken
            }
        })
    } catch (error) {
        InternalServer(res, error)
    }
}

exports.initializeAdminUser = async () => {
    try {
        const adminUser = await prisma.user.findFirst({
            where: { username: 'admin' }
        });

        if (!adminUser) {
            const hashedPassword = await hashPassword('admin1234');
            await prisma.user.create({
                data: {
                    title: 'Admin',
                    full_name: 'System Administrator',
                    phone: '0000000000',
                    age: 30,
                    username: 'admin',
                    password: hashedPassword,
                    role: 'ADMIN'
                }
            });
            console.log('Admin user created successfully!');
        } else {
            console.log('Admin user already exists.');
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};
