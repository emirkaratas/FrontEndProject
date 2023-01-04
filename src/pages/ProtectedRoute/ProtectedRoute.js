import React from 'react'
import { Navigate, Outlet, } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';

function ProtectedRoute({admin}) {
    const {loggedIn,user} = useAuth()
    if(admin && user == null) return <Navigate to="/"/>
    if(admin && !user.roles.includes("Admin")) return <Navigate to="/"/>
    return loggedIn ? <Outlet/> : <Navigate to="/signin"/>;
}

export default ProtectedRoute