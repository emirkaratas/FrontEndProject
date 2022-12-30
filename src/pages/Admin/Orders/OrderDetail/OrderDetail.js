import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchOrder } from '../../../../services/Api'

function OrderDetail() {
    const { id } = useParams()
    const { isLoading, error, data } = useQuery(["order", id], () => fetchOrder(id))

    if (isLoading) return 'Yükleniyor...'

    if (error) return 'Hata: ' + error.message

    return (
        <div className='container'>
            <div className="div bg-light mt-3 mb-3">
                <div className="row">
                    <div className="col-lg-9">
                        {
                            JSON.stringify(data)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail