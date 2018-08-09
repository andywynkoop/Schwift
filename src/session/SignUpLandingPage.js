import React from 'react';
import SessionNav from './SessionNav';
import Default from './Default.js';
import SignUpFormContainer from './SignUpFormContainer';
import SignInFormContainer from './SignInFormContainer';
import { connect } from 'react-redux';
import style from './css/SignUpLandingPage.css'

const SignUpLandingPage = ({ page }) => {
  const pages = {
    0: <Default />,
    1: <SignUpFormContainer />,
    2: <SignInFormContainer />
  }
  return(
    <div className={style.page}>
      <SessionNav />
      {pages[page]}
    </div>
  );
};

const msp = ({ ui: { sessionView: page }}) => ({ page });

export default connect(msp)(SignUpLandingPage);