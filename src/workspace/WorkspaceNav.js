import React from 'react';
import style from './css/WorkspaceNav.css';
import { connect } from 'react-redux';
import { logout } from '../session/session_actions';

const WorkspaceNav = ({ logout }) =>
  <div className={style.wrapper}>
    <div className={style.inner}>
      <h1 className={style.logo}>Schwift</h1>
      <button onClick={logout} className={style.btn}>Log Out</button>
    </div>
  </div>


const mdp = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(null, mdp)(WorkspaceNav);