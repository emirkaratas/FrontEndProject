import React from 'react'
import { useQuery } from 'react-query'
import Card from '../../components/Card/Card'

function Products() {
    const { isLoading, error, data } = useQuery('repoData', () =>
        fetch('http://localhost:8080/api/products').then(res =>
            res.json()
        )
    )

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    console.log(data);

    return (
        <div className='container'>
            <div className="row">
                {
                    data.map((item,key)=>{
                        return <Card key={key} item={item}/>
                    })
                }
            </div>
        </div>
    )
}

export default Products