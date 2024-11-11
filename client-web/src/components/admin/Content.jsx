import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import contentService from '../../service/contentService';

const Content = () => {
  const [contents, setContents] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await contentService.contentList();
        setContents(res.data.data);
        setFilteredContent(res.data.data);
      } catch (error) {
        setError("เกิดข้อผิดพลาดในการดึงข้อมูลคอนเทนท์");
      }
    };
    fetchData();
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(filteredContent.length / itemsPerPage)));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContents = filteredContent.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);

  const handleEdit = (contentId) => {
    navigate(`/edit/${contentId}`);
  };

  const handleDelete = async (contentId) => {
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
        await contentService.deteleContent(contentId);
        const res = await contentService.contentList();
        setContents(res.data.data);
        setFilteredContent(res.data.data);

        Swal.fire('ลบแล้ว!', 'คอนเทนท์ของคุณถูกลบเรียบร้อยแล้ว', 'success');
      } catch (error) {
        Swal.fire('เกิดข้อผิดพลาด!', 'เกิดข้อผิดพลาดในการลบคอนเทนท์', 'error');
      }
    }
  };

  const handleViewDetails = async (contentId) => {
    try {
      const res = await contentService.contentDetail(contentId);
      const contentDetail = res.data.data;

      Swal.fire({
        title: `<strong>${contentDetail.content_name}</strong>`,
        html: `<p>${contentDetail.content_detail}</p>`,
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
    <div className='tb-content'>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-bordered table-gray table-striped text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">หัวข้อคอนเทนท์</th>
              <th scope="col">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {currentContents.length > 0 ? (
              currentContents.map((content, index) => (
                <tr key={content.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>
                    <button
                      className="btn btn-link text-primary"
                      onClick={() => handleViewDetails(content.id)}
                    >
                      {content.content_name}
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-primary btn-sm" onClick={() => handleEdit(content.id)}>แก้ไข</button>{' '}
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(content.id)}>ลบ</button>
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

      {filteredContent.length > 0 && (
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

export default Content;
