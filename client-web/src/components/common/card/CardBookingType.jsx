import React, { useEffect, useState } from 'react'
import bookingService from './../../../service/bookingService';

const CardBookingType = () => {
    const [count, setCount] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await bookingService.countBookingType();
                setCount(res.data.data);
            } catch (error) {
                console.error("Failed to fetch booking counts", error);
            }
        };
        fetchData();
    }, []);

    const bloodTestCount = count.find(item => item.booking_type === 'bloodTest')?._count?.booking_type || 0;
    const consultCount = count.find(item => item.booking_type === 'consult')?._count?.booking_type || 0;

    return (
        <div>
            <div className="row">
                <div className="col-lg-6 col-6">
                    {/* small box */}
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>{bloodTestCount}</h3>
                            <p>จองคิวเจาะเลือด</p>
                        </div>
                        <div className="icon">
                            <i className="nav-icon fa fa-calendar"></i>
                        </div>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-6 col-6">
                    {/* small box */}
                    <div className="small-box bg-success">
                        <div className="inner">
                            <h3>{consultCount}</h3>
                            <p>จองคิวปรึกษา</p>
                        </div>
                        <div className="icon">
                            <i className="nav-icon fa fa-calendar"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardBookingType;
