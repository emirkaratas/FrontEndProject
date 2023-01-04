import { FieldArray, Formik } from 'formik'
import React from 'react'
import Form from 'react-bootstrap/Form';
import { message } from 'antd'
import validations from '../ProductDetail/validations';
import { useMutation, useQueryClient } from 'react-query';
import { postProduct } from '../../../../services/Api'
import { Button } from 'react-bootstrap';

function AddProduct() {
    const queryClient = useQueryClient()
    const addMutation = useMutation(postProduct, {
        onSuccess: () => {
            queryClient.refetchQueries(["products", {}])
            queryClient.refetchQueries("admin:products")
        }
    })
    const handleSubmit = async (values) => {
        message.loading({ content: "Yükleniyor", key: "product:add" })
        values.imageUrls = values.imageUrls.map((item)=>({imageUrl: item}))
        addMutation.mutate({...values,categoryName: "string"}, {
            onSuccess: () => message.success({ content: "Başarıyla Eklendi", key: "product:add", duration: 3 }),
            onError: () => message.error({ content: "Ekleme Başarısız", key: "product:add", duration: 2 })
        })
    }

    return (
        <div>
            <Formik initialValues={{
                productName: "",
                unitPrice: "",
                description: "",
                imageUrls: [],
                unitsInStock: ""
            }}
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                {
                    ({ errors, touched, handleChange, handleSubmit, handleBlur, values, isSubmitting }) => (
                        <div className='container'>
                            <Form onSubmit={handleSubmit}>
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
                                <div className="row">
                                    <div className="col-lg-6">
                                        <Form.Group className="mb-3 mt-3">
                                            <Form.Label>Stok Miktarı</Form.Label>
                                            <Form.Control
                                                id='unitsInStock'
                                                name='unitsInStock'
                                                type="number"
                                                disabled={isSubmitting}
                                                value={values.unitsInStock}
                                                placeholder="Stok Miktarını Giriniz"
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
                                    <button type="submit" className='btn btn-primary text-center btn-lg' onClick={() => { }}>Ekle</button>
                                </div>
                            </Form>
                        </div>
                    )
                }
            </Formik>
        </div>
    )
}

export default AddProduct