import React from 'react'
import { useFormik } from 'formik'
import { AiFillMail, AiFillLock } from 'react-icons/ai'
import { FaKey,FaUserCircle,FaUserEdit } from 'react-icons/fa'
import validations from './validations'
import Form from 'react-bootstrap/Form';
import { fetchRegister } from '../../../services/Api'
import { Alert } from 'react-bootstrap'
import { useAuth } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: ""
    },
    validationSchema: validations,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({ email: values.email, password: values.password, confirmPassword: values.passwordConfirm, firstName: values.firstName, lastName: values.lastName, userName: "emir" })
        login(registerResponse)
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
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Kayıt Ol</p>
              {
                formik.errors.general && (
                  <Alert variant="danger">
                    {formik.errors.general}
                  </Alert>
                )
              }
              <form className="mx-1 mx-md-4" onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col-lg-6 d-flex flex-row align-items-center mb-4">
                    <FaUserCircle className='icon mt-auto me-2' />
                    <div className="form-outline flex-fill mb-0">
                      <label htmlFor="firstName">İsim</label>
                      <Form.Control
                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.firstName && formik.errors.firstName}
                        isValid={formik.touched.firstName && !formik.errors.firstName}
                        className="form-control"
                      />
                      {formik.errors.firstName && formik.touched.firstName && <div>{formik.errors.firstName}</div>}
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex flex-row align-items-center mb-4">
                    <FaUserEdit className='icon mt-auto me-2' />
                    <div className="form-outline flex-fill mb-0">
                      <label htmlFor="lastName">Soyad</label>
                      <Form.Control
                        id="lastName"
                        name="lastName"
                        type="lastName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.lastName && formik.errors.lastName}
                        isValid={formik.touched.lastName && !formik.errors.lastName}
                        className="form-control"
                      />
                      {formik.errors.lastName && formik.touched.lastName && <div>{formik.errors.lastName}</div>}
                    </div>
                  </div>
                </div>
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
                      isValid={formik.touched.email && !formik.errors.email}
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
                      isValid={formik.touched.password && !formik.errors.password}
                      className="form-control"
                    />
                    {formik.errors.password && formik.touched.password && <div>{formik.errors.password}</div>}
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
                      isValid={formik.touched.passwordConfirm && !formik.errors.passwordConfirm}
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