const prisma = require("../config/db.config")
const InternalServer = require("../exceptions/internal-server")

exports.createAnswer = async (req, res) => {
    try {
        const { questionId, anwerTexts } = req.body

        const Insert = await prisma.answer.createMany({
            data: anwerTexts.map(text => ({
                questionId: questionId,
                anwerTexts: text
            }))
        })

        return res.status(201).json({
            message: "Answers created successfully",
            data: Insert
        })
    } catch (error) {
        InternalServer(res, error)
    }
}

exports.listAnswer = async (req, res) => {
    try {
        const query = await prisma.answer.findMany(
            {
                include: {
                    question: {
                        select: {
                            ques_name: true
                        }
                    }
                }
            }
        )

        return res.json(200).json({
            data: query
        })
    } catch (error) {
        InternalServer(res, error)
    }
}

exports.answerById = async (req, res) => {
    try {
        const answerId = parseInt(req.params.id)

        if (!answerId) {
            return res.status(404).json({ message: "Answer not found" })
        }

        const answer = await prisma.answer.findUnique({
            where: { id: answerId },
            include: {
                question: {
                    select: {
                        ques_name: true
                    }
                }
            }
        })

        if (!answer) {
            return res.status(404).json({ message: "Answer not found" })
        }

        return res.status(200).json({
            data: answer
        })
    } catch (error) {
        InternalServer(res, error)
    }
}

exports.updateAnswer = async (req, res) => {
    try {
        const answerId = parseInt(req.params.id)
        const { answer_text } = req.body

        if (!answerId) {
            return res.status(404).json({ message: "Answer not found" })
        }

        const updatedAnswer = await prisma.answer.update({
            where: { id: answerId },
            data: { answer_text }
        })

        return res.status(200).json({
            message: "Answer updated successfully",
            data: updatedAnswer
        })
    } catch (error) {
        InternalServer(res, error)
    }
}

exports.deleteAnswer = async (req, res) => {
    try {
        const answerId = parseInt(req.params.id)

        if (!answerId) {
            return res.status(404).json({ message: "Answer not found" })
        }

        await prisma.answer.delete({
            where: { id: answerId }
        })

        return res.status(200).json({
            message: "Answer deleted successfully"
        })
    } catch (error) {
        InternalServer(res, error)
    }
}