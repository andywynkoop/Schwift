import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../reducers/selectors';
import WorkspaceNav from './WorkspaceNav';
import style from './css/WorkspaceSelect.css';

const Home = props =>
  <div className={style.app}>
    <WorkspaceNav />
    <div className={style.main}>
      <div className={style.left}>
        <h1>Sign in to a Workspace</h1>
        <h2>Workspace 1</h2>
        <h2>Workspace 2</h2>
        <h2>Workspace 3</h2>
        <h2>Workspace 4</h2>
      </div>
      <div className={style.right}>
        <div className={style.new}>
          <p>schwift.herokuapp.com/</p>
          <input type="text" />
        </div>
        <h1>Join this workspace</h1>
        <h1>Create this workspace</h1>
      </div>
    </div>
  </div>;

const msp = state => ({
  currentUser: getCurrentUser(state)
})

const mdp = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(msp, mdp)(Home);