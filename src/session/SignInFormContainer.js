import SessionForm from './SessionForm';
import { connect } from 'react-redux';
import { login } from './session_actions';

const mapStateToProps = (state) => ({
  type: 'Login',
  fields: ['email', 'password']
})

const mapDispatchToProps = dispatch => ({
  save: user => dispatch(login(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)