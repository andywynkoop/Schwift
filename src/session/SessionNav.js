import React, { Component } from 'react';
import style from './css/SessionNav.css';
import { receiveSessionView } from './session_actions';
import { connect } from 'react-redux';

const SessionNav = ({ changeSessionView }) => 
  <div className={style.wrapper}>
    <div className={style.inner}>
      <h1 className={style.logo} onClick={() => changeSessionView(0)}>Schwift</h1>
      <div className={style.btns}>
        <button onClick={() => changeSessionView(2)}>Sign In</button>
        <button onClick={() => changeSessionView(1)}>Get Schwifty</button>
      </div>
    </div>
  </div>


const mdp = dispatch => ({
  changeSessionView: page => dispatch(receiveSessionView(page))
})

export default connect(null, mdp)(SessionNav);