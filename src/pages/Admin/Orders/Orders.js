import React from 'react'
import { useQuery } from 'react-query'
import Table from 'react-bootstrap/Table';
import { fetchOrders } from '../../../services/Api'
import { Link } from 'react-router-dom';

function Orders() {
  const { isLoading, error, data } = useQuery('admin:orders', fetchOrders)

  if (isLoading) return 'Yükleniyor...'

  if (error) return 'Hata Yakalandı: ' + error.message
  return (
    <div className='container'>
      <h2 className='text-center mt-2 mb-2'>Siparişler</h2>
      <Table striped bordered hover className='mt-3'>
        <thead>
          <tr>
            <th>Kullanıcı</th>
            <th>İsim</th>
            <th>Soyisim</th>
            <th>Telefon Numarası</th>
            <th>Sipariş Tarihi</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item) => {
              return <tr key={item.orderId}>
                <td>{item.userMail}</td>
                <td>{item.customerFirstName}</td>
                <td>{item.customerLastName}</td>
                <td>+90 {item.customerPhone}</td>
                <td>
                  <Link className='text-decoration-none' to={`/admin/order/${item.orderId}`}>
                    {item.orderDate.slice(0,10)}
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