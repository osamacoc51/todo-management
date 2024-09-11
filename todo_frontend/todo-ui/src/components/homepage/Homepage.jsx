import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import task from '../assets/task.jpg';
import teamwork from '../assets/teamwork.jpg';
import home1 from '../assets/home1.jpg';
import home2 from '../assets/home2.jpg';

export const Homepage = () => {
  return (
    <>
      <MDBContainer className="my-5">
        <MDBRow className='d-flex align-items-center'>
          <MDBCol className=" title md-6">
            <h1>Task</h1>
            <h1>Management</h1>
            <h1>Application</h1>
            <p>Organize and manage your team like a boss with TodoHub,
              task management software packing more capabilities than you can imagine.</p>
            <MDBBtn className='mx-2 text-light' color='info'>Get Started</MDBBtn>
          </MDBCol>
          <MDBCol md="6">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/user-experience-illustration-download-in-svg-png-gif-file-formats--design-feedback-review-customer-reviews-and-development-pack-illustrations-3728444.png?f=webp" className="img-fluid" alt="Sample image" />
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <MDBContainer className='why text-center'>
        <MDBRow className='d-flex align-items-center'>
          <MDBCol ms='6'>
            <img src={home2} className="img-fluid" alt="Sample image" />
          </MDBCol>
          <MDBCol md='6'>
            <h1 className='text-center'>Why Choose Us?</h1>
            <p className='text-start'>When it comes down to choosing task management software,,<br />all you need is three things:</p>
            <ul className='text-start'>
              <li>Free and open-source</li>
              <li>Ease of use</li>
              <li>versatility</li>
            </ul>
            <p className='text-start'>Coincidentally, that’s exactly what you get from TodoHub - task management software that’s easy to use and features dozens of collaboration tools.</p>
          </MDBCol>
        </MDBRow>
      </MDBContainer >
      <MDBContainer className='free'>
        <MDBRow className='d-flex align-items-center'>
          <MDBCol md='6'></MDBCol>
          <MDBCol md='6'>
            <h1 className='text-center'>It's Free</h1>
            <p>To get started with Bitrix24, all you have to do is sign up using your email and... that’s it! Once you’ve signed up for our free plan, you get access to all of the basic tools in TodoHub FOREVER.</p>
            <ul className='text-start'>
              <li>No credit card required</li>
              <li>unlimited users</li>
              <li>Free forever</li>
            </ul>
            <MDBBtn outline color='info'>Get for free</MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBContainer className='d-flex justify-content-center mt-5'>
        <h1 className='trusted'>Trusted by over <span>15,000,000</span> teams worldwide</h1>
        <img className='img-fluid rounded-pill h-50 w-50' src={teamwork} />
      </MDBContainer>
    </>
  );
};
