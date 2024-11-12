import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import answerService from './../../../service/answerService';
import questionService from './../../../service/questionService';
import { Button, Modal, Form } from 'react-bootstrap';

const CreateAnswer = () => {
  const [answerTexts, setAnswerTexts] = useState(['']);
  const [selectedQuestionId, setSelectedQuestionId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await questionService.questionList();
        setQuestions(response.data.data);
      } catch (error) {
        Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถโหลดคำถามได้', 'error');
      }
    };
    fetchQuestions();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answerTexts];
    updatedAnswers[index] = value;
    setAnswerTexts(updatedAnswers);
  };

  const handleAddAnswer = () => {
    setAnswerTexts([...answerTexts, '']);
  };

  const handleRemoveAnswer = (index) => {
    const updatedAnswers = answerTexts.filter((_, i) => i !== index);
    setAnswerTexts(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      const validAnswers = answerTexts.filter(text => text.trim() !== '');

      if (validAnswers.length === 0) {
        Swal.fire('ข้อผิดพลาด', 'กรุณากรอกคำตอบอย่างน้อย 1 ข้อ', 'error');
        return;
      }

      if (!selectedQuestionId) {
        Swal.fire('ข้อผิดพลาด', 'กรุณาเลือกคำถามก่อน', 'error');
        return;
      }

      setIsLoading(true); // Set loading state

      // Pass the answer data to the createAnswer service function
      const response = await answerService.createAnswer({
        questionId: selectedQuestionId,
        answerTexts: validAnswers,
      });

      // Handle the success response
      Swal.fire('สำเร็จ!', response.data.message, 'success');
      setAnswerTexts(['']); // Reset answers after submission
      setSelectedQuestionId(''); // Reset the selected question
      handleClose();
    } catch (error) {
      Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถส่งคำตอบได้', 'error');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        เพิ่มคำตอบสำหรับคำถาม
      </Button>

      {/* Modal for creating answers */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>สร้างคำตอบ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="questionSelect">
            <Form.Label>เลือกคำถาม</Form.Label>
            <Form.Control
              as="select"
              value={selectedQuestionId}
              onChange={(e) => setSelectedQuestionId(e.target.value)}
            >
              <option value="">เลือกคำถาม</option>
              {questions.map((question) => (
                <option key={question.id} value={question.id}>
                  {question.ques_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form>
            {answerTexts.map((answer, index) => (
              <div key={index} className="mb-2">
                <Form.Control
                  type="text"
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder={`คำตอบที่ ${index + 1}`}
                />
                <Button
                  variant="danger"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleRemoveAnswer(index)}
                  disabled={answerTexts.length <= 1}
                >
                  ลบคำตอบ
                </Button>
              </div>
            ))}

            {/* Add Answer Button */}
            <Button variant="success" className="mb-3" onClick={handleAddAnswer}>
              เพิ่มคำตอบ
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
            ปิด
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isLoading || !selectedQuestionId}
          >
            {isLoading ? 'กำลังสร้างคำตอบ...' : 'ส่งคำตอบ'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateAnswer;
