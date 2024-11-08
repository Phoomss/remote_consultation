const prisma = require("../config/db.config");
const InternalServer = require("../exceptions/internal-server");

exports.createContent = async (req, res) => {
    try {
        const { content_name, content_detail } = req.body;

        const newContent = await prisma.content.create({
            data: {
                content_name: content_name,
                content_detail: content_detail
            }
        });

        return res.status(201).json({
            message: "Content created successfully",
            data: newContent
        });

    } catch (error) {
        InternalServer(res, error);
    }
};

exports.listContent = async (req, res) => {
    try {
        const count = await prisma.content.count();
        const query = await prisma.content.findMany(
            {
                select: {
                    id: true,
                    content_name: true
                }
            }
        );

        if (!query || query.length === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        return res.status(200).json({
            message: `List of content: ${count} items`,
            data: query
        });
    } catch (error) {
        InternalServer(res, error);
    }
};

exports.contentById = async (req, res) => {
    try {
        const contentId = parseInt(req.params.id)

        if (!contentId) {
            return res.status(400).json({
                message: "Content ID is required"
            });
        }

        const content = await prisma.content.findUnique({ where: { id: contentId } });

        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }

        return res.status(200).json({ data: content });
    } catch (error) {
        InternalServer(res, error);
    }
};

exports.contentUpdate = async (req, res) => {
    try {
        const contentId = parseInt(req.params.id);
        const { content_name, content_detail } = req.body;

        if (!contentId) {
            return res.status(400).json({
                message: "Content ID is required"
            });
        }

        const updateData = {};

        if (content_name !== undefined) {
            updateData.content_name = content_name;
        }

        if (content_detail !== undefined) {
            updateData.content_detail = content_detail;
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "No fields provided to update"
            });
        }

        const contentUpdate = await prisma.content.update({
            where: {
                id: contentId
            },
            data: updateData
        });

        return res.status(200).json({
            message: "Content updated successfully",
            data: contentUpdate
        });
    } catch (error) {
        InternalServer(res, error);
    }
};

exports.contentDelete = async (req, res) => {
    try {
        const contentId = parseInt(req.params.id)

        if (!contentId) {
            return res.status(400).json({
                message: "Content ID is required"
            });
        }

        await prisma.content.delete({
            where: {
                id: contentId
            }
        });

        return res.status(200).json({
            message: "Content deleted successfully"
        });
    } catch (error) {
        InternalServer(res, error);
    }
};
