import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../service/authService'; // ปรับเส้นทางตามที่จำเป็น
import Swal from 'sweetalert2';

const Register = () => {
    const [signupData, setSignupData] = useState({
        title: '',  // เก็บคำนำหน้า
        full_name: '',
        phone: '',
        age: '',
        username: '',
        password: '',
        confirmPassword: "",
        role: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData({ ...signupData, [name]: value }); // ใช้ signupData แทน registerData
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (signupData.password !== signupData.confirmPassword) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
                text: "รหัสผ่านไม่ตรงกัน",
                showConfirmButton: false,
                timer: 1000
            });
            setLoading(false);
            return;
        }

        try {
            await authService.signup(signupData); // สมมติว่า authService มีเมธอด register
            Swal.fire({
                position: "center",
                icon: "success",
                title: "ลงทะเบียนสำเร็จ!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
                text: "การลงทะเบียนล้มเหลว",
                showConfirmButton: false,
                timer: 1500
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='hold-transition register-page'>
            <div className="register-box">
                <div className="register-logo text-center mb-3">
                    <b>ระบบให้คำปรึกษาทางไกล</b>
                    <p>สำหรับผู้รับบริการคลินิกเทคนิคการแพทย์ฟ้าสีรุ้งจังหวัดนครปฐม</p>
                </div>
                <div className="card">
                    <div className="card-body register-card-body">
                        <p className="login-box-msg">สมัครใช้งานเพื่อเป็นสมาชิกระบบ</p>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-4">
                                    <div className="input-group mb-3">
                                        <select
                                            className="form-control"
                                            name="title"
                                            value={signupData.title}
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

                                <div className="col-8">
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="ชื่อเต็ม"
                                            name="full_name"
                                            value={signupData.full_name}
                                            onChange={handleChange}
                                            required
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-user" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="username"
                                    className="form-control"
                                    placeholder="ชื่อผู้ใช้"
                                    name="username"
                                    value={signupData.username}  
                                    onChange={handleChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="รหัสผ่าน"
                                    name="password"
                                    value={signupData.password}  // การผูกข้อมูลที่ถูกต้อง
                                    onChange={handleChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="พิมพ์รหัสผ่านอีกครั้ง"
                                    name="confirmPassword"
                                    value={signupData.confirmPassword}  // การผูกข้อมูลที่ถูกต้อง
                                    onChange={handleChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="เบอร์โทรศัพท์"
                                    name="phone"  // ชื่อฟิลด์ที่ถูกต้อง
                                    value={signupData.phone}  // การผูกข้อมูลที่ถูกต้อง
                                    onChange={handleChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-phone" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <select
                                    className="form-control"
                                    name="role"
                                    value={signupData.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>เลือกบทบาท</option>
                                    <option value="OFFICER">เจ้าหน้าที่</option>
                                    <option value="PHYSICIAN">แพทย์</option>
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="อายุ"
                                    name="age"
                                    value={signupData.age}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                        {loading ? 'กำลังลงทะเบียน...' : 'ลงทะเบียน'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
