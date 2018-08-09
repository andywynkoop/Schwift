import { combineReducers } from "redux";
import sessionViewReducer from '../session/reducers/session_view_reducer';
import sessionEmailReducer from '../session/reducers/session_email_reducer';

export default combineReducers({
  sessionView: sessionViewReducer,
  sessionEmail: sessionEmailReducer
});