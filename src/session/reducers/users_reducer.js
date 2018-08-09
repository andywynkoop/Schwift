import { RECEIVE_USER, RECEIVE_CURRENT_USER } from '../session_actions';

export default (state = {}, action) => {
  const { type, user } = action;
  switch(type) {
    case RECEIVE_USER, RECEIVE_CURRENT_USER:
      if (!user._id) return state;
      return Object.assign(state, { [user._id]: user })
    default:
      return state;
  }
}