import React, { useEffect, useState } from 'react';
import userService from './../../../service/userService';

const CardUser = () => {
    const [count, setCount] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await userService.userCount();
                setCount(res.data.data);
                setTotalUsers(res.data.totalUsers); // ใช้ totalUsers แทน totleUses
            } catch (error) {
                console.error("Failed to fetch user counts", error);
            }
        };
        fetchData();
    }, []);

    const officerCount = count.find(item => item.role === 'OFFICER')?._count?.role || 0;
    const physicianCount = count.find(item => item.role === 'PHYSICIAN')?._count?.role || 0;
    const userCount = count.find(item => item.role === 'USER')?._count?.role || 0;

    return (
<div>
    <div className="row">
        {/* ./col */}
        <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-success">
                <div className="inner">
                    <h3>{totalUsers}</h3> {/* แสดงจำนวนผู้ใช้งานทั้งหมด */}
                    <p>ผู้ใช้งานระบบทั้งหมด</p>
                </div>
                <div className="icon">
                    <i className="nav-icon fa fa-users" />
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-info">
                <div className="inner">
                    <h3>{userCount}</h3>
                    <p>ผู้ใช้งาน</p>
                </div>
                <div className="icon">
                    <i className="nav-icon fa fa-user-circle" />
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-success">
                <div className="inner">
                    <h3>{officerCount}</h3>
                    <p>เจ้าหน้าที่</p>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-info">
                <div className="inner">
                    <h3>{physicianCount}</h3>
                    <p>เจ้าหน้าที่ให้คำปรึกษา</p>
                </div>
                <div className="icon">
                    <i className="nav-icon fa  fa-user-md" />
                </div>
            </div>
        </div>
    </div>
</div>

    );
}

export default CardUser;
