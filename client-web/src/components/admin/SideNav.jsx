import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import UserInfo from '../common/UserInfo';

const SideNav = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        Swal.fire({
            icon: 'warning',
            title: 'แน่ใจแล้วหรอที่จะออกจากระบบ',
            showCancelButton: true,
            confirmButtonText: 'กดเพื่อออกจากระบบ',
            cancelButtonText: 'กดยกเลิกยังไม่แน่ใจ'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token')
                Swal.fire({
                    icon: 'success',
                    title: 'ออกจากระบบสำเร็จ',
                    text: 'แล้วเจอกันใหม่สวัสดี',
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
                navigate('/')
            }
        })
    }

    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <div className="sidebar">
                    <UserInfo />
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-header">จัดการระบบ</li>
                            <li className="nav-item">
                                <NavLink to='/admin/reservation' className="nav-link">
                                    <i class="nav-icon fa fa-calendar"></i>
                                    <p>จัดการการจองคิว</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/consult' className="nav-link">
                                    <i className="nav-icon fa fa-search" />
                                    <p>จัดการเคสคนเข้าปรึกษา</p>
                                </NavLink>
                            </li>

                            <li className="nav-header">จัดการคอนเทนท์</li>
                            <li className="nav-item">
                                <NavLink to='/admin/content' className="nav-link">
                                    <i className="nav-icon fa fa-lightbulb" />
                                    <p>เนื้อหาคอนเทนท์</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/assessment/response' className="nav-link">
                                    <i className="nav-icon fa fa-th-list" />
                                    <p>รายการตอบกลับ</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/assessment/question' className="nav-link">
                                    <i className="nav-icon fa fa-question-circle" />
                                    <p>จัดการคำถาม</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/assessment/answer' className="nav-link">
                                    <i className="nav-icon fa fa-check-square" />
                                    <p>จัดการคำตอบ</p>
                                </NavLink>
                            </li>
                            <li className="nav-header">จัดการข้อมูล</li>
                            <li className="nav-item">
                                <NavLink to='/admin/user' className="nav-link">
                                    <i className="nav-icon fas fa-user-friends" />
                                    <p>ข้อมูลผู้ใช้งาน</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/profile' className="nav-link">
                                    <i className="nav-icon fas fa-user-circle" />
                                    <p>ข้อมูลส่วนตัว</p>
                                </NavLink>
                            </li>
                            <li className="nav-header">ออกจากระบบ</li>
                            <li className="nav-item">
                                <div onClick={handleLogout} className="nav-link" style={{ cursor: 'pointer' }}>
                                    <i className="nav-icon far fa-circle text-danger" />
                                    <p className="text">ออกจากระบบ</p>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    )
}

export default SideNav
