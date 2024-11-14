import AsyncStorage from '@react-native-async-storage/async-storage';
import http from './http-commo'

const caseuserInfo = () => {
    const token = AsyncStorage.getItem('userToken')
    if (token) {
        http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return http.get("/api/case/info/user");
};

const caseService = {
    caseuserInfo
}

export default caseService