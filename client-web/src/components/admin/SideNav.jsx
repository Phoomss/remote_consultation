import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import userService from './../../service/userService';

const SideNav = () => {
    const [userInfo, setUserInfo] = useState({})
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await userService.userInfo()
                setUserInfo(res.data.data)
            } catch (error) {
                console.error("Error fetching user info:", error)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <div className="sidebar">
                    {userInfo && (
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="info">
                                <h5 className="d-block bg-dark">{userInfo.title}{userInfo.firstName} {userInfo.lastName}</h5>
                                <p className="d-block text-center bg-dark">สถานะ: <span className='bg-success p-1'>{userInfo.role}</span></p>
                            </div>
                        </div>
                    )}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <NavLink to='/admin/dashboard' className="nav-link">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>แดชบอร์ด</p>
                                </NavLink>
                            </li>
                            <li className="nav-header">จัดการระบบ</li>
                            <li className="nav-item">
                                <NavLink to='/admin/order/fail' className="nav-link">
                                <i class="nav-icon fa fa-calendar"></i>
                                    <p>จัดการการจองคิว</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/order/fail' className="nav-link">
                                    <i className="nav-icon fa fa-search" />
                                    <p>จัดการเคสคนเข้าปรึกษา</p>
                                </NavLink>
                            </li>

                            <li className="nav-header">จัดการคอนเทนท์</li>
                            <li className="nav-item">
                                <NavLink to='/admin/products' className="nav-link">
                                    <i className="nav-icon fa fa-lightbulb" />
                                    <p>เนื้อหาคอนเทนท์</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/order/process' className="nav-link">
                                    <i className="nav-icon fa fa-th-list" />
                                    <p>รายการตอบกลับ</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/products' className="nav-link">
                                    <i className="nav-icon fa fa-question-circle" />
                                    <p>จัดการคำถาม</p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/admin/order/pass' className="nav-link">
                                    <i className="nav-icon fa fa-check-square" />
                                    <p>จัดการคำตอบ</p>
                                </NavLink>
                            </li>

                            <li className="nav-header">จัดการข้อมูล</li>
                            <li className="nav-item">
                                <NavLink to='/admin/customers' className="nav-link">
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