import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";

import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';
import signup from "../assets/signup.jpg";
import { registerAPICall } from "../../service/AuthService";
import { ToastContainer, toast } from 'react-toastify';


export const RegisterComponent = () => {

  const [name, setName] = useState('');
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigator = useNavigate();

  function handleRegistrationForm(e) {
    e.preventDefault();

    const register = { name, username, email, password }
    console.log(register);

    registerAPICall(register).then((Response) => {
      toast("signed up successfully!");
      setTimeout(() => {
        navigator('/login');
      }, 4000); // 2 seconds delay
      console.log(Response.data);
    }).catch((error) => {
      toast("Oops Error!");
      console.log(error);
    })
  }
  return (
    <>
      <ToastContainer />
      <MDBContainer>
        <MDBRow className="d-flex align-items-center">
          <MDBCol md='6'>
            <img className="img-fluid text-center" src={signup} alt="Register" />
          </MDBCol>
          <MDBCol md='6' className="d-flex flex-column justify-content-center">
            <form className="mt-4">
              <MDBInput
                className='mb-4'
                type='text'
                id='form1Example1'
                label='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <MDBInput
                className='mb-4'
                type='text'
                id='form1Example2'
                label='Username'
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
              <MDBInput
                className='mb-4'
                type='email'
                id='form1Example3'
                label='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                className='mb-4'
                type='password'
                id='form1Example4'
                label='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <MDBBtn
                type='submit'
                outline color="primary"
                onClick={(e) => handleRegistrationForm(e)}
                block
              >
                Sign Up
              </MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

    </>
  )
}