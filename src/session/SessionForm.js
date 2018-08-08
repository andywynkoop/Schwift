import React, { Component } from 'react';

export default class SignUpForm extends Component {
  state = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.save(this.state);
  }
  
  update = field => e => this.setState({ [field]: e.target.value });

  render() {
    const { type, fields } = this.props;
    return(
      <form onSubmit={this.handleSubmit}>
        <h1>{type}</h1>
        {fields.map((field, idx) => (
          <li key={idx}>
          {field} : <input type="text" value={this.state[field]} onChange={this.update(field)} />
          </li>
        ))}
        <button type="submit">Create</button>
      </form>
    )
  }
}
