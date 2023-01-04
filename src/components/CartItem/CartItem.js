import React from 'react'
import Figure from 'react-bootstrap/Figure';
import { Link } from 'react-router-dom';
import { useBasket } from '../../contexts/BasketContext';
import './cart-item.css'

function CartItem({ item }) {
    const { handleIncrease, handleDecrease, removeFromBasket } = useBasket()

    return (
        <Figure className='d-flex card shadow flex-row '>
            <Link to={`/product/${item.productId}`} className='cart-img-wrap border border-top-0 border-start-0'>
                {
                    item.imageUrls.length == 0 ? <Figure.Image src='https://fomantic-ui.com/images/wireframe/image.png' alt='cart-product' loading='lazy' /> : <Figure.Image src={item.imageUrls[0].imageUrl} alt='cart-product' loading='lazy' />
                }
            </Link>
            <Figure.Caption className='m-2 w-100'>
                <div>
                    <div>
                        <Link to={`/product/${item.productId}`} className='title h5'>
                            {item.productName}
                        </Link>
                        <div className="price-wrap">
                            <span className="price">{item.unitPrice} TL</span>
                        </div>
                    </div>
                    <div className='d-flex w-100'>
                        <div className='d-flex align-items-space-between mt-3'>
                            <button className='btn btn-primary responsive-button' onClick={() => handleDecrease(item)}>-</button>
                            <div className="text-center bg-light count-wrapper d-flex align-items-center justify-content-center">
                                {item.count}
                            </div>
                            <button className='btn btn-primary responsive-button' onClick={() => handleIncrease(item)}>+</button>
                        </div>
                        <div className="text-end d-block mt-3 w-100">
                            <button className='btn btn-primary responsive-button' onClick={() => removeFromBasket(item.productId)}>Sepetten Kaldır</button>
                        </div>
                    </div>

                </div>
            </Figure.Caption>
        </Figure>
    )
}

export default CartItem