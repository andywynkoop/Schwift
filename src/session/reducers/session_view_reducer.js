import { RECEIVE_SESSION_VIEW, REMOVE_CURRENT_USER } from '../session_actions';

export default (state = 0, action) => {
  const { type, page } = action;
  switch (type) {
    case RECEIVE_SESSION_VIEW:
      return page;
    case REMOVE_CURRENT_USER:
      return 0;
    default:
      return state;
  }
}