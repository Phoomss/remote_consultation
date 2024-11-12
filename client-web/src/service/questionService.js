import http from './http-common'

const questionList = async () => {
    return http.get('/api/question')
}

const questionById = async (questionId) => {
    return http.get(`/api/question/${questionId}`)
}

const createQuestion = async (questionData) => {
    return http.post('/api/question/create', questionData)
}

const updateQuestion = async (questionId, questionData) => {
    return http.put(`/api/question/${questionId}`, questionData)
}

const deleteQuestion = async (questionId) => {
    return http.delete(`/api/question/${questionId}`)
}

const questionService = {
    questionList,
    questionById,
    createQuestion,
    updateQuestion,
    deleteQuestion
}

export default questionService