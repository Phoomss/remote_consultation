import http from './http-commo'

const contentList = async () => {
    return http.get('/api/content/')
}

const contentDetail = async (contentId) => {
    return http.get(`/api/content/${contentId}`)
}

const contentService = {
    contentList,
    contentDetail
}

export default contentService