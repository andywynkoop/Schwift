import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from './reducers/selectors';
import { logout } from './session/session_actions';

const Home = props =>
  <div className="home">
    <h1>Home Page</h1>
    <h3>Hello, {props.currentUser.username}</h3>
    <button onClick={props.logout}>Log Out</button>
  </div>;

const msp = state => ({
  currentUser: getCurrentUser(state)
})

const mdp = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(msp, mdp)(Home);