import { combineReducers } from 'redux';
import usersReducer from '../session/users_reducer';

export default combineReducers({
  users: usersReducer
})