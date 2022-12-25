import React from 'react'
import { useQuery } from 'react-query'
import { fetchOrders } from '../../../services/Api'

function Orders() {
  const { isLoading, error, data } = useQuery('admin:orders',fetchOrders)

  if (isLoading) return 'Yükleniyor...'

  if (error) return 'Hata Yakalandı: ' + error.message

  console.log(data);

  return (
    <div>Orders</div>
  )
}

export default Orders