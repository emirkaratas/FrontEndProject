import React from 'react'
import { deleteProduct, fetchProductList } from '../../../services/Api'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Table, Space, Popconfirm, message } from 'antd'
import { Link } from 'react-router-dom'
import { useBasket } from '../../../contexts/BasketContext'

function Products() {
  const queryClient = useQueryClient()
  const { removeFromBasket } = useBasket()
  const { isLoading, error, data } = useQuery("admin:products", fetchProductList)

  const deleteMutation = useMutation(deleteProduct,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("admin:products")  
        queryClient.refetchQueries(["products",{}])  
      }   
    }
  )

  if (isLoading) return 'Yükleniyor...'

  if (error) return 'Hata: ' + error.message

  const columns = [
    {
      title: 'Ürün İsmi',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Fiyat',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span className='text-success'>{text}</span>
    },
    {
      title: 'Oluşturulma Tarihi',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: "",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Link to={`/admin/products/${record.id}`} className="text-decoration-none">Güncelle</Link>
          <Popconfirm
            title="Ürünü Sil"
            description="Ürünü silmek istediğinize emin misiniz?"
            onConfirm={() => {
              deleteMutation.mutate(record.id, {
                onSuccess: () => {
                  removeFromBasket(record.id)
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
      <Table dataSource={data} columns={columns} rowKey="id" />
    </div>
  )
}

export default Products