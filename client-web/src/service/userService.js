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

const searchRolePhysician = () => {
    return http.get('/api/user/search?role=PHYSICIAN')
}

const editProfile = async (profileData) => {
    return http.put('/api/user/editProfile', profileData)
}
const userService = {
    userInfo,
    userList,
    searchRolePhysician,
    editProfile
}

export default userService;