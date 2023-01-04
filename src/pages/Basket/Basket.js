import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import CartItem from '../../components/CartItem/CartItem'
import { useBasket } from '../../contexts/BasketContext'
import './basket.css'
import { FaTruck } from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik'
import { TR } from 'country-flag-icons/react/1x1'
import validations from './validations'
import { postOrder } from '../../services/Api'
import { message } from 'antd'
import { useQueryClient } from 'react-query'

function Basket() {
  const queryClient = useQueryClient()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { items, emptyBasket } = useBasket()
  const total = items.reduce((acc, obj) => acc + (obj.unitPrice * obj.count), 0)

  const formik = useFormik({
    initialValues: {
      customerFirstName: "",
      customerLastName: "",
      customerPhone: "",
      customerAddress: "",
    },
    validationSchema: validations,
    onSubmit: async (values, bag) => {
      const itemIds = items.map((item) => { return { productId: item.productId, quantity: item.count } })
      values.customerPhone = values.customerPhone.toString()
      const input = { orderDetails: itemIds, ...values }
      try {
        await postOrder(input)
        emptyBasket()
        message.success("Sipariş Verildi")
        queryClient.refetchQueries("admin:orders")
      } catch (error) {
        bag.setErrors({ general: error.response.data.message })
      }
    }
  })

  return (
    <div className='container'>
      <div className="row">
        {
          items.length < 1 && <Alert variant='danger' className='mt-3 text-center'>Sepete Ürün Ekleyiniz</Alert>
        }
        {
          items.length > 0 &&
          <>
            <div className="col-lg-9">
              <ul className='border card shadow p-3 mt-3 pb-0'>
                {items.map((item) => {
                  return <li key={item.productId}>
                    <CartItem item={item} />
                  </li>
                })}
                <div className='text-center mb-3'>
                  <button onClick={() => emptyBasket()} className='btn btn-primary'>Sepeti Temizle</button>
                </div>
              </ul>

            </div>
            <div className='col-lg-3'>
              <div className="bg-light mt-3 mb-3 card shadow p-3">
                <span className='h5'>Toplam Fiyat</span>
                <span className='d-flex align-items-center'>
                  <div className='h3'>{total}</div>
                  <span>TL</span>
                </span>
                <button className='btn btn-primary mt-3' onClick={handleShow}>Sipariş Ver</button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Sipariş</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6">
                          <Form.Group className="mb-3">
                            <Form.Label>İsim</Form.Label>
                            <Form.Control
                              id='customerFirstName'
                              name='customerFirstName'
                              type="text"
                              placeholder="İsminizi Giriniz"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={formik.touched.customerFirstName && formik.errors.customerFirstName}
                            />
                            {formik.touched.customerFirstName && formik.errors.customerFirstName && <div className='text-danger'>{formik.errors.customerFirstName}</div>}
                          </Form.Group>
                        </div>
                        <div className="col-lg-6">
                          <Form.Group className="mb-3">
                            <Form.Label>Soyisim</Form.Label>
                            <Form.Control
                              id='customerLastName'
                              name='customerLastName'
                              type="text"
                              placeholder="Soyisminizi Giriniz"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={formik.touched.customerLastName && formik.errors.customerLastName}
                            />
                            {formik.touched.customerLastName && formik.errors.customerLastName && <div className='text-danger'>{formik.errors.customerLastName}</div>}
                          </Form.Group>
                        </div>
                      </div>
                      <Form.Group className="mb-3">
                        <Form.Label>Telefon Numarası</Form.Label>
                        <div className='d-flex flex-row'>
                          <div className='bg-light d-flex p-2 align-items-center'>
                            <TR className="flag-icon me-1" />
                            <span>+90</span>
                          </div>
                          <Form.Control
                            id='customerPhone'
                            name='customerPhone'
                            type="number"
                            placeholder="Telefon Numarası"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.customerPhone && formik.errors.customerPhone}
                          />
                        </div>
                        {formik.touched.customerPhone && formik.errors.customerPhone && <div className='text-danger'>{formik.errors.customerPhone}</div>}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Adres</Form.Label>
                        <Form.Control
                          id='customerAddress'
                          name='customerAddress'
                          as="textarea"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={formik.touched.customerAddress && formik.errors.customerAddress}
                        />
                        {formik.touched.customerAddress && formik.errors.customerAddress && <div className='text-danger'>{formik.errors.customerAddress}</div>}
                      </Form.Group>
                      <button type="submit" className="btn btn-primary w-100">Sipariş Ver</button>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <button className='btn btn-primary' onClick={handleClose}>
                      Kapat
                    </button>

                  </Modal.Footer>
                </Modal>
                <hr />
                <div className='text-center'>
                  <FaTruck className='me-1' />
                  <span className='text-success'>Ücretsiz Kargo</span></div>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default Basket