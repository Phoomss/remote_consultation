import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import assessmentService from './../../service/assessmentService';
import DatePicker from 'react-datepicker'; // Import react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for react-datepicker

const AssessmentDetail = () => {
  const { responseId, userId } = useParams();
  const [assessmentDetail, setAssessmentDetail] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null); // State for storing selected date

  useEffect(() => {
    const fetchAssessmentDetail = async () => {
      try {
        const res = await assessmentService.responseDetail(responseId, userId);
        if (res.data && res.data.data) {
          setAssessmentDetail(res.data.data);
          setTotalPages(Math.ceil(res.data.data.length / itemsPerPage));
        } else {
          setError('ไม่พบข้อมูลการประเมิน');
        }
      } catch (error) {
        setError('เกิดข้อผิดพลาดในการดึงข้อมูล');
      }
    };
    
    fetchAssessmentDetail();
  }, [responseId, userId, itemsPerPage]);

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentResponse = assessmentDetail.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      // แปลงวันที่ที่เลือกเป็นวันที่โดยไม่สนใจเวลา
      const selectedDateString = date.toLocaleDateString();
      
      // กรองข้อมูลตามวันที่ที่เลือก
      const filteredData = assessmentDetail.filter(assessment => {
        const createdAtDateString = new Date(assessment.createdAt).toLocaleDateString();
        return selectedDateString === createdAtDateString; // เปรียบเทียบแค่วันที่
      });
  
      setAssessmentDetail(filteredData);
      setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
      setCurrentPage(1); // รีเซ็ตไปที่หน้าที่ 1 หลังจากกรองข้อมูล
    } else {
      // ถ้าไม่มีการเลือกวันที่ ให้โหลดข้อมูลทั้งหมด
      fetchAssessmentDetail();
    }
  };  

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }
  
  if (assessmentDetail.length === 0) {
    return (
      <div className="alert alert-info">
        ไม่มีข้อมูลที่ตรงกับวันที่ที่เลือก
      </div>
    );
  }
  
  return (
    <div className="tb-content mt-3">
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label htmlFor="assessmentDate" className="form-label">เลือกวันที่:</label>
        <DatePicker
          id="assessmentDate"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className="form-control"
          placeholderText="เลือกวันที่"
          isClearable
        />
      </div>

      {currentResponse.length > 0 && (
        <div className="card mb-4">
          <div className="card-header">
            <h5>ข้อมูลผู้ใช้</h5>
          </div>
          <div className="card-body">
            <p><strong>ชื่อ:</strong> {currentResponse[0].user.title} {currentResponse[0].user.full_name}</p>
            <p><strong>อายุ:</strong> {currentResponse[0].user.age}</p>
            <p><strong>เบอร์โทร:</strong> {currentResponse[0].user.phone}</p>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered table-gray table-striped text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">คำถาม</th>
              <th scope="col">คำตอบ</th>
              <th scope="col">วันที่ทำแบบประเมินความเสี่ยง</th>
            </tr>
          </thead>
          <tbody>
            {currentResponse.length > 0 ? (
              currentResponse.map((assessment, index) => (
                <tr key={assessment.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{assessment.question.ques_name}</td>
                  <td>{assessment.answer.answer_text}</td>
                  <td>{new Date(assessment.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">ไม่พบข้อมูล</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {assessmentDetail.length > 0 && (
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

export default AssessmentDetail;
