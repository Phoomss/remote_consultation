import { Outlet } from "react-router-dom"
import SideNav from "../components/admin/SideNav"
import Header from "../components/Header"
import Footer from "../components/Footer"

const AdminLayout = () => {
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

export default AdminLayout