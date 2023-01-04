import React from 'react'
import { deleteProduct, fetchAdminProducts } from '../../../services/Api'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Table, Space, Popconfirm, message } from 'antd'
import { Link } from 'react-router-dom'
import { useBasket } from '../../../contexts/BasketContext'

function Products() {
  const queryClient = useQueryClient()
  const { removeFromBasket } = useBasket()
  const { isLoading, error, data } = useQuery("admin:products", fetchAdminProducts)
  const deleteMutation = useMutation(deleteProduct,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("admin:products")  
        queryClient.refetchQueries("products")
        queryClient.refetchQueries("products-home")
      }   
    }
  )

  if (isLoading) return 'Yükleniyor...'

  if (error) return 'Hata: ' + error.message

  const columns = [
    {
      title: 'Ürün İsmi',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Fiyat',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (text) => <span className='text-success'>{text}</span>
    },
    {
      title: 'Stok',
      dataIndex: 'unitsInStock',
      key: 'unitsInStock',
    },
    {
      title: "",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Link to={`/admin/products/${record.productId}`} className="text-decoration-none">Güncelle</Link>
          <Popconfirm
            title="Ürünü Sil"
            description="Ürünü silmek istediğinize emin misiniz?"
            onConfirm={() => {
              deleteMutation.mutate(record.productId, {
                onSuccess: () => {
                  removeFromBasket(record.productId)
                  message.success("Ürün Silindi")
                }
              })
            }}
            okText="Evet"
            cancelText="Hayır"
          >
            <a href="#" className="text-decoration-none">Sil</a>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <div className='container mt-3'>
      <div className="text-end">
        <Link to={"/admin/products/new"}>
          <button className='btn btn-primary mb-3 btn-lg'>Yeni Ürün</button>
        </Link>
      </div>
      <Table dataSource={data} columns={columns} rowKey="productId" />
    </div>
  )
}

export default Products