import React from 'react'
import { useInfiniteQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import Card from '../../components/Card/Card'
import { fetchProductList } from '../../services/Api'

function Products() {
    const filter = useParams()
    const { data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status } = useInfiniteQuery(['products', filter], () => fetchProductList(filter), {
            getNextPageParam: (lastPage, pages) => {
                const morePagesExist = lastPage?.length === 20;
                if (!morePagesExist) return
                return pages.length + 1
            }
        })
    if (status === "loading") return 'Yükleniyor...'

    if (status === "error") return 'An error has occurred: ' + error.message

    return (
        <div className='container'>
            <div className="row">
                {
                    data.pages.map((group, i) => (
                        <React.Fragment key={i}>
                            {
                                group.map((item) => (
                                    <Card item={item} key={item.id} />
                                ))
                            }
                        </React.Fragment>
                    ))
                }
            </div>
            <div className="text-center mb-3">
                <div>
                    <button
                        className='btn btn-primary'
                        onClick={() => fetchNextPage()}
                        disabled={!hasNextPage || isFetchingNextPage}
                    >
                        {isFetchingNextPage
                            ?
                            <div className="d-flex align-items-center">
                                <div className="spinner-border ms-auto me-2" role="status" aria-hidden="true"></div>
                                <strong>Daha Fazla Ürün Yükleniyor...</strong>
                            </div>
                            : hasNextPage
                                ? 'Daha Fazla Yükle'
                                : 'Daha Fazla Yüklenecek Ürün Kalmadı'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Products