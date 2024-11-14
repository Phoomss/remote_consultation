import React, { useEffect, useState } from 'react';
import caseService from './../../service/caseService';
import Swal from 'sweetalert2';

const Consult = () => {
  const [cases, setCases] = useState([]);
  const [filteredCase, setFilteredCase] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchCase = async () => {
    try {
      const res = await caseService.caseList();
      setCases(res.data.data);
      setFilteredCase(res.data.data);
    } catch (error) {
      setError('Error fetching cases');
    }
  };

  useEffect(() => {
    fetchCase();
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

  const handleDelete = async (caseId) => {
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
        await caseService.deleteCase(caseId);  // เรียก API เพื่อลบเคส
        const res = await caseService.caseList();  // ดึงข้อมูลเคสที่อัปเดต
        setCases(res.data.data);
        setFilteredCase(res.data.data);
  
        Swal.fire('ลบแล้ว!', 'เคสของคุณถูกลบเรียบร้อยแล้ว', 'success');
      } catch (error) {
        Swal.fire('เกิดข้อผิดพลาด!', 'เกิดข้อผิดพลาดในการลบเคส', 'error');
      }
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
                  <td>{caseItem.booking.user.title} {caseItem.booking.user.full_name}</td>
                  <td>{caseItem.officer.title} {caseItem.officer.full_name}</td>
                  <td>{caseItem.physician.title} {caseItem.physician.full_name}</td>
                  <td>{caseItem.case_status === 'accepting' ? 'รับเคส' : 'สถานะไม่ตรงกับคำที่กำหนด'}</td>
                  <td>
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
