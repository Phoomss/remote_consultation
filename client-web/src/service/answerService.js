import http from './http-common'

const searchAnswer = async (questionId) => {
    return http.get(`/api/answer/search?questionId=${questionId}`);
}

const answerList = async () => {
    return http.get('/api/answer')
}

const answerById = async (answerId) => {
    return http.get(`/api/answer/${answerId}`)
}

const createAnswer = async (answerData) => {
    return http.post('/api/answer/create', answerData)
}

const updateAnswer = async (answerData, answerId) => {
    return http.put(`/api/answer/${answerId}`, answerData)
}

const deleteAnswer = async (answerId) => {
    return http.delete(`/api/answer/${answerId}`)
}

const answerService = {
    answerList,
    answerById,
    createAnswer,
    updateAnswer,
    deleteAnswer,
    searchAnswer
}

export default answerService