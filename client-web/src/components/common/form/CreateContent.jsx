import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import contentService from './../../../service/contentService';

const CreateContent = () => {
  const [contentData, setContentData] = useState({
    content_name: "",
    content_detail: ""
  });

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true); // Start loading
    Swal.fire({
      title: 'กำลังสร้างเนื้อหา...',
      text: 'โปรดรอสักครู่',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await contentService.createContent(contentData);
      Swal.fire({
        icon: 'success',
        title: 'สร้างเนื้อหาเรียบร้อย',
        text: 'เนื้อหาของคุณถูกสร้างสำเร็จแล้ว!',
        confirmButtonText: 'ตกลง'
      }).then(() => {
        window.location.reload(); // Reload the page after success
      });
      handleClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'มีปัญหาในการสร้างเนื้อหา',
        confirmButtonText: 'ลองอีกครั้ง'
      });
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        เพิ่มเนื้อหา
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>สร้างเนื้อหาใหม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="contentName">
              <Form.Label>ชื่อเนื้อหา</Form.Label>
              <Form.Control
                type="text"
                name="content_name"
                value={contentData.content_name}
                onChange={handleChange}
                placeholder="กรอกชื่อเนื้อหา"
              />
            </Form.Group>

            <Form.Group controlId="contentDetail" className="mt-3">
              <Form.Label>รายละเอียดเนื้อหา</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content_detail"
                value={contentData.content_detail}
                onChange={handleChange}
                placeholder="กรอกรายละเอียดเนื้อหา"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
            ปิด
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'กำลังสร้างเนื้อหา...' : 'บันทึกการเปลี่ยนแปลง'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateContent;
