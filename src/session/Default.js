import React, { Component } from 'react'
import style from './css/Default.css';
import { connect } from 'react-redux';
import { receiveSessionView, receiveSessionEmail } from './session_actions';

class Default extends Component {
  state = {
    email: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.changeSessionEmail(this.state.email)
    this.props.changeSessionView(1);
  }

  render() {
    return(
      <div className={style.app}>
        <div className={style.left}>
        <img src={"https://s3-us-west-1.amazonaws.com/slack-clone-assets/kisspng-rick-sanchez-morty-smith-t-shirt-middle-finger-can-rick-and-morty-5ac21f466f34b1.0312884215226714304555.png"} />
      </div>
      <div className={style.right}>
          <h1>Where Work Happens</h1>
          <p>
            When your team needs to kick off a project, hire a new employee, deploy some code, review a sales contract, finalize next year's budget, measure an A/B test, plan your next office opening, and more, Slack has you covered.
          </p>
          <form className={style.emailInput} onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Email address" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
            <button type="submit">Get Schwifty</button>
          </form>
          <div className={style.signIn}>
            Already using Schwift? <span onClick={() => this.props.changeSessionView(2)}> Sign In.</span>
          </div>
      </div>
    </div>
    );
  }
}

const mdp = dispatch => ({ 
  changeSessionView: page => dispatch(receiveSessionView(page)),
  changeSessionEmail: email => dispatch(receiveSessionEmail(email))
});


export default connect(null, mdp)(Default);