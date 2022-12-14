import React from 'react'
import './navbar.css'
import { Link } from "react-router-dom"
import { FaSignInAlt, FaShoppingCart, FaSignOutAlt, FaSearch } from "react-icons/fa"


function Navbar() {
    return (
        <div className='bg-light'>
            <div className='top-bar'>
                <div className="container">
                    <div className="row align-items-center gy-3">
                        <div className="col-lg-2 col-sm-4 col-4">
                            <Link to="/" className='navbar-brand h1'>Site</Link>
                        </div>
                        <div className="col-lg-5 text-end order-lg-last col-sm-8 col-8">
                            <div>
                                <Link to="/signin">
                                    <button className="btn btn-primary me-2" >
                                        <FaSignInAlt></FaSignInAlt>
                                        <span className="ms-1 d-none d-sm-inline-block">Giriş Yap</span>
                                    </button>
                                </Link>
                                <Link to="/signup">
                                    <button className="btn btn-primary me-2">
                                        <FaSignOutAlt></FaSignOutAlt>
                                        <span className="ms-1 d-none d-sm-inline-block">Kayıt Ol</span>
                                    </button>
                                </Link>
                                <Link to="/cart">
                                    <button className="btn btn-primary">
                                        <FaShoppingCart></FaShoppingCart>
                                        <span className="ms-1 d-none d-sm-inline-block">Sepet</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <form action="">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Work in Progress..." />
                                    <button className="btn btn-primary">
                                        <FaSearch/>
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <nav className="navbar bg-primary navbar-dark navbar-expand-lg">
                <div className="container">
                    <button className="navbar-toggler border" data-bs-toggle="collapse" data-bs-target="#navbar_main"
                        type="button">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar_main">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className='nav-link ps-0'>Tüm Ürünler</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar