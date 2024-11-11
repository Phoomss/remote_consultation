import React from 'react'
import Header from '../components/Header'
import SideNav from '../components/physician/SideNav'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const PhysicianLayout = () => {
    return (
        <div className='wrapper'>
            <Header />
            <SideNav />
            <div className="content-wrapper">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default PhysicianLayout