import http from './http-common'

const contentList = async () => {
    return http.get('/api/content/')
}

const contentDetail = async (contentId) => {
    return http.get(`/api/content/${contentId}`)
}

const deteleContent = async (contentId) => {
    return http.delete(`/api/content/${contentId}`)
}

const contentService = {
    contentList,
    contentDetail,
    deteleContent
}

export default contentService