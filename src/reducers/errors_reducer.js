import { combineReducers } from 'redux';
import sessionErrorReducer from '../session/reducers/session_error_reducer';

export default combineReducers({
  sessionError: sessionErrorReducer
});