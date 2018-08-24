import React, { Component } from 'react';
import style from './css/SessionForm.css';

export default class SignUpForm extends Component {
  state = {
    firstname: '',
    lastname: '',
    username: '',
    email: this.props.email,
    password: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.save(this.state);
  }

  handleClick = ({ target }) => {
    if(target === this.blackSpace) this.props.closeModal();
  }
  
  update = field => e => this.setState({ [field]: e.target.value });

  render() {
    const { type, fields, buttonText } = this.props;
    return(
      <div className={style.wrapper} onClick={this.handleClick} ref={el => this.blackSpace = el}>
        <form onSubmit={this.handleSubmit} className={style.form}>
          <h1 className={style.h1}>{type}</h1>
          {fields.map((field, idx) => (
            <li key={idx}>
              <input 
                type={(field === "password") ? "password" : "text"} 
                value={this.state[field]} 
                onChange={this.update(field)} 
                className={style.input}
                placeholder={field}
              />
            </li>
          ))}
          <button className={style.btn} type="submit">{buttonText}</button>
        </form>
      </div>
    )
  }
}
