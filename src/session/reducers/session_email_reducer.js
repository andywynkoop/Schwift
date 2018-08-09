import { RECEIVE_SESSION_EMAIL } from '../session_actions';

export default (state = "", action) => {
  const { type, email } = action;
  switch(type) {
    case RECEIVE_SESSION_EMAIL:
      return email;
    default:
      return state;
  }
}