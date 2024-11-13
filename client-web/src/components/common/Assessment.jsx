import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate สำหรับ React Router v6
import assessmentService from './../../service/assessmentService';

const Assessment = () => {
  const [assessments, setAssessments] = useState([]);
  const [filteredAssessment, setFilteredAssessment] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const navigate = useNavigate(); // สร้าง instance ของ useNavigate

  const fetchAssessments = async () => {
    try {
      const res = await assessmentService.responseList();
      if (res.data.data) {
        setAssessments(res.data.data);
        setFilteredAssessment(res.data.data);  // Initially set filteredAssessment as all assessments
      } else {
        setError("ไม่พบข้อมูลแบบประเมิน");
      }
    } catch (error) {
      setError("ไม่สามารถดึงข้อมูลแบบประเมินได้");
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(filteredAssessment.length / itemsPerPage)));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssessments = filteredAssessment.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredAssessment.length / itemsPerPage);

  // เปลี่ยนฟังก์ชัน handleViewDetails ให้ทำการ redirect ไปยังหน้ารายละเอียด
  const handleViewDetails = (userId) => {
    // เปลี่ยนเส้นทางไปที่หน้ารายละเอียด
    navigate(`/assessment/response/${userId}`); // ส่ง userId ไปยัง URL
  };

  return (
    <div className="tb-assment-response mt-3">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-bordered table-gray table-striped text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">รายชื่อผู้ทำแบบประเมิน</th>
              <th scope="col">รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {currentAssessments.length > 0 ? (
              currentAssessments.map((assessment, index) => (
                <tr key={assessment.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{assessment.user.full_name}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleViewDetails(assessment.user.id)} // ส่ง userId ไปที่ handleViewDetails
                    >
                      ดูรายละเอียด
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">ไม่มีข้อมูลแบบประเมิน</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredAssessment.length > 0 && (
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

export default Assessment;
