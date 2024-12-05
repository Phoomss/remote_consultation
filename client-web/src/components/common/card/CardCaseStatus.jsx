import React, { useEffect, useState } from 'react'
import bookingService from './../../../service/bookingService';
import caseService from './../../../service/caseService';

const CardCaseStatus = () => {
    const [count, setCount] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await caseService.caseCount();
                setCount(res.data.data);
            } catch (error) {
                console.error("Failed to fetch booking counts", error);
            }
        };
        fetchData();
    }, []);

    const completedCount = count.find(item => item.case_status === 'completed')?._count?.case_status || 0;
    const acceptingCount = count.find(item => item.case_status === 'accepting')?._count?.case_status || 0;

    return (
        <div>
            <div className="row">
                {/* ./col */}
                <div className="col-lg-6 col-6">
                    {/* small box */}
                    <div className="small-box bg-success">
                        <div className="inner">
                            <h3>{acceptingCount}</h3>
                            <p>รับเคส</p>
                        </div>
                        <div className="icon">
                            <i className="nav-icon fa fa-search" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-6">
                    {/* small box */}
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>{completedCount}</h3>
                            <p>รับเข้าปรึกษาแล้ว</p>
                        </div>
                        <div className="icon">
                            <i className="nav-icon fa fa-search" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardCaseStatus;
