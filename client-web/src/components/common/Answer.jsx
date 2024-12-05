import React, { useEffect, useState } from 'react'
import answerService from './../../service/answerService';
import Swal from 'sweetalert2';
import { Form, Row, Col } from "react-bootstrap";

const Answer = () => {
  const [answers, setAnswers] = useState([])
  const [filteredAnswer, setFilteredAnswer] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [currentAnswerId, setCurrentAnswerId] = useState(null);
  const [currentQuestionId, setCurrentQuestionId] = useState('');
  const [currentAnswerText, setCurrentAnswerText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await answerService.answerList()
        setAnswers(res.data.data)
        setFilteredAnswer(res.data.data)
      } catch (error) {
        setError("เกิดข้อผิดพลาดในการดึงข้อมูลคำถามและคำตอบ");
      }
    }
    fetchData()
  }, [])

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterAnswers(query, selectedQuestion);
  };

  const handleQuestionSelect = (e) => {
    const question = e.target.value;
    setSelectedQuestion(question);
    filterAnswers(searchQuery, question);
  };

  const filterAnswers = (query, question) => {
    const filtered = answers.filter(answer =>
      (answer.question.ques_name.toLowerCase().includes(query) ||
        answer.answer_text.toLowerCase().includes(query)) &&
      (question === '' || answer.question.ques_name === question)
    );
    setFilteredAnswer(filtered);
    setCurrentPage(1); // รีเซ็ตไปยังหน้าแรก
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(filteredAnswer.length / itemsPerPage)));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAnswers = filteredAnswer.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredAnswer.length / itemsPerPage);

  const handleEdit = async (answerId) => {
    try {
      const res = await answerService.answerById(answerId);
      const answerDetail = res.data.data;

      const questionId = answerDetail?.question?.ques_name || '';
      const answerText = answerDetail?.answer_text || '';

      setCurrentAnswerId(answerId);
      setCurrentQuestionId(questionId);
      setCurrentAnswerText(answerText);

      const { value: formValues } = await Swal.fire({
        title: 'แก้ไขคำตอบ',
        html: `
          <div class="swal2-input-container">
            <input 
              id="swal-input-question" 
              disabled
              class="swal2-input" 
              value="${questionId}" 
              placeholder="คำถาม" 
              style="width: 70%; padding: 12px; font-size: 16px; margin-bottom: 15px; border-radius: 5px; border: 1px solid #ddd; box-sizing: border-box;"/>
            <input 
              id="swal-input-answer" 
              class="swal2-input" 
              value="${answerText}" 
              placeholder="คำตอบ" 
              style="width: 70%; padding: 12px; font-size: 16px; margin-bottom: 15px; border-radius: 5px; border: 1px solid #ddd; box-sizing: border-box;"/>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'บันทึกการแก้ไข',
        cancelButtonText: 'ยกเลิก',
        focusConfirm: false,
        customClass: {
          popup: 'swal2-popup-edit',
          confirmButton: 'swal2-confirm-btn',
          cancelButton: 'swal2-cancel-btn',
        },
        preConfirm: () => {
          const questionId = document.getElementById('swal-input-question').value;
          const answerText = document.getElementById('swal-input-answer').value;
          return { questionId, answerText };
        }
      });

      if (formValues) {
        const { answerText } = formValues;
        const response = await answerService.updateAnswer(answerId, { answer_text: answerText });

        if (response.status === 200) {
          const updatedAnswers = answers.map(answer =>
            answer.id === answerId ? { ...answer, answer_text: answerText } : answer
          );
          setAnswers(updatedAnswers);
          setFilteredAnswer(updatedAnswers);

          Swal.fire('สำเร็จ!', 'คำตอบของคุณได้รับการอัปเดตแล้ว', 'success');
        } else {
          Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถอัปเดตคำตอบได้', 'error');
        }
      }
    } catch (error) {
      Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถดึงข้อมูลคำตอบมาแก้ไขได้', 'error');
    }
  };


  const handleDelete = async (answerId) => {
    const confirm = await Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "การลบนี้จะไม่สามารถย้อนกลับได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบเลย!'
    });

    if (confirm.isConfirmed) {
      try {
        await answerService.deleteAnswer(answerId);
        const res = await answerService.answerList();
        setAnswers(res.data.data);
        setFilteredAnswer(res.data.data);

        Swal.fire('ลบแล้ว!', 'คำตอบของคุณถูกลบเรียบร้อยแล้ว', 'success');
      } catch (error) {
        Swal.fire('เกิดข้อผิดพลาด!', 'เกิดข้อผิดพลาดในการลบคำตอบ', 'error');
      }
    }
  };
  return (
    <div className='tb-answer mt-3'>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3 p-3 bg-light rounded shadow-sm">
        <Row className="align-items-center">
          {/* กล่องค้นหา */}
          <Col xs={12} md={6} className="mb-2 mb-md-0">
            <Form.Control
              type="text"
              placeholder="🔍 ค้นหาคำถามหรือคำตอบ..."
              value={searchQuery}
              onChange={handleSearch}
              className="form-control"
            />
          </Col>

          {/* เมนูเลือกคำถาม */}
          <Col xs={12} md={6}>
            <Form.Select
              value={selectedQuestion}
              onChange={handleQuestionSelect}
              aria-label="เลือกคำถาม"
            >
              <option value="">-- เลือกคำถาม --</option>
              {[...new Set(answers.map(answer => answer.question.ques_name))].map((ques_name, index) => (
                <option key={index} value={ques_name}>
                  {ques_name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-gray table-striped text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">คำถาม</th>
              <th scope="col">คำตอบ</th>
              <th scope="col">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {currentAnswers.length > 0 ? (
              currentAnswers.map((answer, index) => (
                <tr key={answer.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>
                    {answer.question.ques_name}
                  </td>
                  <td>
                    {answer.answer_text}
                  </td>
                  <td>
                    <button className="btn btn-primary btn-sm" onClick={() => handleEdit(answer.id)}>แก้ไข</button>{' '}
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(answer.id)}>ลบ</button>
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

      {filteredAnswer.length > 0 && (
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
  )
}

export default Answer