import SignUpForm from './SignUpForm';
import { connect } from 'react-redux';
import { createUser } from './session_actions';

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(createUser(user))
})



export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)