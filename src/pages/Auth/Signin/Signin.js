import React from 'react'
import { useFormik } from 'formik'
import { AiFillMail, AiFillLock } from 'react-icons/ai'
import validations from './validations'
import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap'
import { useAuth } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { fetchLogin } from '../../../services/Api';

function Signin() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validations,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin({
          email:values.email,
          password: values.password
        })
        login(loginResponse)
        navigate(`/profile`)
      } catch (error) {
        bag.setErrors({ general: error.response.data.message })
      }
    }
  })

  return (
    <div className="container my-auto">
      <div className="card">
        <div className="card-body p-md-4">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Giriş Yap</p>
              {
                formik.errors.general && (
                  <Alert variant="danger">
                    {formik.errors.general}
                  </Alert>
                )
              }
              <form className="mx-1 mx-md-4" onSubmit={formik.handleSubmit}>
                <div className="d-flex flex-row align-items-center mb-4">
                  <AiFillMail className='icon mt-auto me-2' />
                  <div className="form-outline flex-fill mb-0">
                    <label htmlFor="email">Email</label>
                    <Form.Control
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.email && formik.errors.email}
                      className="form-control"
                    />
                    {formik.errors.email && formik.touched.email && <div>{formik.errors.email}</div>}
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <AiFillLock className='icon mt-auto me-2' />
                  <div className="form-outline flex-fill mb-0">
                    <label htmlFor="password">Şifre</label>
                    <Form.Control
                      id="password"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.password && formik.errors.password}
                      className="form-control"
                    />
                    {formik.errors.password && formik.touched.password && <div>{formik.errors.password}</div>}
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg w-100">Giriş Yap</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin