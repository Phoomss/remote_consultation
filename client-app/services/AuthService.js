import http from './http-commo'

const login = async (LoginData) => {
    return http.post('/api/auth/login', LoginData)
}

const signup = (signupData) => {
    return http.post('/api/auth/signup', signupData)
}

const authService = {
    login,
    signup,
}

export default authService