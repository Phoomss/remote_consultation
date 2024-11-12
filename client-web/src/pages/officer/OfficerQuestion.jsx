import React from 'react'
import Question from '../../components/common/Question'

const OfficerQuestion = () => {
    return (
        <div className='p-3'>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">จัดการคำถาม</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">admin</a></li>
                                <li className="breadcrumb-item active">assessment</li>
                                <li className="breadcrumb-item active">question</li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            <Question />
        </div>
    )
}

export default OfficerQuestion