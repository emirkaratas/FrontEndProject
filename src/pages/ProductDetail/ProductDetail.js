import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchProduct } from '../../services/Api'
import { FaShoppingCart, FaTruck } from "react-icons/fa"
import { HiGift } from "react-icons/hi"
import "./product_detail.css"
import ImageGallery from 'react-image-gallery';


function ProductDetail() {
    const { product_id } = useParams()
    const { isLoading, error, data } = useQuery(["product", product_id], () => fetchProduct(product_id))

    if (isLoading) return 'Yükleniyor...'

    if (error) return 'An error has occurred: ' + error.message

    const images = data.photo.map((url) => ({ original: url }))

    return (
        <div className='container mt-3'>
            <div className="row">
                <aside className="col-lg-5 bg-light ">
                    <div className="">
                        <ImageGallery
                            items={images}
                            showPlayButton={false}
                            useBrowserFullscreen={false}
                            showNav={true}
                            showIndex={true}
                        />
                    </div>
                </aside>
                <main className="col-lg-7 details d-flex flex-column align-items-space-between ">
                    <h1>{data.title}</h1>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-8">
                            <div className="divider"></div>
                            <div className="stock-web mb-3 h5">
                                <span className="stock-status">Durumu: </span>
                                <span className="in-stock text-success">Stokta Var</span>
                            </div>
                            <div className="price-wrap">
                                <div className="d-flex flex-column">
                                    <span className="price h4">
                                        <small>₺</small>
                                        <strong>{data.price}</strong>
                                    </span>
                                    <small className="text-success">KDV dahil</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 text-end">
                            <button className='btn btn-lg btn-info text-white btn-s1'>
                                <div className="d-inline-block">
                                    <div className="d-flex">
                                        <div className="spin me-2"><FaShoppingCart /></div>
                                        <span>Sepete Ekle</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <hr />
                    <div className="well d-flex align-items-center ">
                        <HiGift className='icon me-2' />
                        <span>Ücretsiz Kargo</span>
                    </div>
                    <div className="well d-flex align-items-center">
                        <FaTruck className='icon me-2' />
                        <span>17:30'a kadar verilen siparişler aynı gün kargoya verilir.</span>
                    </div>
                    <div className="well d-flex flex-column " id='last'>
                        <span className='h5'>Özellikler</span>
                        <div className="text-truncate">
                            {data.description}
                        </div>
                        <a href="#specs" className='mt-2'>Daha Fazlasını Göster</a>
                    </div>
                </main>
                <div className="col-lg-12 ">
                    <div className="bg-primary">
                        <p className='asd'>
                            {data.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail