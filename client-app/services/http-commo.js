import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const defaultOptions = {
    baseURL: "http://10.0.2.2:8080/", 
    headers: {
        "Content-Type": "application/json",
    },
};

let instance = axios.create(defaultOptions);

instance.interceptors.request.use(async function (config) {
    const token = await AsyncStorage.getItem("userToken");  
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
