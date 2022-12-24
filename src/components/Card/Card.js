import React from 'react'
import { Link } from 'react-router-dom'
import './card.css'
import { FaShoppingCart } from "react-icons/fa"
import { useBasket } from '../../contexts/BasketContext'

function Card({ item }) {
    const { addToBasket, items } = useBasket()
    const findBasketItem = items.find((basket_item) => basket_item.id === item.id)

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mt-3">
            <figure className="card shadow">
                <Link to={`/product/${item.id}`} className='img-wrap'>
                    <img src={item.photo[0]} alt="product" loading='lazy' />
                </Link>
                <figcaption className="info-wrap border-top">
                    <Link to={`/product/${item.id}`} className='title text-truncate h5'>
                        {item.title}
                    </Link>
                    <div className="price-wrap">
                        <span className="price">{item.price} TL</span>
                    </div>
                    <ul className="product-links">
                        <li>
                            <button className='btn btn-primary' onClick={()=>addToBasket(item,findBasketItem)}>
                                <FaShoppingCart />
                                <span className='ms-2'>
                                    {
                                        findBasketItem ? 'Sepetten Çıkart' : 'Sepete Ekle'
                                    }
                                </span>
                            </button>
                        </li>
                    </ul>
                </figcaption>
            </figure>
        </div>
    )
}

export default Card