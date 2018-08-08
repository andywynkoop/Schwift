import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from './reducers/selectors';
import { logout } from './session/session_actions';

class Home extends Component { 
  render() {
    return(
      <div className="home">
        <h1>Home Page</h1>
        <h3>Hello, {this.props.currentUser.username}</h3>
        <button onClick={this.props.logout}>Log Out</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state)
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);