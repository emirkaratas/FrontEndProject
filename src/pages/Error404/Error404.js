import React from 'react'
import { Link } from 'react-router-dom'

function Error404() {
    return (
        <div class="d-flex align-items-center justify-content-center">
            <div class="text-center">
                <h1 class="display-1 fw-bold">404</h1>
                <p class="fs-3"> <span class="text-danger">Hata!</span> Sayfa Bulunamadı.</p>
                <Link to="/" className='btn btn-primary'>Ana Sayfaya Dön</Link>
            </div>
        </div>
    )
}

export default Error404