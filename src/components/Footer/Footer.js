import React from 'react'
import './footer.css'
import { BsFacebook, BsYoutube, BsTwitter } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'

function Footer() {
    return (
        <footer className="py-4 bg-primary mt-auto footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <nav className="text-center">
                            <a href="#facebook" className="btn btn-icon btn-outline-warning me-2">
                                <BsFacebook className='footer-icon' />
                            </a>
                            <a href="#instagram" className="btn btn-icon btn-outline-warning me-2">
                                <AiFillInstagram className='footer-icon' />
                            </a>
                            <a href="#youtube" className="btn btn-icon btn-outline-warning me-2">
                                <BsYoutube className='footer-icon' />
                            </a>
                            <a href="#twitter" className="btn btn-icon btn-outline-warning">
                                <BsTwitter className='footer-icon' />
                            </a>
                        </nav>
                    </div>
                    <div className="col-md-12">
                        <p className="text-center text-white mt-3">@2022 - Tüm hakları saklıdır.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer