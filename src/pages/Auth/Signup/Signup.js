import React from 'react'
import { useFormik } from 'formik'
import { AiFillMail, AiFillLock } from 'react-icons/ai'
import { FaKey } from 'react-icons/fa'
import validations from './validations'
import Form from 'react-bootstrap/Form';
import { fetchRegister } from '../../../services/Api'
import { Alert } from 'react-bootstrap'
import { useAuth } from '../../../contexts/AuthContext'

function Signup() {
  const {login} = useAuth()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: ""
    },
    validationSchema: validations,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({email:values.email, password:values.password})
        login(registerResponse)
      } catch (error) {
        bag.setErrors({general:error.response.data.message})
      }
    }
  })

  return (
    <div className="container my-auto">
      <div className="card">
        <div className="card-body p-md-4">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Kayıt Ol</p>
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
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <FaKey className='icon mt-auto me-2' />
                  <div className="form-outline flex-fill mb-0">
                    <label htmlFor="passwordConfirm">Şifre (Tekrar)</label>
                    <Form.Control
                      id="passwordConfirm"
                      name="passwordConfirm"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                      className="form-control"
                    />
                    {formik.errors.passwordConfirm && formik.touched.passwordConfirm && <div>{formik.errors.passwordConfirm}</div>}
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg w-100">Kayıt Ol</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup