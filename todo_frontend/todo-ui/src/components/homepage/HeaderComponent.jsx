import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBCollapse,
  MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn, logout } from "../../service/AuthService";

export const HeaderComponent = () => {
  const [showBasic, setShowBasic] = useState(false);

  const isAuth = isUserLoggedIn();

  const navigator = useNavigate();

  function handleLogout() {
    navigator('/login');
    logout();
  }

  return (
    <>
      <header>
        <MDBNavbar sticky="top" e expand='lg' light bgColor='white'>
          <MDBContainer fluid className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <MDBNavbarToggler
                aria-controls='navbarExample01'
                aria-expanded={showBasic}
                aria-label='Toggle navigation'
                onClick={() => setShowBasic(!showBasic)}
              >
                <MDBIcon fas icon='bars' />
              </MDBNavbarToggler>
              <MDBCollapse open={showBasic} navbar>
                <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
                  <MDBNavbarItem active>
                    <MDBNavbarLink
                      aria-current='page' className="brand">
                      <Link to="/" className="text-decoration-none">
                        <h2>TodoHub</h2>
                      </Link>
                    </MDBNavbarLink>
                  </MDBNavbarItem>

                  <MDBNavbarItem>
                    <Link to="/todos" className="text-decoration-none">
                      <MDBNavbarLink className="nav mt-2 head-color" style={{ color: '#40679E' }}>Home</MDBNavbarLink>
                    </Link>
                  </MDBNavbarItem>

                  <MDBNavbarItem>
                    <MDBNavbarLink className="nav mt-2" style={{ color: '#40679E' }}>Pricing</MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink className="nav mt-2 head-color" style={{ color: '#40679E' }}>About</MDBNavbarLink>
                  </MDBNavbarItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </div>

            <div className="d-flex align-items-center">
              {!isAuth && (
                <>
                  <MDBNavbarItem className="list-style-type">
                    <Link to="/login">
                      <MDBBtn outline color="success" className="me-2" type="button">Login</MDBBtn>
                    </Link>
                  </MDBNavbarItem>
                  <MDBNavbarItem className="list-style-type">
                    <Link to="/register">
                      <MDBBtn outline color="primary" type="button">Sign Up</MDBBtn>
                    </Link>
                  </MDBNavbarItem>
                </>
              )}

              {isAuth && (
                <MDBNavbarItem className="list-style-type">
                  <MDBBtn outline color="success" className="me-2" size="sm" type="button" onClick={handleLogout}>Logout</MDBBtn>
                </MDBNavbarItem>
              )}
            </div>
          </MDBContainer>
        </MDBNavbar>
      </header >
    </>
  );
};
