import React from 'react'
import AssessmentDetail from '../../components/common/AssessmentDetail'

const OfficerAssessmentDetailPage = () => {
    return (
        <div className='p-3'>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">รายละเอียดรายการตอบกลับ</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">admin</a></li>
                                <li className="breadcrumb-item active">assessment</li>
                                <li className="breadcrumb-item active">response</li>
                                <li className="breadcrumb-item active">detail</li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            <AssessmentDetail />
        </div>
    )
}

export default OfficerAssessmentDetailPage