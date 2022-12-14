import React from 'react'
import { Link } from 'react-router-dom'
import './card.css'
import { FaShoppingCart } from "react-icons/fa"

function Card({item}) {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mt-3">
            <figure className="card shadow">
                <Link to="#/" className='img-wrap'>
                    <img src={item.photo} alt="product" />
                </Link>
                <figcaption className="info-wrap border-top">
                    <Link to="#/" className='title text-truncate h5'>
                        {item.title}
                    </Link>
                    <div className="price-wrap">
                        <span className="price">{item.price} TL</span>
                    </div>
                    <ul className="product-links">
                        <li>
                            <button className='btn btn-primary'>
                                <FaShoppingCart />
                                <span>Sepete Ekle</span>
                            </button>
                        </li>
                    </ul>
                </figcaption>
            </figure>
        </div>
    )
}

export default Card