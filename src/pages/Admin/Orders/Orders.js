import React from 'react'
import { useQuery } from 'react-query'
import Table from 'react-bootstrap/Table';
import { fetchOrders } from '../../../services/Api'
import { Link } from 'react-router-dom';

function Orders() {
  const { isLoading, error, data } = useQuery('admin:orders', fetchOrders)

  if (isLoading) return 'Yükleniyor...'

  if (error) return 'Hata Yakalandı: ' + error.message

  let count

  return (
    <div className='container'>
      <h2 className='text-center mt-2 mb-2'>Siparişler</h2>
      <Table striped bordered hover className='mt-3'>
        <thead>
          <tr>
            <th>Kullanıcı</th>
            <th>İsim</th>
            <th>Soyisim</th>
            <th>Adres</th>
            <th>Ürün Sayısı</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item) => {
              let count = 0
              item.items.forEach(element => {
                count += element.count
              });
              return <tr key={item.id}>
                <td>{item.user.mail}</td>
                <td>{item.orderDetails.name}</td>
                <td>{item.orderDetails.surname}</td>
                <td>{item.orderDetails.address}</td>
                <td>
                  <Link className='text-decoration-none' to={`/admin/order/${item.id}`}>
                    <div className='btn btn-primary btn-sm'>
                      {count}
                    </div>
                    <span className='ms-2'>Detaya Git</span>    
                  </Link>      
                </td>
              </tr>
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Orders