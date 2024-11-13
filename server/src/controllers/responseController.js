const prisma = require("../config/db.config")
const InternalServer = require("../exceptions/internal-server")


exports.createRespone = async (req, res) => {
    try {
        const { userId, responses } = req.body;

        // Ensure questionId is treated as an integer
        const responseData = await prisma.response.createMany({
            data: responses.map(response => ({
                userId: userId,
                questionId: parseInt(response.questionId, 10), // Convert questionId to integer
                answerId: response.answerId
            }))
        });

        return res.status(201).json({
            message: "Responses created successfully",
            data: responseData
        });
    } catch (error) {
        InternalServer(res, error);
    }
};

exports.listResponse = async (req, res) => {
    try {
        const responses = await prisma.response.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        title: true,
                        full_name: true,
                        age: true,
                        phone: true
                    }
                },
                question: true,
                answer: true
            },
            orderBy: {
                id: 'desc'  // Sorting by id in descending order
            }
        })

        // Group responses by user ID
        const groupedResponses = responses.reduce((acc, response) => {
            const userId = response.user.id;
            if (!acc[userId]) {
                acc[userId] = {
                    user: response.user,
                    responses: []
                };
            }
            acc[userId].responses.push({
                question: response.question,
                answer: response.answer
            });
            return acc;
        }, {});

        // Convert the object to an array
        const responseArray = Object.values(groupedResponses);

        return res.status(200).json({
            message: "List of responses grouped by user",
            data: responseArray
        });
    } catch (error) {
        InternalServer(res, error);
    }
};


exports.responseByUserId = async (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10); // Ensure the base is 10 for the parseInt

        // Validate the userId to make sure it's a valid number
        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Fetch all responses by the user ID
        const responses = await prisma.response.findMany({
            where: {
                userId: userId // Filter responses by userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        title: true,
                        full_name: true,
                        age: true,
                        phone: true
                    }
                },
                question: true,
                answer: true
            }
        });

        // If no responses found for the user, return a 404 error
        if (responses.length === 0) {
            return res.status(404).json({
                message: "No responses found for this user"
            });
        }

        return res.status(200).json({
            message: "List of responses for the user",
            data: responses // Return all responses for the given user
        });
    } catch (error) {
        // Ensure you have an InternalServer method that handles the error
        InternalServer(res, error);
    }
};

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