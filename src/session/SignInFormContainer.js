import SessionForm from './SessionForm';
import { connect } from 'react-redux';
import { login, receiveSessionView, removeSessionError } from './session_actions';
import { signInValidate } from './session_util';

const msp = (state) => ({
  type: 'Sign In To Your Account',
  fields: ['email', 'password'],
  buttonText: 'Sign In',
  email: state.ui.sessionEmail,
  error: state.errors.sessionError
});

const mdp = dispatch => ({
  save: user => dispatch(login(user)),
  closeModal: () => dispatch(receiveSessionView(0)),
  validate: state => signInValidate(state),
  clearSessionError: () => dispatch(removeSessionError())
});

export default connect(msp, mdp)(SessionForm);