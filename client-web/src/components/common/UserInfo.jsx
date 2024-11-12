import React, { useEffect, useState } from 'react';
import userService from '../../service/userService';

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await userService.userInfo();
                setUserInfo(res.data.data);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="user-info-card container mt-4">
                <div className="card shadow-sm">
                    <div className="card-body d-flex align-items-center">
                        <div className="info">
                            <h5 className="card-title text-primary">{userInfo.title}{userInfo.full_name}</h5>
                            <p className="card-text">
                                <span className="font-weight-bold">สถานะ: </span>
                                <span className='bg-success p-2 badge'>
                                    {userInfo.role}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserInfo;
