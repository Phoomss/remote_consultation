import http from './http-commo'

const searchAnswer = async (questionId) => {
    return http.get(`/api/answer/search?questionId=${questionId}`);
}

const questionList = async () => {
    return http.get('/api/question')
}

const createResponse = async(responseData)=>{
    return http.post('/api/response/create',responseData)
}

const assessmentService = {
    searchAnswer,
    questionList,
    createResponse
}

export default assessmentService