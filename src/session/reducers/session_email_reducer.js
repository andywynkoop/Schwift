import { RECEIVE_SESSION_EMAIL, RECEIVE_CURRENT_USER } from '../session_actions';

export default (state = "", action) => {
  const { type, email } = action;
  switch(type) {
    case RECEIVE_SESSION_EMAIL:
      return email;
    case RECEIVE_CURRENT_USER:
      return "";
    default:
      return state;
  }
}