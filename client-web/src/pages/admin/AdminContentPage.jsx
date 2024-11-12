import React from 'react'
import Content from '../../components/common/Content'
import CreateContent from '../../components/common/form/CreateContent'

const AdminContentPage = () => {
  return (
    <div className='p-3'>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">เนื้อหาคอนเทนท์</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">admin</a></li>
                <li className="breadcrumb-item active">content</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      <CreateContent/>
      <Content/>
    </div>
  )
}

export default AdminContentPage