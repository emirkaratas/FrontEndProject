import { Carousel } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import Card from '../../components/Card/Card'
import { fetchTakeProducts } from '../../services/Api'

import './style.css'
function HomePage() {
    const { isLoading, error, data } = useQuery("products-home", () => fetchTakeProducts(12))

    if (isLoading) return 'Yükleniyor...'

    if (error) return 'An error has occurred: ' + error.message

    const contentStyle = {
        height: '450px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    return (
        <div className='container'>
            <Carousel effect="fade" className='mt-3' autoplay>
                <div>
                    <h3 style={contentStyle} className="d-flex align-items-center justify-content-center">
                        <img src="https://kimyacibaba.com/wp-content/uploads/2019/11/ücretsiz-kargo.png" alt="" />
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle} className="d-flex align-items-center justify-content-center">
                        <img src="https://www.donanimhaber.com/images/images/haber/154834/src/8-geforce-rtx-4090-sekiz-haneli-sifreyi-48-dakikada-kirabilir154834_1.jpg" alt="" className='image' />
                    </h3>
                </div>
            </Carousel>
            <div className="row">
                <span className='h5 text-center mt-3'>Son Eklenen Ürünler</span>
                {
                    data.map((item) => <Card item={item} key={item.productId} className="col-12 col-lg-3" />)
                }
            </div>
        </div>
    )
}

export default HomePage