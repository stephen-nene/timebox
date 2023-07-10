import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../assets/styles/Login.css'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/actions';
import image from '../assets/1.jpg'
import React, { useState } from 'react';
import { message, Button } from "antd";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userData);

  const handleLogin = () => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
      // credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        if (data.user) {
          message.success('User authenticated');
          dispatch(login(data.user));
          console.log(data); // Log the user data from the Redux store
        } else {
          message.error(data.error);
          // console.error('Invalid email or password:', data.error);
        }
      })
      .catch(error => {
        message.error(error);
        console.error('Error:', error);
      });
  };

  return (
    <div className="login p-5 flex justify-center" style={{ maxHeight: '100vh', overflow: 'hidden' }}>
      <MDBContainer>
        <MDBRow>
          <MDBCol sm="6" className="d-none d-sm-block px-0">
            <img
              src={image}
              alt="Login image"
              className="w-100"
              style={{ objectFit: 'cover', objectPosition: 'left' }}
            />
          </MDBCol>

          <MDBCol sm="6">
            <div className="d-flex flex-row ps-5 pt-5">
              <MDBIcon fas icon="ankh fa-3x me-3" style={{ color: '#709085' }} />
              <span className="h1 fw-bold mb-0">Mnetimall</span>
            </div>

            <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
              <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>
                Log in
              </h3>

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                label="Email address"
                id="email"
                type="email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                label="Password"
                id="pass"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <MDBBtn className="mb-4 px-5 mx-5 w-100" color="success" onClick={handleLogin} size="lg">
                Login
              </MDBBtn>
              <p className="small mb-0 pb-lg-3 ms-5">
                <a className="text" href="/">
                  Forgot password?
                </a>
              </p>
              <p className="link-info ms-5">
                Don't have an account? <a href="#!" className="link-info">Register here</a>
              </p>
              <div className="socials">
                <hr className="my-4" />

                <MDBBtn className="mb-3 w-100" size="sm" style={{ backgroundColor: '#dd4b39' }}>
                  <MDBIcon fab icon="google" className="mx-2" />
                  Google
                </MDBBtn>

                <MDBBtn className="mb-4 w-100" size="sm" style={{ backgroundColor: '#3b5998' }}>
                  <MDBIcon fab icon="facebook-f" className="mx-2" />       Facebook
                </MDBBtn>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>

  );
}

export default App;

