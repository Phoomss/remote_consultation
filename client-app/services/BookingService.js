import AsyncStorage from '@react-native-async-storage/async-storage'
import http from './http-commo'

const bookingInfo = async () => {
    const token = AsyncStorage.getItem('userToken')
    if (token) {
        http.defaults.headers.common['Authorization'] = token
    }

    const res = await http.get('/api/booking/info')

    return res.data.data
}

const createBooking = async (bookingData) => {
    return http.post('/api/booking/create', bookingData)
}

const bookingService = {
    bookingInfo,
    createBooking
}

export default bookingService