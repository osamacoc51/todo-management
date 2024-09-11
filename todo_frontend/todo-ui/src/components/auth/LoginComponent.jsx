import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBContainer
} from 'mdb-react-ui-kit';
import signin from "../assets/signin.jpg";
import { loginAPICall, saveLoggedInUser, storeToken } from "../../service/AuthService";
import { ToastContainer, toast } from 'react-toastify';

export const LoginComponent = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigator = useNavigate();

    async function handleLoginForm(e) {
        e.preventDefault();

        await loginAPICall(username, password).then((response) => {
            console.log(response.data);

            // const token = 'Basic ' + window.btoa(username + ":" + password);
            const token = 'Bearer ' + response.data.accessToken;
            const role = response.data.role;
            storeToken(token);

            saveLoggedInUser(username, role);
            navigator("/todos")

            window.location.reload(false);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <ToastContainer />
            <MDBContainer>
                <MDBRow className="d-flex align-items-center">
                    <MDBCol md='6'>
                        <img className="img-fluid text-center" src={signin} alt="Register" />
                    </MDBCol>
                    <MDBCol md='6'>
                        <div className="d-flex flex-column justify-content-center">
                            <form>
                                <MDBInput
                                    className='mb-4'
                                    type='text'
                                    id='form1Example2'
                                    label='Username or Email'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <MDBInput
                                    className='mb-4'
                                    type='password'
                                    id='form1Example1'
                                    label='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <MDBBtn
                                    type='submit'
                                    outline
                                    color="success"
                                    block
                                    onClick={(e) => handleLoginForm(e)}
                                >
                                    Login
                                </MDBBtn>
                            </form>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        </>
    )
}