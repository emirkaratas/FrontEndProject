import { FieldArray, Formik } from 'formik'
import React from 'react'
import Form from 'react-bootstrap/Form';
import { message } from 'antd'
import validations from '../ProductDetail/validations';
import { useMutation, useQueryClient } from 'react-query';
import { postProduct } from '../../../../services/Api'
import { Button } from 'react-bootstrap';

function AdminProductDetail() {
    const queryClient = useQueryClient()
    const addMutation = useMutation(postProduct, {
        onSuccess: () => {
            queryClient.refetchQueries(["products",{}])  
            queryClient.refetchQueries("admin:products")
        }
    })
    const handleSubmit = async (values) => {
        message.loading({ content: "Yükleniyor", key: "product:add" })
        addMutation.mutate(values,{
            onSuccess: () => message.success({ content: "Başarıyla Eklendi", key: "product:add", duration: 3 }),
            onError: () => message.error({ content: "Ekleme Başarısız", key: "product:add", duration: 2 })
        })
    }

    return (
        <div>
            <Formik initialValues={{
                title: "",
                price: "",
                description: "",
                photo: [],
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

export default AdminProductDetail