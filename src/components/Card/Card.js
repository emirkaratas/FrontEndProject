import React from 'react'
import { Link } from 'react-router-dom'
import './card.css'
import { FaShoppingCart } from "react-icons/fa"
import { useBasket } from '../../contexts/BasketContext'

function Card({ item }) {
    const { addToBasket, items } = useBasket()
    const findBasketItem = items.find((basket_item) => basket_item.productId === item.productId)
    
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mt-3">
            <figure className="card shadow">
                <Link to={`/product/${item.productId}`} className='img-wrap'>
                    {
                        item.imageUrls.length == 0 ? <img src='https://fomantic-ui.com/images/wireframe/image.png'/>: <img src={item.imageUrls[0].imageUrl} alt="product" loading='lazy' />
                    }
                    
                </Link>
                <figcaption className="info-wrap border-top">
                    <Link to={`/product/${item.productId}`} className='title text-truncate h5'>
                        {item.productName}
                    </Link>
                    <div className="price-wrap">
                        <span className="price">{item.unitPrice} TL</span>
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