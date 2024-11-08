import http from './http-commo'

const contentList = async () => {
    return http.get('/api/content/')
}

const contentDetail = async (id) => {
    return http.get(`/api/content/${id}`)
}

const contentService = {
    contentList,
    contentDetail
}

export default contentService