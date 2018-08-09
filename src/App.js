import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom'; 
import SignUpLandingPage from './session/SignUpLandingPage';
import Home from './Home';
import { fetchCurrentUser } from './session/session_actions';
import { getCurrentUser } from './reducers/selectors';
//remove me later
import axios from 'axios';
window.axios = axios;

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }
  render() {
    console.log(this.props.currentUser)
    if (this.props.id === "Loading") return <div/>
    return(
     <BrowserRouter>
      <Switch>
          <Route path="/" component={this.props.currentUser ? Home : SignUpLandingPage} />
      </Switch>
     </BrowserRouter> 
    )
  }
}

const msp = state => ({
  id: state.session.currentUser,
  currentUser: getCurrentUser(state)
})

const mdp = dispatch => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUser())
});

export default connect(msp, mdp)(App);
