import React from 'react'
import Booking from '../../components/common/Booking'
import CardBookingType from '../../components/common/card/CardBookingType'

const OfficerBooking = () => {
  return (
    <div className='p-3'>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">จัดการการจองคิว</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">officer</a></li>
                <li className="breadcrumb-item active">reservation</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      <CardBookingType />
      <Booking />
    </div>
  )
}

export default OfficerBooking