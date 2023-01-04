import { FieldArray, Formik } from 'formik'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
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
            queryClient.refetchQueries("products")
            queryClient.refetchQueries(["admin:product", product_id])
            queryClient.refetchQueries(["product",product_id])
        }
    })

    const queryClient = useQueryClient()
    const { product_id } = useParams()
    const { removeFromBasket } = useBasket()
    const navigate = useNavigate()

    const { isLoading, error, data } = useQuery(["admin:product", product_id], () => fetchProduct(product_id))

    if (isLoading) return 'Yükleniyor...'

    if (error) return 'Hata: ' + error.message

    const handleSubmit = async (values) => {
        values.imageUrls = values.imageUrls.map((item)=>({imageUrl: item}))
        message.loading({ content: "Yükleniyor", key: "product:update" })
        updateMutation.mutate({ productName: values.productName, unitPrice: values.unitPrice, description: values.description, productId: parseInt(product_id), unitsInStock:values.unitsInStock,imageUrls: values.imageUrls, categoryName: "string" }, {
            onSuccess: () => {
                message.success({ content: "Başarıyla Güncellendi", key: "product:update", duration: 3 })
                removeFromBasket(parseInt(product_id))
                navigate("/admin/products")
            },
            onError: () => message.error({ content: "Güncelleme Başarısız", key: "product:update", duration: 2 }),
        })
    }

    return (
        <div>
            <Formik initialValues={{
                productName: data.productName,
                unitPrice: data.unitPrice,
                description: data.description,
                imageUrls: data.imageUrls.map(e=>e.imageUrl),
                unitsInStock: data.unitsInStock
            }}
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                {
                    ({ errors, touched, handleChange, handleSubmit, handleBlur, values, isSubmitting }) => (
                        <div className='container'>
                            <Form onSubmit={handleSubmit}>
                                <div className="row">
                                    <Form.Group className="mb-3 mt-3">
                                        <Form.Label>Ürün İsmi</Form.Label>
                                        <Form.Control
                                            id='productName'
                                            name='productName'
                                            type="text"
                                            disabled={isSubmitting}
                                            value={values.productName}
                                            placeholder="Ürün İsmini Giriniz"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.productName && errors.productName}
                                        />
                                        {errors.productName && touched.productName && <div>{errors.productName}</div>}
                                    </Form.Group>
                                    <div className="col-lg-6">
                                        <Form.Group className="mb-3 mt-3">
                                            <Form.Label>Ürün Adeti</Form.Label>
                                            <Form.Control
                                                id='unitsInStock'
                                                name='unitsInStock'
                                                type="text"
                                                disabled={isSubmitting}
                                                value={values.unitsInStock}
                                                placeholder="Ürün İsmini Giriniz"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.unitsInStock && errors.unitsInStock}
                                            />
                                            {errors.unitsInStock && touched.unitsInStock && <div>{errors.unitsInStock}</div>}
                                        </Form.Group>
                                    </div>
                                    <div className="col-lg-6">
                                        <Form.Group className="mb-3 mt-3">
                                            <Form.Label>Fiyat</Form.Label>
                                            <Form.Control
                                                id='unitPrice'
                                                name='unitPrice'
                                                type="number"
                                                value={values.unitPrice}
                                                placeholder="Ürün Fiyatını Giriniz"
                                                onChange={handleChange}
                                                disabled={isSubmitting}
                                                onBlur={handleBlur}
                                                isInvalid={touched.unitPrice && errors.unitPrice}
                                            />
                                            {errors.unitPrice && touched.unitPrice && <div>{errors.unitPrice}</div>}
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
                                        name='imageUrls'
                                        render={
                                            arrayHelpers => (
                                                <div>
                                                    {
                                                        values.imageUrls.map((photo, index) => {
                                                            return <div className='d-flex gap-2 mb-2' key={index}>
                                                                <Form.Control
                                                                    id='imageUrls'
                                                                    name={`imageUrls.${index}`}
                                                                    value={photo}
                                                                    placeholder="Fotoğraf Giriniz"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    disabled={isSubmitting}
                                                                />
                                                                <Button className='btn btn-primary' onClick={() => {
                                                                    arrayHelpers.remove(index)
                                                                    }}>Sil</Button>
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