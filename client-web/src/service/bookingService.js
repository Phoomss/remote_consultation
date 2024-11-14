import http from './http-common'

const bookingList = async () => {
    return http.get('/api/booking')
}

const searchBookingConsult = async () => {
    return http.get('/api/booking/search?booking_type=consult')
}

const countBookingType = async () => {
    return http.get('/api/booking/count')
}

const deleteBooking = async (bookingId) => {
    return http.get(`/api/booking/${bookingId}`)
}

const bookingService = {
    bookingList,
    countBookingType,
    searchBookingConsult,
    deleteBooking
}

export default bookingService