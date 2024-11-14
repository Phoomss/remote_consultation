import http from './http-common'

const createCase = async (caseData) => {
    return http.post('/api/case/create', caseData)
}

const caseInfo = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        http.defaults.headers.common['Authorization'] = token
    }

    const res = await http.get('/api/case/info')

    return res.data.data
}

const caseList = async () => {
    return http.get('/api/case')
}

const caseDetail = async (caseId) => {
    return http.get(`/api/case/${caseId}`)
}

const updateCase = async (caseId, caseData) => {
    return http.put(`/api/case/${caseId}`, caseData)
}

const deleteCase = async (caseId) => {
    return http.delete(`/api/case/${caseId}`)
}

const caseService = {
    createCase,
    caseInfo,
    caseList,
    caseDetail,
    updateCase,
    deleteCase
}

export default caseService