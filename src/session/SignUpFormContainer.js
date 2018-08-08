import SessionForm from './SessionForm';
import { connect } from 'react-redux';
import { createUser } from './session_actions';

const mapStateToProps = (state) => ({
  type: 'Create Account',
  fields: ['firstname', 'lastname','username', 'email', 'password']
})

const mapDispatchToProps = dispatch => ({
  save: user => dispatch(createUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)