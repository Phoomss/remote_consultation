import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import userService from './../../service/userService';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    title: '',
    full_name: '',
    phone: '',
    age: '',
    username: '',
    password: '',
    role: ""
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await userService.userInfo();
        const userInfo = res.data.data;
        setProfileData({
          title: userInfo.title,
          full_name: userInfo.full_name,
          phone: userInfo.phone,
          age: userInfo.age,
          username: userInfo.username,
          password: '', // Clear password field initially
          role: userInfo.role
        });
      } catch (error) {
        Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถดึงข้อมูลผู้ใช้ได้.', 'error');
      }
    };
    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to be sent for update
    const updatedData = {
      title: profileData.title,
      full_name: profileData.full_name,
      phone: profileData.phone,
      age: profileData.age,
      username: profileData.username
    };

    // If password is provided, include it in the data to be updated
    if (profileData.password) {
      updatedData.password = profileData.password;
    }

    try {
      const response = await userService.editProfile(updatedData);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'อัปเดตเรียบร้อย!',
          text: 'โปรไฟล์ของคุณถูกอัปเดตแล้ว.',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถอัปเดตข้อมูลผู้ใช้ได้.', 'error');
      }
    } catch (error) {
      Swal.fire('เกิดข้อผิดพลาด', error.response?.data?.message || 'ไม่สามารถอัปเดตโปรไฟล์ได้.', 'error');
    }
  };

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
                value={profileData.title}
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
                value={profileData.full_name}
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
                value={profileData.phone}
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
                value={profileData.age}
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
                value={profileData.username}
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
                value={profileData.password}
                onChange={handleChange}
                placeholder="ใส่รหัสผ่านใหม่หากต้องการเปลี่ยน"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-4">แก้ไขข้อมูล</button>
      </form>
    </div>
  );
};

export default Profile;
