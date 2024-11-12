const prisma = require("../config/db.config")
const InternalServer = require("../exceptions/internal-server")

exports.createAnswer = async (req, res) => {
    try {
        // Destructure the data from the request body
        const { questionId, answerTexts } = req.body;

        // Ensure questionId is an integer
        const parsedQuestionId = parseInt(questionId, 10);

        // Check if parsedQuestionId is a valid number
        if (isNaN(parsedQuestionId)) {
            return res.status(400).json({ message: "Invalid question ID provided." });
        }

        // Check if answerTexts is an array and not empty
        if (!Array.isArray(answerTexts) || answerTexts.length === 0) {
            return res.status(400).json({ message: "คำตอบไม่สามารถเป็นค่าว่างหรือไม่ถูกต้อง" });
        }

        // Insert multiple answers into the database
        const insert = await prisma.answer.createMany({
            data: answerTexts.map(text => ({
                questionId: parsedQuestionId,  // Use the parsed integer here
                answer_text: text
            }))
        });

        return res.status(201).json({
            message: "Answers created successfully",
            data: insert
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "เกิดข้อผิดพลาด!" });
    }
};

exports.listAnswer = async (req, res) => {
    try {
        const query = await prisma.answer.findMany({
            include: {
                question: {
                    select: {
                        ques_name: true
                    }
                }
            }
        })

        // Corrected response
        return res.status(200).json({
            data: query
        })
    } catch (error) {
        // Assuming InternalServer handles the response properly
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

exports.searchAnswer = async (req, res) => {
    try {
        const { questionId } = req.query;

        // Create an empty where clause
        const whereClause = {};

        // Check if questionId is provided and filter accordingly
        if (questionId) {
            whereClause.questionId = parseInt(questionId);  // Ensure questionId is treated as an integer
            // console.log('Parsed questionId:', whereClause.questionId);  // Log for debugging
        }

        // Use findMany to retrieve all matching answers, allowing for filtering
        const answers = await prisma.answer.findMany({
            where: whereClause,
            include: {
                question: {
                    select: {
                        ques_name: true,
                        id: true
                    }
                }
            }
        });

        // Log the answers to check the result
        // console.log('Found answers:', answers);

        // If no answers are found, return a 404 response
        if (answers.length === 0) {
            return res.status(404).json({ message: "Answers not found" });
        }

        // Return the found answers
        return res.status(200).json({
            data: answers
        });
    } catch (error) {
        // Call the InternalServer function to handle errors
        InternalServer(res, error);
    }
};

exports.updateAnswer = async (req, res) => {
    try {
        const answerId = parseInt(req.params.id);
        const { answer_text } = req.body;

        if (!answerId) {
            return res.status(404).json({ message: "Answer not found" });
        }

        const updatedAnswer = await prisma.answer.update({
            where: { id: answerId },
            data: {
                answer_text: answer_text
            }
        });

        console.log(updatedAnswer);
        return res.status(200).json({
            message: "Answer updated successfully",
            data: updatedAnswer
        });
    } catch (error) {
        InternalServer(res, error);
    }
};


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