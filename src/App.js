import React, { Component } from 'react';
// import './reset.css';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom'; 
import SignUpLandingPage from './session/SignUpLandingPage';
import WorkspaceSelect from './workspace/WorkspaceSelect';
import { fetchCurrentUser } from './session/session_actions';
import { getCurrentUser } from './reducers/selectors';
import Workspace from './workspace/Workspace';
//remove me later
import axios from 'axios';
window.axios = axios;


class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }
  render() {
    if (this.props.id === "Loading") return <div/>
    return(
     <BrowserRouter>
      <Switch>
          <Route path="/workspace/:id" component={Workspace} />
          <Route path="/" component={this.props.currentUser ? WorkspaceSelect : SignUpLandingPage} />
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
