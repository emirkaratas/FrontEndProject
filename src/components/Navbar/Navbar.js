import React, { useState } from 'react'
import './navbar.css'
import { Link, useNavigate } from "react-router-dom"
import { FaSignInAlt, FaShoppingCart, FaSignOutAlt, FaSearch } from "react-icons/fa"
import { RiAdminFill } from "react-icons/ri"
import { useAuth } from '../../contexts/AuthContext'
import { MdAccountCircle } from 'react-icons/md'
import { useBasket } from '../../contexts/BasketContext'
import { Badge } from 'react-bootstrap'

function Navbar() {
    const { loggedIn, user } = useAuth()
    const [search,setSearch] = useState("")
    const { items } = useBasket()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearch("")
    }

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
                                {
                                    !loggedIn &&
                                    <>
                                        <Link to="/signin">
                                            <button className="btn btn-primary me-2" >
                                                <FaSignInAlt className='navbar-icon' />
                                                <span className="ms-1 d-none d-sm-inline-block">Giriş Yap</span>
                                            </button>
                                        </Link>
                                        <Link to="/signup">
                                            <button className="btn btn-primary me-2">
                                                <FaSignOutAlt className='navbar-icon' />
                                                <span className="ms-1 d-none d-sm-inline-block">Kayıt Ol</span>
                                            </button>
                                        </Link>
                                    </>
                                }
                                {
                                    loggedIn &&
                                    <>
                                        {
                                            user.role === "admin" && (
                                                <Link to="/admin">
                                                    <button className="btn btn-primary me-2" >
                                                        <RiAdminFill className='navbar-icon' />
                                                        <span className="ms-1 d-none d-sm-inline-block">Admin</span>
                                                    </button>
                                                </Link>
                                            )
                                        }
                                        <Link to="/profile">
                                            <button className="btn btn-primary me-2" >
                                                <MdAccountCircle className='navbar-icon' />
                                                <span className="ms-1 d-none d-sm-inline-block">Hesabım</span>
                                            </button>
                                        </Link>
                                        <Link to="/cart">
                                            <button className="btn btn-primary">
                                                <span className='position-relative me-2 me-md-0'>
                                                    <FaShoppingCart className='navbar-icon' />
                                                    <Badge pill bg="info" className='position-absolute top-10 start-50'>
                                                        {items.length}
                                                    </Badge>{' '}
                                                </span>
                                                <span className="custom-navbar-margin d-none d-sm-inline-block">Sepet</span>
                                            </button>
                                        </Link>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Ara" value={search} onChange={handleChange}/>
                                    <button type="submit" className="btn btn-primary" onClick={()=>navigate(`/search/${search}`)}>
                                        <FaSearch />
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