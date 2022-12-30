import React from 'react'
import { Link } from 'react-router-dom'

function Error404() {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Hata!</span> Sayfa Bulunamadı.</p>
                <Link to="/" className='btn btn-primary'>Ana Sayfaya Dön</Link>
            </div>
        </div>
    )
}

export default Error404