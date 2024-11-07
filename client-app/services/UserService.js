import AsyncStorage from '@react-native-async-storage/async-storage';
import http from './http-commo'

const userInfo = () => {
    const token = AsyncStorage.getItem('userToken')
    if (token) {
        http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return http.get("/api/user/userInfo");
};

const userService = {
    userInfo,
}

export default userService;