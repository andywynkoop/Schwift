import React, { Component } from 'react';
import style from './css/SessionForm.css';

export default class SignUpForm extends Component {
  state = {
    firstname: '',
    lastname: '',
    username: '',
    email: this.props.email,
    password: '',
    errors: {}
  }

  componentDidMount() {
    console.log('clearing')
    this.props.clearSessionError();
  }

  validate = e => {
    e.preventDefault();
    this.props.clearSessionError();
    const errors = this.props.validate(this.state);
    if (Object.keys(errors).length === 0) this.props.save(this.state);
    this.setState({ errors });
  }

  handleClick = ({ target }) => {
    if(target === this.blackSpace) this.props.closeModal();
  }
  
  update = field => e => this.setState({ [field]: e.target.value });

  clearErrors = () => this.setState({ errors: {} });

  renderErrors = () => {
    const { errors } = this.state;
    const messages = Object.values(errors);
    return(
      <div className={style.wrapper}>
        <div className={style.form}>
          <h1 className={style.h1}>Error</h1>
          <p className={style.errorP}>
            Listen, I hate to break it to you, 
            but the form you're trying to submit is a total piece of shit.{" "}
            {messages}{" "}Why don't you get your shit together and
            <a className={style.errorClear} onClick={this.clearErrors}> give it another try?</a>
          </p>
        </div>
      </div>
    )
  }

  render() {
    const { type, fields, buttonText } = this.props;
    if (Object.keys(this.state.errors).length > 0) return this.renderErrors();
    return(
      <div className={style.wrapper} onClick={this.handleClick} ref={el => this.blackSpace = el}>
        <form onSubmit={this.validate} className={style.form}>
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
          <p className={style.serverError}>{this.props.error}</p>
          <button className={style.btn} type="submit">{buttonText}</button>
        </form>
      </div>
    )
  }
}
