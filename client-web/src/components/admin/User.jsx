import React, { useEffect, useState } from 'react';
import userService from './../../service/userService';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const navigate = useNavigate()

  // ดึงข้อมูลผู้ใช้จาก API
  const fetchUser = async () => {
    try {
      const res = await userService.userList();
      setUsers(res.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUser(); // เรียก fetchUser เมื่อ component โหลดครั้งแรก
  }, []);

  // คำนวณข้อมูลที่จะแสดงในหน้าปัจจุบัน
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  // ฟังก์ชันการจัดการการเปลี่ยนหน้า
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // ฟังก์ชันการไปหน้าถัดไป
  const handleNextPage = () => {
    if (currentPage < Math.ceil(users.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // ฟังก์ชันการกลับไปหน้าก่อนหน้า
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = async (userId) => {
    navigate(`/admin/user/detail/${userId}`)
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped text-center">
        <thead className="table-gray">
          <tr>
            <th scope="col">#</th>
            <th scope="col">ชื่อ</th>
            <th scope="col">เบอร์โทร</th>
            <th scope="col">สถานะ</th>
            <th scope="col">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td>{user.full_name}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn btn-primary btn-sm" onClick={() => handleEdit(user.id)}>แก้ไข</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">ไม่พบข้อมูลผู้ใช้</td>
            </tr>
          )}
        </tbody>
      </table>


      {/* Pagination */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handlePreviousPage}>ก่อนหน้า</button>
          </li>
          {Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageClick(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === Math.ceil(users.length / itemsPerPage) ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handleNextPage}>ถัดไป</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default User;
