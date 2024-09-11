import React from "react";
import {
  MDBFooter,
  MDBContainer,
} from 'mdb-react-ui-kit';
export const FooterComponent = () => {
  return (
    <>
      <MDBFooter className='footer text-center'>
        <MDBContainer className='p-1'>
          <section className='mb-2'>
            <p>
              Stay organized and on top of your tasks with TodoHub. Our mission is to help you
              manage your daily to-dos efficiently and effectively.
              Thank you for using our app to streamline your productivity!"
            </p>
          </section>
        </MDBContainer>
        <div className='text-center p-2'>
          © 2024 Copyright:
          <a className='text-white'>
            TodoHub.com
          </a>
        </div>
      </MDBFooter>
    </>
  )
} 