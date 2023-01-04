import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

function Profile() {
    const { Meta } = Card;
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const handleLogout = async () => {
        logout()
        navigate('/')
    }

    return (
        <div className='d-flex align-items-center justify-content-center overflow-hidden'>
                    <Card
                        className='mt-5 mx-3 mx-md-0'
                        style={{
                            width: 400,
                        }}
                        actions={[
                            <Link to="/" className='d-flex align-items-center justify-content-center text-decoration-none'>
                                <HomeOutlined key="home" />
                                <span className='d-none d-md-block ms-2'>Ana Sayfa</span>
                            </Link>,
                            <div className='d-flex align-items-center justify-content-center' onClick={handleLogout}>
                                <LogoutOutlined/>
                                <span className='d-none d-md-block ms-2'>Çıkış Yap</span>
                            </div>
                        ]}

                    >
                        <Meta
                            className='h5'
                            avatar={<Avatar className="bg-primary" >{user.firstName}</Avatar>}
                            title={<span className='h5'>{`${user.firstName} ${user.lastName}`}</span>}
                            description={<div>
                                <div className='mb-2'>Kullanıcı Adı: {user.userName}</div>
                                <div className='mb-2'>Mail: {user.email}</div>
                                <div>Roller: {user.roles.map((role, index) => <span className='me-1 btn btn-sm bg-light' key={index}>{role}</span>)}</div>
                            </div>}
                        />
                    </Card>
        </div>
    )
}

export default Profile