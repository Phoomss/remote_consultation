import React from 'react'
import Consult from '../../components/physician/Consult'

const PhysicianConsultPage = () => {
    return (
        <div className='p-3'>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">จัดการเคสคนเข้าปรึกษา</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">physician</a></li>
                                <li className="breadcrumb-item active">consult</li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>

            <Consult />
        </div>
    )
}

export default PhysicianConsultPage