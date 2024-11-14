import React, { useEffect, useState } from 'react';
import userService from './../../../service/userService';
import { Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import bookingService from '../../../service/bookingService';
import Swal from 'sweetalert2';
import caseService from '../../../service/caseService';

const CreateConsult = () => {
  const [caseData, setCaseData] = useState({
    bookingId: '',
    officerId: '',
    physicianId: '',
    case_status: 'accepting',
  });
  const [bookings, setBookings] = useState([]);
  const [physicians, setPhysicians] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const resBooking = await bookingService.searchBookingConsult();
      setBookings(resBooking.data.data);

      const resUserInfo = await userService.userInfo();
      setUser(resUserInfo.data.data);
      setCaseData((prev) => ({
        ...prev,
        officerId: resUserInfo.data.data.id,
      }));

      const resPhysician = await userService.searchRolePhysician();
      setPhysicians(resPhysician.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Error loading data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCaseData({ ...caseData, [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    // Ensure necessary fields are present
    if (!caseData.bookingId || !caseData.physicianId) {
      setError("Please select both a booking and a physician.");
      setIsLoading(false);
      return;
    }

    console.log(caseData); // Inspect caseData before submission
    try {
      await caseService.createCase(caseData);
      Swal.fire({
        title: 'สำเร็จ!',
        text: 'สร้างเคสเรียบร้อยแล้ว',
        icon: 'success',
        confirmButtonText: 'ตกลง'
      }).then(() => {
        window.location.reload(); // Reload the page after success
      });
      handleClose();
    } catch (err) {
      console.error("Error creating case:", err);
      setError("Failed to create case. Please check your inputs and try again.");
      Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: 'ไม่สามารถสร้างเคสได้ โปรดตรวจสอบข้อมูลอีกครั้ง',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        เพิ่มเคสคนเขาปรึกษา
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>สร้างเคสคนเขาปรึกษา</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <Spinner animation="border" />
          ) : (
            <>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form>
                <Form.Group>
                  <Form.Label>เลือกการจอง</Form.Label>
                  <Form.Control
                    as="select"
                    name="bookingId"
                    value={caseData.bookingId}
                    onChange={handleInputChange}
                  >
                    <option value="">เลือกการจอง</option>
                    {bookings.map((booking) => {
                      const appointmentDate = new Date(booking.appointment);
                      const formattedDate = appointmentDate.toLocaleDateString('th-TH', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit'
                      });
                      const formattedTime = appointmentDate.toLocaleTimeString('th-TH', {
                        hour: '2-digit',
                        minute: '2-digit'
                      });

                      return (
                        <option key={booking.id} value={booking.id}>
                          {booking.user.full_name} - {booking.booking_type === 'consult' ? 'เข้าปรึกษา' : booking.booking_type} - {formattedDate} {formattedTime}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>เลือกแพทย์</Form.Label>
                  <Form.Control
                    as="select"
                    name="physicianId"
                    value={caseData.physicianId}
                    onChange={handleInputChange}
                  >
                    <option value="">เลือกแพทย์</option>
                    {physicians.map((physician) => (
                      <option key={physician.id} value={physician.id}>
                        {physician.title} {physician.full_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>สถานะเคส</Form.Label>
                  <Form.Control
                    type="text"
                    name="case_status"
                    value={caseData.case_status === 'accepting' ? 'accepting' : 'รับเคส'}
                    disabled
                  />
                </Form.Group>

                <Form.Group controlId="contentName">
                  <Form.Label>ชื่อผู้รับเคส</Form.Label>
                  <Form.Control
                    type="text"
                    name="officerId"
                    value={user ? user.full_name : ''}
                    disabled
                  />
                </Form.Group>
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิด
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isLoading || !caseData.bookingId || !caseData.physicianId}
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : "บันทึกเคส"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateConsult;
