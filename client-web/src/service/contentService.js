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

const createContent = async (contentData) => {
    return http.post('/api/content/create', contentData)
}

const updateContent = async (contentId, contentData) => {
    // Send content data in the body of the PUT request
    return http.put(`/api/content/${contentId}`, contentData)
}

const contentService = {
    contentList,
    contentDetail,
    deteleContent,
    createContent,
    updateContent
}

export default contentService
