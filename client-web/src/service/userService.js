import http from './http-common'

const userInfo = () => {
    const token = localStorage.getItem("token");
    if (token) {
        http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return http.get("/api/user/userInfo");
};

const userList = () => {
    return http.get('/api/user')
}

const userCount = () => {
    return http.get('/api/user/count')
}

const searchRolePhysician = () => {
    return http.get('/api/user/search?role=COUNSELOR')
}

const userById = async (userId) => {
    return http.get(`/api/user/${userId}`)
}

const updateUser = async (userData, userId) => {
    return http.put(`/api/user/${userId}`, userData)
}

const editProfile = async (profileData) => {
    return http.put('/api/user/editProfile', profileData)
}
const userService = {
    userInfo,
    userList,
    userCount,
    searchRolePhysician,
    userById,
    updateUser,
    editProfile
}

export default userService;