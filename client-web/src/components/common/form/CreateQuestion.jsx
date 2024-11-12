import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import questionService from './../../../service/questionService';

const CreateQuestion = () => {
  const [questionData, setQuestionData] = useState({
    ques_name: "",
  });

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Check if the form is valid
    if (!questionData.ques_name.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกคำถาม',
        text: 'คุณต้องกรอกคำถามก่อนที่จะส่ง',
      });
      return;
    }

    setIsLoading(true); // Start loading
    Swal.fire({
      title: 'กำลังสร้างคำถาม...',
      text: 'โปรดรอสักครู่',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await questionService.createQuestion(questionData); // Send data to the service
      Swal.fire({
        icon: 'success',
        title: 'สร้างคำถามเรียบร้อย',
        text: 'คำถามของคุณถูกสร้างสำเร็จแล้ว!',
        confirmButtonText: 'ตกลง'
      }).then(() => {
        window.location.reload(); // Reload the page after success
      });
      handleClose(); // Close modal
    } catch (error) {
      console.error('Error creating content:', error); // Log error to console
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'มีปัญหาในการสร้างคำถาม',
        confirmButtonText: 'ลองอีกครั้ง'
      });
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        เพิ่มคำถาม
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>สร้างคำถามใหม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="contentName">
              <Form.Label>คำถาม</Form.Label>
              <Form.Control
                type="text"
                name="ques_name"
                value={questionData.ques_name}
                onChange={handleChange}
                placeholder="กรอกคำถาม"
                disabled={isLoading} // Disable input while loading
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
            ปิด
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit} 
            disabled={isLoading}
          >
            {isLoading ? 'กำลังสร้างคำถาม...' : 'บันทึกการเปลี่ยนแปลง'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateQuestion;
