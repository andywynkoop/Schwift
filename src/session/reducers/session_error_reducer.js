import { RECEIVE_SESSION_ERROR, REMOVE_SESSION_ERROR } from '../session_actions';
export default (state = null, action) => {
  const { type, error } = action;
  switch(type) {
    case RECEIVE_SESSION_ERROR:
      return error;
    case REMOVE_SESSION_ERROR:
      return null;
    default:
      return state;
  }
}