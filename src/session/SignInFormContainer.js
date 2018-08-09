import SessionForm from './SessionForm';
import { connect } from 'react-redux';
import { login } from './session_actions';

const msp = (state) => ({
  type: 'Sign In To Your Account',
  fields: ['email', 'password'],
  buttonText: 'Sign In',
  email: state.ui.sessionEmail
});

const mdp = dispatch => ({
  save: user => dispatch(login(user))
});

export default connect(msp, mdp)(SessionForm);