const prisma = require("../config/db.config")
const InternalServer = require("../exceptions/internal-server")


exports.createRespone = async (req, res) => {
    try {
        const { userId, responses } = req.body

        const responseData = await prisma.response.createMany({
            data: responses.map(response => ({
                userId: userId,
                questionId: response.questionId,
                answerId: response.answerId
            }))
        })

        return res.status(201).json({
            message: "Responses created successfully",
            data: responseData
        })
    } catch (error) {
        InternalServer(res, error)
    }
}

exports.listResponse = async (req, res) => {
    try {
        const responses = await prisma.response.findMany({
            include: {
                user: true,
                question: true,
                answer: true
            }
        })

        return res.status(200).json({
            message: "List of responses",
            data: responses
        })
    } catch (error) {
        InternalServer(res, error)
    }
}

exports.responseById = async (req, res) => {
    try {
        const responseId = parseInt(req.params.id)

        const response = await prisma.response.findUnique({
            where: {
                id: responseId
            },
            include: {
                user: true,
                question: true,
                answer: true
            }
        })

        if (!response) {
            return res.status(404).json({ message: "Response not found" })
        }

        return res.status(200).json({
            message: "Response details",
            data: response
        })
    } catch (error) {
        InternalServer(res, error)
    }
}

exports.updateResponse = async (req, res) => {
    try {
        const responseId = parseInt(req.params.id)
        const { questionId, answerId } = req.body

        const updatedResponse = await prisma.response.update({
            where: { id: responseId },
            data: { questionId, answerId }
        })

        return res.status(200).json({
            message: "Response updated successfully",
            data: updatedResponse
        })
    } catch (error) {
        InternalServer(res, error)
    }
}

exports.deleteResponse = async (req, res) => {
    try {
        const responseId = parseInt(req.params.id)

        const deletedResponse = await prisma.response.delete({
            where: { id: responseId }
        })

        return res.status(200).json({
            message: "Response deleted successfully",
            data: deletedResponse
        })
    } catch (error) {
        InternalServer(res, error)
    }
}