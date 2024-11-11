import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../service/authService'; // Adjust the path as needed
import Swal from 'sweetalert2';

const Register = () => {
    const [signupData, setSignupData] = useState({
        title: '',  // Store selected title
        full_name: '',
        phone: '',
        age: '',
        username: '',
        password: '',
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData({ ...signupData, [name]: value }); // Use signupData, not registerData
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
            await authService.signup(signupData); // Assuming authService has a register method
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
                <div className="register-logo">
                    <b>ระบบ</b>ให้คำปรึกษาทางไกลสำหรับผู้รับบริการคลินิกเทคนิคการแพทย์ฟ้าสีรุ้งจังหวัดนครปฐม
                </div>
                <div className="card">
                    <div className="card-body register-card-body">
                        <p className="login-box-msg">สมัครใช้งานเพื่อเป็นสมาชิกระบบ</p>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <select
                                    className="form-control"
                                    name="title"
                                    value={signupData.title}  // Correct data binding
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
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Full name"
                                    name="full_name"  // Updated field name
                                    value={signupData.full_name}  // Correct data binding
                                    onChange={handleChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    name="email"
                                    value={signupData.email}  // Correct data binding
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
                                    placeholder="Password"
                                    name="password"
                                    value={signupData.password}  // Correct data binding
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
                                    placeholder="Retype password"
                                    name="confirmPassword"
                                    value={signupData.confirmPassword}  // Correct data binding
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
                                    placeholder="Phone number"
                                    name="phone"  // Correct field name
                                    value={signupData.phone}  // Correct data binding
                                    onChange={handleChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-phone" />
                                    </div>
                                </div>
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
