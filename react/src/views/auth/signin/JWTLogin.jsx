import React from 'react';

// react-bootstrap
import { Row, Col, Alert, Button } from 'react-bootstrap';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// ==============================|| JWT LOGIN ||============================== //

const JWTLogin = () => {
  return (
    <div className="login-container text-center">
      <h1 className="mt-5">TransportIQ</h1>

      {/* Updated this line to be in italics */}
      {/* Updated to use a stylish italic font */}
      <p className="lead mb-5" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.8rem' }}>
        A Transport Management System
      </p>

      <p>Please enter your email id and password</p>

      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                className="form-control"
                label="Email Address / Username"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                placeholder="Enter your email"

                style={{
                  padding: '9px',
                  fontSize: '1rem',
                  border: '1px solid #ccc',
                  borderRadius: '5px'
                }}
              />
              {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                label="Password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                placeholder="Enter your password"

                style={{
                  padding: '9px',
                  fontSize: '1rem',
                  border: '1px solid #ccc',
                  borderRadius: '5px'
                }}

              />
              {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
            </div>

            <div className="custom-control custom-checkbox text-start mb-4 mt-2">
              <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">
                Save credentials
              </label>
            </div>

            {errors.submit && (
              <Col sm={12}>
                <Alert variant="danger">{errors.submit}</Alert>
              </Col>
            )}

            <Row>
              <Col mt={2}>
                <Button className="btn-block mb-4" color="primary" disabled={isSubmitting} size="large" type="submit" variant="primary">
                
                  Signin
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>

      <Row>
        <Col sm={12}>
          <h5 className="my-3"> OR </h5>
        </Col>
      </Row>

      <Row>
        <Col sm={12}>
          <Button variant="danger">
            <i className="fa fa-lock" /> Sign in with Google
          </Button>
        </Col>
      </Row>

      {/* Added Terms of Service and Privacy Policy section */}
      <div className="mt-4">
        <p style={{ fontSize: 'small' }}>
          By clicking continue, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>

      <hr />
    </div>
  );
};

export default JWTLogin;
