import React, { useEffect, useState } from 'react';
import bookingService from './../../service/bookingService';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBooking, setFilteredBooking] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchType, setSearchType] = useState(""); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await bookingService.bookingList();
        setBookings(res.data.data);
        setFilteredBooking(res.data.data);
      } catch (error) {
        setError("เกิดข้อผิดพลาดในการดึงข้อมูลคอนเทนท์");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filter bookings based on booking_type
    if (searchType) {
      const filtered = bookings.filter(booking => booking.booking_type === searchType);
      setFilteredBooking(filtered);
      setCurrentPage(1); // Reset to first page on new filter
    } else {
      setFilteredBooking(bookings); // Show all if no filter
    }
  }, [searchType, bookings]);

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(filteredBooking.length / itemsPerPage)));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBooking.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredBooking.length / itemsPerPage);

  return (
    <div className='tb-content mt-3'>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Search Dropdown for booking_type */}
      <div className="mb-3">
        <label htmlFor="bookingType" className="form-label">ค้นหาตามประเภทการนัดหมาย:</label>
        <select
          id="bookingType"
          className="form-select"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="">ทั้งหมด</option>
          <option value="bloodTest">จองคิวเจาะเลือด</option>
          <option value="consult">จองคิวปรึกษา</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-gray table-striped text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ข้อมูลผู้นัดหมาย</th>
              <th scope="col">ประเภทการนัดหมาย</th>
              <th scope="col">วันที่และเวลานัดหมาย</th>
              <th scope="col">รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.length > 0 ? (
              currentBookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>
                    <div>{booking.user.title}{booking.user.full_name}</div>
                    <div>โทรศัพท์: {booking.user.phone}</div>
                  </td>
                  <td>{booking.booking_type === 'bloodTest' ? 'จองคิวเจาะเลือด' : 'จองคิวปรึกษา'}</td>
                  <td>{new Date(booking.appointment).toLocaleString()}</td>
                  <td>{booking.booking_detail}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">ไม่พบข้อมูล</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredBooking.length > 0 && (
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handlePreviousPage}>ก่อนหน้า</button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageClick(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handleNextPage}>ถัดไป</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Booking;
