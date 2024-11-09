const prisma = require("../config/db.config")
const InternalServer = require("../exceptions/internal-server")

exports.createBooking = async (req, res) => {
    try {
        // Destructuring input from the request body
        const { userId, booking_type, booking_detail, appointment } = req.body;

        // Make sure appointment is a valid date
        const parsedAppointment = new Date(appointment);

        // Check if the appointment date is valid
        if (isNaN(parsedAppointment)) {
            return res.status(400).json({ message: "Invalid appointment date" });
        }

        // Create the new booking in the database using Prisma
        const newBooking = await prisma.booking.create({
            data: {
                userId: userId,
                booking_type: booking_type,
                booking_detail: booking_detail,
                appointment: parsedAppointment // Using the parsed date
            }
        });

        return res.status(201).json({
            message: "Booking created successfully",
            data: newBooking
        });
    } catch (error) {
        // Handling errors (e.g., database issues)
        InternalServer(res, error);
    }
};


exports.listBooking = async (req, res) => {
    try {
        const query = await prisma.booking.findMany({
            include: {
                user: {
                    select: {
                        title: true,
                        full_name: true,
                        phone: true
                    }
                }
            }
        })

        if (!query || query.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }

        return res.status(200).json({
            message: "List of bookings retrieved successfully",
            data: query
        });
    } catch (error) {
        InternalServer(res, error)
    }
}

exports.bookingById = async (req, res) => {
    try {
        const bookingId = parseInt(req.params.id)

        const query = await prisma.booking.findMany({
            where: {
                id: bookingId
            },
            include: {
                user: {
                    select: {
                        title: true,
                        full_name: true,
                        phone: true
                    }
                }
            }
        })

        if (!query || query.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }

        return res.status(200).json({
            message: "List of bookings retrieved successfully",
            data: query
        });

    } catch (error) {
        InternalServer(res, error)
    }
}

// ฟังก์ชันสำหรับการอัปเดตข้อมูลการจอง
exports.bookingUpdate = async (req, res) => {
    try {
        const bookingId = parseInt(req.params.id);
        const { booking_type, booking_detail, appointment } = req.body;

        // ตรวจสอบว่ามีข้อมูลที่ต้องการอัปเดตหรือไม่
        if (!booking_type && !booking_detail && !appointment) {
            return res.status(400).json({ message: "No update fields provided" });
        }

        // อัปเดตข้อมูลการจอง
        const updatedBooking = await prisma.booking.update({
            where: { id: bookingId },
            data: {
                booking_type: booking_type || undefined, // ถ้าไม่ส่งค่ามาก็ไม่อัปเดต
                booking_detail: booking_detail || undefined,
                appointment: appointment ? new Date(appointment) : undefined, // แปลงวันที่หากได้รับ
            }
        });

        return res.status(200).json({
            message: "Booking updated successfully",
            data: updatedBooking
        });
    } catch (error) {
        InternalServer(res, error)
    }
};

// ฟังก์ชันสำหรับการลบข้อมูลการจอง
exports.bookingDelete = async (req, res) => {
    try {
        const bookingId = parseInt(req.params.id);

        // ตรวจสอบว่ามีการจองที่ต้องการลบหรือไม่
        const bookingToDelete = await prisma.booking.findUnique({
            where: { id: bookingId }
        });

        if (!bookingToDelete) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // ลบการจองจากฐานข้อมูล
        await prisma.booking.delete({
            where: { id: bookingId }
        });

        return res.status(200).json({
            message: "Booking deleted successfully"
        });
    } catch (error) {
        InternalServer(res, error)
    }
};
