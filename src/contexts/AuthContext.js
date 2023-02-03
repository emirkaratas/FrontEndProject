import { createContext, useContext, useEffect, useState } from "react";
import { fetchLogout, fetchMe } from "../services/Api";
import Spinner from 'react-bootstrap/Spinner';

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const me = await fetchMe()              
                setLoggedIn(true)               
                setUser(me)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        })
            ()
    }, [])

    const login = (data) => {
        if (data.isSuccess == false) {
            throw data.data.message
        }
        setLoggedIn(true)
        setUser(data.data)
        localStorage.setItem('access-token', data.data.token.tokenBody)
        localStorage.setItem('refresh-token', data.data.token.refreshToken)
    }

    const logout = async()=>{
        setLoggedIn(false)
        setUser(null)
        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-token')
    }

    const values = {
        loggedIn,
        user,
        login,
        logout
    }
    if (loading) {
        return <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" />
        </div>

    }
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)
export { AuthProvider, useAuth }
