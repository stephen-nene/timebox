import React from 'react';
import './login.css'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { message } from 'antd';
import { Link } from 'react-router-dom';

function App() {
    const handleLogin = ()=>{
        message.info("login comming soon")
    }
  return (
    <MDBContainer fluid>

      <MDBRow className='login-card d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '600px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
              <p className="text-white-50 mb-5">Enter your Email and password!</p>



              <MDBInput  wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='username'  type='name' size="lg"/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address'  type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password'  type='password' size="lg"/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Confirm Password'  type='password' size="lg"/>

              <MDBBtn onClick={handleLogin} className='mx-2 mb-3 px-5' color='success' size='lg'>
                Sign-up
              </MDBBtn>
              {/* <p className="medium mb-3 pb-lg-2">
                <a className="text-blue" onClick={forgotPassword}>Forgot password?</a>
                </p> */}

              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'blue' }}>
                  <MDBIcon fab icon='facebook-f' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'skyblue' }}>
                  <MDBIcon fab icon='twitter' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'red' }}>
                  <MDBIcon fab icon='google' size="lg"/>
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'black' }}>
                  <MDBIcon fab icon='github' size="lg"/>
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'blue' }}>
                  <MDBIcon fab icon='linkedin' size="lg"/>
                </MDBBtn>
              </div>

              <div>
                <p className="mb-0">Already registered ? 
                <Link to='/' className="text-blue-50 fw-bold"> Log-in</Link>
                </p>

              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default App;