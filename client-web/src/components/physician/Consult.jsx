import React, { useEffect, useState } from 'react';
import caseService from '../../service/caseService';
import Swal from 'sweetalert2';

const Consult = () => {
  const [caseInfo, setCaseInfo] = useState([]);
  const [filteredCase, setFilteredCase] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchCaseInfo = async () => {
    try {
      const res = await caseService.caseInfo();
      const acceptingCases = res.data.data.filter(c => c.case_status === 'accepting');
      setCaseInfo(acceptingCases);  // Store all accepting cases
      setFilteredCase(acceptingCases);  // Filtered cases are also accepting ones
    } catch (error) {
      setError('เกิดข้อผิดพลาดในการดึงข้อมูล');
    }
  };

  useEffect(() => {
    fetchCaseInfo();
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(filteredCase.length / itemsPerPage)));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCases = filteredCase.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCase.length / itemsPerPage);

  const handleComplete = async (caseId) => {
    const confirm = await Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "ต้องการเปลี่ยนสถานะเป็นเสร็จสิ้น?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ใช่, เสร็จสิ้น',
      cancelButtonText: 'ยกเลิก',
    });

    if (confirm.isConfirmed) {
      try {
        await caseService.updateCase(caseId, { case_status: 'completed' });

        const updatedCaseInfo = caseInfo.map(c => c.id === caseId ? { ...c, case_status: 'completed' } : c);
        setCaseInfo(updatedCaseInfo);
        setFilteredCase(updatedCaseInfo);

        Swal.fire('สำเร็จ!', 'สถานะเคสได้รับการอัปเดตเป็นเสร็จสิ้นแล้ว', 'success');
      } catch (error) {
        Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถอัปเดตสถานะเคสได้', 'error');
      }
    }
  };

  const handleDelete = async (caseId) => {
    const confirm = await Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "การลบนี้จะไม่สามารถย้อนกลับได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก',
    });

    if (confirm.isConfirmed) {
      try {
        await caseService.deleteCase(caseId);
        const res = await caseService.caseInfo();
        const acceptingCases = res.data.data.filter(c => c.case_status === 'accepting');
        setCaseInfo(acceptingCases);
        setFilteredCase(acceptingCases);

        Swal.fire('ลบแล้ว!', 'เคสของคุณถูกลบเรียบร้อยแล้ว', 'success');
      } catch (error) {
        Swal.fire('เกิดข้อผิดพลาด!', 'เกิดข้อผิดพลาดในการลบเคส', 'error');
      }
    }
  };

  const handleViewDetails = async (caseId) => {
    try {
      const res = await caseService.caseDetail(caseId);
      const caseDetail = res.data.data;

      Swal.fire({
        title: `<strong>${caseDetail.booking.user.title}${caseDetail.booking.user.full_name}</strong>`,
        html: `<p>รายละเอียด: ${caseDetail.booking.booking_detail}</p>`,
        confirmButtonText: 'ปิด',
        customClass: {
          popup: 'swal2-content-detail'
        }
      });
    } catch (error) {
      Swal.fire('เกิดข้อผิดพลาด!', 'เกิดข้อผิดพลาดในการดึงข้อมูลคอนเทนท์', 'error');
    }
  };

  return (
    <div className="tb-assment-response mt-3">
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-bordered table-gray table-striped text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ผู้จองเข้าปรึกษา</th>
              <th scope="col">เจ้าหน้าที่รับเคส</th>
              <th scope="col">แพทย์</th>
              <th scope="col">สถานะเคส</th>
              <th scope="col">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {currentCases.length > 0 ? (
              currentCases.map((caseItem, index) => (
                <tr key={caseItem.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>
                    <button
                      className="btn btn-link text-primary"
                      onClick={() => handleViewDetails(caseItem.id)}
                    >
                      {caseItem.booking.user.title}{caseItem.booking.user.full_name}
                    </button>
                  </td>
                  <td>{caseItem.officer.title} {caseItem.officer.full_name}</td>
                  <td>{caseItem.physician.title} {caseItem.physician.full_name}</td>
                  <td>{caseItem.case_status === 'accepting' ? 'รับเคส' : 'สถานะเสร็จสิ้น'}</td>
                  <td>
                    <button className="btn btn-success btn-sm" onClick={() => handleComplete(caseItem.id)}>เสร็จสิ้น</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(caseItem.id)}>ลบ</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">ไม่มีข้อมูลการประเมิน</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredCase.length > 0 && (
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

export default Consult;
