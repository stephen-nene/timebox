import React, { useState } from 'react';
import '../../assets/styles/login.css';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import { message } from 'antd';
import axios from 'axios'

import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/actions';

function App() {
  const dispatch = useDispatch();
  const [loginToggle, setLoginToggle] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', {
        email: formData.email,
        password: formData.password
      });
      console.log(response.data);
          dispatch(login(response.data));
      // Process the response data here
    } catch (error) {
      console.error(error);
      // Handle any errors here
    }
  };  
  
  

  const handleSignup = async () => {
    try {
      const response = await axios.post("/api/users", formData);
      console.log(response.data);
      message.success(response.data.message);
    } catch (error) {
      console.error(error.response.data);
      const errors = error.response.data;
      if (errors.email) {
        message.error(errors.email[0]);
      }
      if (errors.password) {
        message.error("password" + errors.password[0]);
      }
    }
  };
  
  const forgotPassword = () => {
    message.info('Forgot password not added');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const toggle = () => {
    setLoginToggle(!loginToggle);
  };

  return (
    <div className="login-bg">
      <MDBContainer fluid>
        <MDBRow className="login-card d-flex justify-content-center align-items-center h-100">
          <MDBCol className="cardi" col="12">
            <MDBCard className="bg-dark text-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '600px' }}>
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">{loginToggle ? 'Login' : 'Signup'}</h2>
                <p className="text-white-50 mb-5">{loginToggle ? 'Enter your email and password' : 'Welcome, enter your Credentials'}</p>

                {loginToggle ? (
                  <>
                    <MDBInput
                      className="white-input"
                      wrapperClass="mb-4 mx-5 w-100"
                      labelClass="text-white"
                      label="Email address"
                      type="email"
                      size="lg"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <MDBInput
                      wrapperClass="mb-4 mx-5 w-100"
                      labelClass="text-white"
                      label="Password"
                      type="password"
                      size="lg"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </>
                ) : (
                  <>
                    <MDBInput
                      className="white-input"
                      wrapperClass="mb-4 mx-5 w-100"
                      labelClass="text-white"
                      label="Enter Username"
                      type="text"
                      size="lg"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                    <MDBInput
                      className="white-input"
                      wrapperClass="mb-4 mx-5 w-100"
                      labelClass="text-white"
                      label="Email address"
                      type="email"
                      size="lg"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <MDBInput
                      wrapperClass="mb-4 mx-5 w-100"
                      labelClass="text-white"
                      label="Password"
                      type="password"
                      size="lg"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <MDBInput
                      wrapperClass="mb-4 mx-5 w-100"
                      labelClass="text-white"
                      label="Confirm Password"
                      type="password"
                      size="lg"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </>
                )}

                {loginToggle ? (
                  <p className="medium mb-3 pb-lg-2">
                    <a className="mb-3 text-blue" onClick={forgotPassword}>
                      Forgot password?
                    </a>
                  </p>
                ) : null}

                {loginToggle ? (
                  <MDBBtn onClick={handleLogin} className="mx-2 px-5" color="success" size="lg">
                    Login
                  </MDBBtn>
                ) : (
                  <MDBBtn onClick={handleSignup} className="mx-2 px-5" color="success" size="lg">
                    Sign-up
                  </MDBBtn>
                )}

                <div className="d-flex flex-row mt-3 mb-5">
                  <MDBBtn tag="a" color="none" className="m-3" style={{ color: 'blue' }}>
                    <MDBIcon fab icon="facebook-f" size="lg" />
                  </MDBBtn>
                  <MDBBtn tag="a" color="none" className="m-3" style={{ color: 'skyblue' }}>
                    <MDBIcon fab icon="twitter" size="lg" />
                  </MDBBtn>
                  <MDBBtn tag="a" color="none" className="m-3" style={{ color: 'red' }}>
                    <MDBIcon fab icon="google" size="lg" />
                  </MDBBtn>
                  <MDBBtn tag="a" color="none" className="m-3" style={{ color: 'black' }}>
                    <MDBIcon fab icon="github" size="lg" />
                  </MDBBtn>
                  <MDBBtn tag="a" color="none" className="m-3" style={{ color: 'blue' }}>
                    <MDBIcon fab icon="linkedin" size="lg" />
                  </MDBBtn>
                </div>

                <div className="loginToggle">
                  <p className="mb-2">
                    {loginToggle ? "Don't have an account?" : 'Already registered ?'}
                    <a onClick={toggle} className="text-blue-50 fw-bold ml-2">
                      {loginToggle ? 'Sign Up' : 'Log-in'}
                    </a>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default App;
