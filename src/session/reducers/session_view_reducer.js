import { RECEIVE_SESSION_VIEW } from '../session_actions';

export default (state = 0, action) => {
  const { type, page } = action;
  switch (type) {
    case RECEIVE_SESSION_VIEW:
      return page;
    default:
      return state;
  }
}