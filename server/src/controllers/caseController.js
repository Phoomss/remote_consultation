const prisma = require("../config/db.config")
const InternalServer = require("../exceptions/internal-server")

exports.createCase = async (req, res) => {
    try {
        const { bookingId, officerId, physicainId } = req.body

        const newCase = prisma.case.create({
            data: {
                bookingId: bookingId,
                officerId: officerId,
                physicianId: physicainId,
                case_status: 'notAccepting'
            }
        })

        return res.status(201).json({
            message: "Case created successfully",
            data: newCase
        });
    } catch (error) {
        InternalServer(res, error)
    }
}

exports.caseList = async (req, res) => {
    try {
        const query = await prisma.case.findMany({
            include: {
                officer: {
                    select: {
                        title: true,
                        full_name: true,
                        phone: true,
                        role: true
                    }
                },
                physician: {
                    select: {
                        title: true,
                        full_name: true,
                        phone: true,
                        role: true
                    }
                },
                booking: {
                    select: {
                        booking_type: true,
                        booking_detail: true,
                        appointment: true,
                        user: {
                            select: {
                                title: true,
                                full_name: true,
                                phone: true
                            }
                        }
                    }
                }
            }
        });

        return res.status(200).json({
            message: "List of cases",
            data: query
        });
    } catch (error) {
        InternalServer(res, error);
    }
};


exports.caseById = async (req, res) => {
    try {
        const caseId = parseInt(req.params.id);

        // ตรวจสอบว่ามี caseId หรือไม่
        if (!caseId) {
            return res.status(400).json({ message: "Case ID is required" });
        }

        // ค้นหาข้อมูล case ตาม caseId และรวมข้อมูลที่เกี่ยวข้อง
        const caseData = await prisma.case.findUnique({
            where: {
                id: caseId
            },
            include: {
                officer: {
                    select: {
                        title: true,
                        full_name: true,
                        phone: true,
                        role: true
                    }
                },
                physician: {
                    select: {
                        title: true,
                        full_name: true,
                        phone: true,
                        role: true
                    }
                },
                booking: {
                    select: {
                        user: {
                            select: {
                                title: true,
                                full_name: true,
                                phone: true,
                            }
                        },
                        booking_type: true,
                        booking_detail: true,
                        appointment: true
                    }
                }
            }
        });

        // หากไม่พบ case
        if (!caseData) {
            return res.status(404).json({ message: "Case not found" });
        }

        // ส่งผลลัพธ์กลับ
        return res.status(200).json({ data: caseData });
    } catch (error) {
        InternalServer(res, error);
    }
};

exports.updateCase = async (req, res) => {
    try {
        const caseId = parseInt(req.params.id);
        const { bookingId, officerId, physicianId, case_status } = req.body;

        // ตรวจสอบว่ามี caseId หรือไม่
        if (!caseId) {
            return res.status(400).json({ message: "Case ID is required" });
        }

        // อัพเดตข้อมูลเคส
        const updatedCase = await prisma.case.update({
            where: {
                id: caseId
            },
            data: {
                bookingId: bookingId,
                officerId: officerId,
                physicianId: physicianId,
                case_status: case_status
            }
        });

        // ส่งข้อมูลเคสที่อัพเดตกลับไป
        return res.status(200).json({
            message: "Case updated successfully",
            data: updatedCase
        });
    } catch (error) {
        InternalServer(res, error);
    }
};


exports.deleteCase = async (req, res) => {
    try {
        const caseId = parseInt(req.params.id);

        // ตรวจสอบว่ามี caseId หรือไม่
        if (!caseId) {
            return res.status(400).json({ message: "Case ID is required" });
        }

        // ลบข้อมูลเคส
        await prisma.case.delete({
            where: {
                id: caseId
            }
        });

        // ส่งข้อความยืนยันว่าลบสำเร็จ
        return res.status(200).json({ message: "Case deleted successfully" });
    } catch (error) {
        InternalServer(res, error);
    }
};

