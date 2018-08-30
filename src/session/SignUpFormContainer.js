import SessionForm from './SessionForm';
import { connect } from 'react-redux';
import { createUser, receiveSessionView, removeSessionError } from './session_actions';
import { signUpValidate } from './session_util';

const msp = (state) => ({
  type: 'Create Account',
  fields: ['email', 'firstname', 'lastname', 'username', 'password'],
  buttonText: 'Get Schwifty!!!',
  email: state.ui.sessionEmail,
  error: state.errors.sessionError
});

const mdp = dispatch => ({
  save: user => dispatch(createUser(user)),
  closeModal: () => dispatch(receiveSessionView(0)),
  validate: state => signUpValidate(state),
  clearSessionError: () => dispatch(removeSessionError()),
});

export default connect(msp, mdp)(SessionForm);