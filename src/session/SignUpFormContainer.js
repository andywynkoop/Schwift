import SessionForm from './SessionForm';
import { connect } from 'react-redux';
import { createUser } from './session_actions';

const msp = (state) => ({
  type: 'Create Account',
  fields: ['email', 'firstname', 'lastname', 'username', 'password'],
  buttonText: 'Get Schwifty!!!',
  email: state.ui.sessionEmail
});

const mdp = dispatch => ({
  save: user => dispatch(createUser(user))
})
;
export default connect(msp, mdp)(SessionForm)