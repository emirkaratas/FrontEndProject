import React from 'react'
import { useQuery } from 'react-query'
import Card from '../../components/Card/Card'
import { fetchProductList } from '../../services/Api'

function Products() {
    const { isLoading, error, data } = useQuery('products', fetchProductList)

    if (isLoading) return 'Yükleniyor...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className='container'>
            <div className="row">
                {
                    data.map((item, key) => {
                        return <Card key={key} item={item} />
                    })
                }
            </div>
        </div>
    )
}

export default Products