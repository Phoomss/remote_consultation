import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import questionService from '../../service/questionService';

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0)
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await questionService.questionList();
        setQuestions(res.data.data);
        setCount(res.data.count)
        setFilteredQuestions(res.data.data);
      } catch (error) {
        setError('เกิดข้อผิดพลาดในการดึงข้อมูลคำถาม');
      }
    };
    fetchData();
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(filteredQuestions.length / itemsPerPage)));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

  const handleEdit = async (questionId) => {
    try {
      const res = await questionService.questionById(questionId);
      const questionDetail = res.data.data;

      // Show the edit modal with pre-filled question data
      const { value: formValues } = await Swal.fire({
        title: 'แก้ไขคำถาม',
        html: `
          <input id="swal-input-name" class="swal2-input" value="${questionDetail.ques_name}" placeholder="ชื่อคำถาม" style="width: 70%; padding: 12px; font-size: 16px; margin-bottom: 15px; border-radius: 5px; border: 1px solid #ddd; box-sizing: border-box;"/>
        `,
        showCancelButton: true,
        confirmButtonText: 'บันทึกการแก้ไข',
        cancelButtonText: 'ยกเลิก',
        preConfirm: () => {
          const questionName = document.getElementById('swal-input-name').value;
          if (!questionName) {
            Swal.showValidationMessage('กรุณากรอกชื่อคำถาม');
            return false;
          }
          return { questionName };
        },
      });

      if (formValues) {
        const { questionName } = formValues;

        try {
          // Send the updated question to the backend
          await questionService.updateQuestion(questionId, { ques_name: questionName });

          // Update the UI with the new data
          const updatedQuestions = questions.map(question =>
            question.id === questionId ? { ...question, ques_name: questionName } : question
          );
          setQuestions(updatedQuestions);
          setFilteredQuestions(updatedQuestions);

          Swal.fire('สำเร็จ!', 'คำถามของคุณได้รับการอัปเดตแล้ว', 'success');
        } catch (error) {
          Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถอัปเดตคำถามได้', 'error');
        }
      }
    } catch (error) {
      Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถดึงข้อมูลคำถามมาแก้ไขได้', 'error');
    }
  };

  const handleDelete = async (questionId) => {
    const confirm = await Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'การลบนี้จะไม่สามารถย้อนกลับได้!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบเลย!',
    });

    if (confirm.isConfirmed) {
      try {
        await questionService.deleteQuestion(questionId);
        const res = await questionService.questionList();
        setQuestions(res.data.data);
        setFilteredQuestions(res.data.data);

        Swal.fire('ลบแล้ว!', 'คำถามของคุณถูกลบเรียบร้อยแล้ว', 'success');
      } catch (error) {
        Swal.fire('เกิดข้อผิดพลาด!', 'เกิดข้อผิดพลาดในการลบคำถาม', 'error');
      }
    }
  };

  const handleViewDetails = async (questionId) => {
    try {
      const res = await questionService.questionDetail(questionId);
      const questionDetail = res.data.data;

      Swal.fire({
        title: `<strong>${questionDetail.ques_name}</strong>`,
        html: `<p>${questionDetail.ques_detail}</p>`,
        confirmButtonText: 'ปิด',
      });
    } catch (error) {
      Swal.fire('เกิดข้อผิดพลาด!', 'เกิดข้อผิดพลาดในการดึงข้อมูลคำถาม', 'error');
    }
  };

  return (
    <div className='tb-question mt-3'>
      {error && <div className="alert alert-danger">{error}</div>}
      <p className="text-primary fw-bold my-3">
        จำนวนคำถามทั้งหมด: <span className="text-dark">{count}</span>
      </p>
      <div className="table-responsive">
        <table className="table table-bordered table-gray table-striped text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">หัวข้อคำถาม</th>
              <th scope="col">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {currentQuestions.length > 0 ? (
              currentQuestions.map((question, index) => (
                <tr key={question.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>
                    <button
                      className="btn btn-link text-primary"
                      onClick={() => handleViewDetails(question.id)}
                    >
                      {question.ques_name}
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-primary btn-sm" onClick={() => handleEdit(question.id)}>แก้ไข</button>{' '}
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(question.id)}>ลบ</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">ไม่พบข้อมูล</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredQuestions.length > 0 && (
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

export default Question;
