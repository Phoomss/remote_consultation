import React from 'react'
import CreateAnswer from '../../components/common/form/CreateAnswer'
import Answer from '../../components/common/Answer'

const OfficerAnswerPage = () => {
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
                        <li className="breadcrumb-item"><a href="#">officer</a></li>
                        <li className="breadcrumb-item active">assessment</li>
                        <li className="breadcrumb-item active">answer</li>
                    </ol>
                </div>{/* /.col */}
            </div>{/* /.row */}
        </div>{/* /.container-fluid */}
    </div>
    <CreateAnswer />
    <Answer />
</div>
  )
}

export default OfficerAnswerPage