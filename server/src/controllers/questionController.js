const prisma = require("../config/db.config")
const InternalServer = require("../exceptions/internal-server")

exports.createQuestion = async (req, res) => {
    try {
        const { ques_name } = req.body

        const Insert = await prisma.question.create({
            data: {
                ques_name: ques_name
            }
        })

        return res.status(201).json({
            message: "Question created",
            data: Insert
        })
    } catch (error) {
        InternalServer(res, error)
    }
}

exports.listQuestion = async (req, res) => {
    try {
        const query = await prisma.question.findMany()

        return res.status(200).json({
            data: query
        })
    } catch (error) {
        InternalServer(res, error)
    }
}

exports.questionById = async (req, res) => {
    try {
        const questionId = parseInt(req.params.id)

        if (!questionId) {
            return res.status(404).json({ message: "Question not found" })
        }

        const questionById = await prisma.question.findUnique({
            where: { id: questionId }
        })

        if (!questionById) {
            return res.status(404).json({ message: "Question not found" })
        }

        return res.status(200).json({
            data: questionById
        })
    } catch (error) {
        InternalServer(res, error)
    }
}

exports.updateQuestion = async (req, res) => {
    try {
        const questionId = parseInt(req.params.id)
        const { ques_name } = req.body

        if (!questionId) {
            return res.status(404).json({ message: "Question not found" })
        }

        const updatedQuestion = await prisma.question.update({
            where: { id: questionId },
            data: { ques_name }
        })

        return res.status(200).json({
            message: "Question updated",
            data: updatedQuestion
        })
    } catch (error) {
        InternalServer(res, error)
    }
}

exports.deleteQuestion = async (req, res) => {
    try {
        const questionId = parseInt(req.params.id)

        if (!questionId) {
            return res.status(404).json({ message: "Question not found" })
        }

        await prisma.question.delete({
            where: { id: questionId }
        })

        return res.status(200).json({
            message: "Question deleted"
        })
    } catch (error) {
        InternalServer(res, error)
    }
}
