import React, { Component } from 'react';

export default class SignUpForm extends Component {
  state = {
    username: '',
    email: '',
    password: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.createUser(this.state);
  }
  
  update = field => e => this.setState({ [field]: e.target.value });

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <h1>Create Account</h1>
        Username:
        <input type="text" value={this.state.username} onChange={this.update('username')} />
        Email:
        <input type="text" value={this.state.email} onChange={this.update('email')} />
        Password:s
        <input type="text" value={this.state.password} onChange={this.update('password')} />
        <button type="submit">Create</button>
      </form>
    )
  }
}
