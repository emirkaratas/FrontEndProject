import { FieldArray, Formik } from 'formik'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchProduct, updateProduct } from '../../../../services/Api'
import Form from 'react-bootstrap/Form';
import validations from './validations'
import { message } from 'antd'
import { useBasket } from '../../../../contexts/BasketContext'
import { useMutation, useQueryClient } from 'react-query';
import { Button } from 'react-bootstrap';

function AdminProductDetail() {
    const updateMutation = useMutation(updateProduct, {
        onSuccess: () => {
            queryClient.refetchQueries("admin:products")
            queryClient.refetchQueries(["products", {}])
        }
    })

    const queryClient = useQueryClient()
    const { product_id } = useParams()
    const { removeFromBasket } = useBasket()

    const { isLoading, error, data } = useQuery(["admin:product", product_id], () => fetchProduct(product_id))

    if (isLoading) return 'Yükleniyor...'

    if (error) return 'Hata: ' + error.message



    const handleSubmit = async (values) => {
        message.loading({ content: "Yükleniyor", key: "product:update" })
        updateMutation.mutate({id: parseInt(product_id), product:values}, {
            onSuccess: () => {
                message.success({ content: "Başarıyla Güncellendi", key: "product:update", duration: 3 })
                removeFromBasket(parseInt(product_id))
            },
            onError: () => message.error({ content: "Güncelleme Başarısız", key: "product:update", duration: 2 }),
        })
    }

    return (
        <div>
            <Formik initialValues={{
                title: data.title,
                price: data.price,
                description: data.description,
                photo: data.photo,
                date: data.date
            }}
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                {
                    ({ errors, touched, handleChange, handleSubmit, handleBlur, values, isSubmitting }) => (
                        <div className='container'>
                            <Form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <Form.Group className="mb-3 mt-3">
                                            <Form.Label>Ürün İsmi</Form.Label>
                                            <Form.Control
                                                id='title'
                                                name='title'
                                                type="text"
                                                disabled={isSubmitting}
                                                value={values.title}
                                                placeholder="Ürün İsmini Giriniz"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.title && errors.title}
                                            />
                                            {errors.title && touched.title && <div>{errors.title}</div>}
                                        </Form.Group>
                                    </div>
                                    <div className="col-lg-6">
                                        <Form.Group className="mb-3 mt-3">
                                            <Form.Label>Fiyat</Form.Label>
                                            <Form.Control
                                                id='price'
                                                name='price'
                                                type="number"
                                                value={values.price}
                                                placeholder="Ürün Fiyatını Giriniz"
                                                onChange={handleChange}
                                                disabled={isSubmitting}
                                                onBlur={handleBlur}
                                                isInvalid={touched.price && errors.price}
                                            />
                                            {errors.price && touched.price && <div>{errors.price}</div>}
                                        </Form.Group>
                                    </div>
                                </div>
                                <Form.Group className="mb-3 mt-3">
                                    <Form.Label>Açıklama</Form.Label>
                                    <Form.Control
                                        id='description'
                                        name='description'
                                        as="textarea"
                                        value={values.description}
                                        placeholder="Ürün Açıklamasını Giriniz"
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        onBlur={handleBlur}
                                        isInvalid={touched.description && errors.description}
                                    />
                                    {errors.description && touched.description && <div>{errors.description}</div>}
                                </Form.Group>
                                <Form.Group className="mb-3 mt-3">
                                    <Form.Label>Fotoğraflar</Form.Label>
                                    <FieldArray
                                        name='photo'
                                        render={
                                            arrayHelpers => (
                                                <div>
                                                    {
                                                        values.photo.map((photo, index) => {
                                                            return <div className='d-flex gap-2 mb-2' key={index}>
                                                                <Form.Control
                                                                    id='photo'
                                                                    name={`photo.${index}`}
                                                                    value={photo}
                                                                    placeholder="Fotoğraf Giriniz"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    disabled={isSubmitting}
                                                                />
                                                                <button className='btn btn-primary' onClick={() => arrayHelpers.remove(index)}>Sil</button>
                                                            </div>
                                                        })
                                                    }
                                                    <Button onClick={() => arrayHelpers.push("")}>Fotoğraf Ekle</Button>
                                                </div>
                                            )
                                        }

                                    />
                                </Form.Group>
                                <div className='text-center'>
                                    <button type="submit" className='btn btn-primary text-center btn-lg' onClick={() => { }}>Güncelle</button>
                                </div>
                            </Form>
                        </div>
                    )
                }
            </Formik>
        </div>
    )
}

export default AdminProductDetail