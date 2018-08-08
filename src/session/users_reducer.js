import { RECEIVE_USER } from './session_actions';

export default (state = {}, action) => {
  const { type, user } = action;
  switch(type) {
    case RECEIVE_USER:
      return Object.assign(state, { [user.id]: user })
    default:
      return state
  }
}