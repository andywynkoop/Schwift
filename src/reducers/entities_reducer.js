import { combineReducers } from 'redux';
import usersReducer from '../session/reducers/users_reducer';

export default combineReducers({
  users: usersReducer
})