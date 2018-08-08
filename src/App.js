import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'; 
import SignUpLandingPage from './session/SignUpLandingPage';
import axios from 'axios';
window.axios = axios;

class App extends Component {
  render() {
    return(
     <BrowserRouter>
      <Switch>
        <Route path="/" component={SignUpLandingPage} />
      </Switch>
     </BrowserRouter> 
    )
  }
}

export default App;