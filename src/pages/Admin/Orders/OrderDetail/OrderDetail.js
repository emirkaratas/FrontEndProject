import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchOrder } from '../../../../services/Api'
import { Table } from 'antd'

function OrderDetail() {
    const { id } = useParams()
    const { isLoading, error, data } = useQuery(["order", id], () => fetchOrder(id))

    if (isLoading) return 'Yükleniyor...'

    if (error) return 'Hata: ' + error.message
    const productDetail = data.map((product,index) => ({ quantity: product.quantity, productName: product.productName, unitPrice: product.unitPrice, id:index }))
    const total = productDetail.reduce((acc, obj) => acc + (obj.unitPrice * obj.quantity), 0)
    const columns = [
        {
            title: 'Ürün Sayısı',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Ürün İsmi',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Ürün Fiyatı',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
        },
    ];

    return (
        <div className='container w-50'>
            <div className="div bg-light mt-3 mb-3">
                <div className="card border-top border-bottom border-3 ">
                    <div className="container">
                        <div className="card-body p-5">
                            <p className='mb-3 h4 text-center'>Sipariş</p>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='detail-spec'>
                                    <p className="text-muted mb-1">Sipariş Tarihi</p>
                                    <span className='h6'>{data[0].orderDate.slice(0, 19)}</span>
                                </div>
                                <div>
                                    <p className="text-muted mb-1">Telefon Numarası</p>
                                    <span className='h6'>+90 {data[0].customerPhone}</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <div>
                                    <p className="text-muted mb-1">Mail</p>
                                    <span className='h6'>{data[0].userMail}</span>
                                </div>
                                <div className='d-flex'>
                                    <div className='me-3'>
                                        <p className="text-muted mb-1">Ad</p>
                                        <span className='h6'>{data[0].customerFirstName}</span>
                                    </div>
                                    <div>
                                        <p className="text-muted mb-1">Soyad</p>
                                        <span className='h6'>{data[0].customerLastName}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 mb-3">
                                <span className="text-muted mb-1">Ürünler</span>
                                <div>
                                    <Table dataSource={productDetail} columns={columns} className="mt-3" rowKey="id"/>
                                </div>
                                <div>
                                    <span className='text-muted'>Toplam Fiyat</span>
                                    <p className="lead fw-bold mb-0">{total}</p>
                                </div>
                            </div>
                            <Link to="/admin/orders">
                                <button className='btn btn-primary'>Geri Dön</button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail