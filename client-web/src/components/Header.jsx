import React from 'react'

const Header = () => {
    return (
        <div>
            {/* Navbar */}
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>
                    <li class="nav-item d-none d-sm-inline-block">
                        <a href="index.php" class="nav-link">ระบบให้คำปรึกษาทางไกลสำหรับผู้รับบริการคลินิกเทคนิคการแพทย์ฟ้าสีรุ้งจังหวัดนครปฐม</a>
                    </li>
                </ul>
            </nav>
            {/* /.navbar */}
            
        </div>
    )
}

export default Header