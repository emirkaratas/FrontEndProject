import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
function Profile() {
    const navigate = useNavigate()
    const {user,logout} = useAuth()
    const handleLogout = async () => {
        logout()
        navigate('/')
    }
    return (
        <div className='d-flex flex-row'>
            <p>{JSON.stringify(user)}</p>
            <button className='btn btn-primary btn-lg d-inline' onClick={handleLogout}>Çıkış Yap</button>
        </div>
    )
}

export default Profile