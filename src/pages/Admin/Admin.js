import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Admin() {
    return (
        <div>
            <nav className="navbar bg-light navbar-expand-lg">
                <div className="container">
                    <button className="navbar-toggler border" data-bs-toggle="collapse" data-bs-target="#navbar_main"
                        type="button">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar_main">
                        <ul className="navbar-nav">
                            <li className="nav-item me-2">
                                <Link to="/admin" className='nav-link ps-0'>Admin Ana Sayfa</Link>
                            </li>
                            <li className="nav-item me-2">
                                <Link to="/admin/orders" className='nav-link ps-0'>Siparişler</Link>
                            </li>
                            <li className="nav-item me-2">
                                <Link to="/admin/products" className='nav-link ps-0'>Ürünler</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </div>
    )
}

export default Admin