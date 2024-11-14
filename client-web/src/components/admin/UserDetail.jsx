import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import userService from '../../service/userService'
import Swal from 'sweetalert2'

const UserDetail = () => {
  const [userData, setUserData] = useState({
    title: '',
    full_name: '',
    phone: '',
    age: '',
    username: '',
    password: '',
    role: ""
  })
  const { userId } = useParams()
  const navigate = useNavigate()

  // ฟังก์ชันดึงข้อมูลผู้ใช้จาก API
  const fetchUserDetail = async (userId) => {
    try {
      const res = await userService.userById(userId)
      const userInfo = res.data.data
      setUserData({
        title: userInfo.title,
        full_name: userInfo.full_name,
        phone: userInfo.phone,
        age: userInfo.age,
        username: userInfo.username,
        password: '', // Clear password field initially
        role: userInfo.role
      })
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  // ฟังก์ชันจัดการการเปลี่ยนแปลงค่าของฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  // ฟังก์ชันที่ส่งข้อมูลไปอัพเดต
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Create a copy of the current user data
    const updatedData = { ...userData }

    // If password is provided, include it in the data to be updated
    if (updatedData.password) {
      updatedData.password = updatedData.password;
    } else {
      // If password is not provided, remove it from updatedData (if it exists)
      delete updatedData.password;
    }

    try {
      // Attempt to update the user data
      await userService.updateUser(updatedData, userId)

      // Show success notification with SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'สำเร็จ!',
        text: 'ข้อมูลของผู้ใช้ถูกอัพเดตเรียบร้อยแล้ว',
      })

      // Redirect to the user list page
      navigate('/admin/user')
    } catch (error) {
      console.error("Error updating user data:", error)

      // Show error notification with SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด!',
        text: 'ไม่สามารถอัพเดตข้อมูลได้ กรุณาลองใหม่',
      })
    }
  }

  // ใช้ useEffect เพื่อดึงข้อมูลผู้ใช้เมื่อ component ถูกโหลด
  useEffect(() => {
    fetchUserDetail(userId)
  }, [userId])

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>คำนำหน้า:</label>
              <select
                className="form-control"
                name="title"
                value={userData.title}
                onChange={handleChange}
                required
              >
                <option value="" disabled>เลือกคำนำหน้า</option>
                <option value="นาย.">นาย.</option>
                <option value="นาง.">นาง.</option>
                <option value="น.ส.">น.ส.</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
              </select>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label>ชื่อเต็ม:</label>
              <input
                type="text"
                name="full_name"
                className="form-control"
                value={userData.full_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label>เบอร์โทร:</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={userData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <div className="form-group">
              <label>อายุ:</label>
              <input
                type="number"
                name="age"
                className="form-control"
                value={userData.age}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>ชื่อผู้ใช้:</label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={userData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12">
            <div className="form-group">
              <label>รหัสผ่าน:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={userData.password}
                onChange={handleChange}
                placeholder="ใส่รหัสผ่านใหม่หากต้องการเปลี่ยน"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-4">แก้ไขข้อมูล</button>
      </form>
    </div>
  )
}

export default UserDetail
