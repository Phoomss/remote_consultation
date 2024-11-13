import http from './http-common'

const responseList = () => {
    return http.get('/api/response/')
}

const responseDetail = async (responseId, userId) => {
    return http.get(`/api/response/${responseId}/user/${userId}`)
}

const assessmentService = {
    responseList,
    responseDetail
}

export default assessmentService