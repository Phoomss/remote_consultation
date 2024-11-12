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
  const [currentContentId, setCurrentContentId] = useState(null);
  const [currentContentName, setCurrentContentName] = useState('');
  const [currentContentDetail, setCurrentContentDetail] = useState('');

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

  const handleEdit = async (contentId) => {
    // Fetch the content details for editing
    try {
      const res = await contentService.contentDetail(contentId);
      const contentDetail = res.data.data;
      setCurrentContentId(contentId);
      setCurrentContentName(contentDetail.content_name);
      setCurrentContentDetail(contentDetail.content_detail);
  
      // Show the edit modal with pre-filled content
      const { value: formValues } = await Swal.fire({
        title: 'แก้ไขคอนเทนท์',
        html: `
          <div class="swal2-input-container">
            <input 
              id="swal-input-name" 
              class="swal2-input" 
              value="${contentDetail.content_name}" 
              placeholder="ชื่อคอนเทนท์" 
              style="width: 70%; padding: 12px; font-size: 16px; margin-bottom: 15px; border-radius: 5px; border: 1px solid #ddd; box-sizing: border-box;"/>
            <textarea 
              id="swal-input-detail" 
              class="swal2-textarea" 
              placeholder="รายละเอียดคอนเทนท์" 
              style="width: 70%; padding: 12px; font-size: 16px; margin-bottom: 15px; border-radius: 5px; border: 1px solid #ddd; box-sizing: border-box;">
              ${contentDetail.content_detail}
            </textarea>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'บันทึกการแก้ไข',
        cancelButtonText: 'ยกเลิก',
        focusConfirm: false,
        customClass: {
          popup: 'swal2-popup-edit', // Custom class for the popup
          confirmButton: 'swal2-confirm-btn',
          cancelButton: 'swal2-cancel-btn',
        },
        preConfirm: () => {
          const contentName = document.getElementById('swal-input-name').value;
          const contentDetail = document.getElementById('swal-input-detail').value;
          return { contentName, contentDetail };
        }
      });
  
      if (formValues) {
        const { contentName, contentDetail } = formValues;
        if (contentName && contentDetail) {
          try {
            // Send the updated content to the backend
            await contentService.updateContent(contentId, { content_name: contentName, content_detail: contentDetail });
  
            // Update the UI with the new data
            const updatedContents = contents.map(content =>
              content.id === contentId ? { ...content, content_name: contentName, content_detail: contentDetail } : content
            );
            setContents(updatedContents);
            setFilteredContent(updatedContents);
  
            Swal.fire('สำเร็จ!', 'คอนเทนท์ของคุณได้รับการอัปเดตแล้ว', 'success');
          } catch (error) {
            Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถอัปเดตคอนเทนท์ได้', 'error');
          }
        } else {
          Swal.fire('ข้อผิดพลาด!', 'กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
        }
      }
    } catch (error) {
      Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถดึงข้อมูลคอนเทนท์มาแก้ไขได้', 'error');
    }
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
    <div className='tb-content mt-3 '>
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
