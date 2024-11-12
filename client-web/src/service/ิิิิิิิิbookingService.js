import http from './http-common'

const bookingList = async () => {
    return http.get('/api/booking')
}

const countBookingType = async()=>{
    return http.get('/api/booking/count')
}

const deleteBooking = async (bookingId) => {
    return http.get(`/api/booking/${bookingId}`)
}

const bookingService = {
    bookingList,
    countBookingType,
    deleteBooking
}

export default bookingService