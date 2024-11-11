import http from './http-common'

const userInfo = () => {
    const token = localStorage.getItem("token");
    if (token) {
        http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return http.get("/api/user/userInfo");
};

const userService = {
    userInfo,
}

export default userService;