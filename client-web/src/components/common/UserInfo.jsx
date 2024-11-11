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
            {userInfo && (
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="info">
                        <h5 className="d-block bg-dark">{userInfo.title}{userInfo.firstName} {userInfo.lastName}</h5>
                        <p className="d-block text-center bg-dark">สถานะ: <span className='bg-success p-1'>{userInfo.role}</span></p>
                    </div>
                </div>
            )}

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
