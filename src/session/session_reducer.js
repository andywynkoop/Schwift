import { RECEIVE_CURRENT_USER, REMOVE_CURRENT_USER } from './session_actions';

const loading = { currentUser: "Loading" }
const nullUser = { currentUser: null }

export default (state = loading, action) => {
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return { currentUser: (action.user._id || null) }
    case REMOVE_CURRENT_USER:
      return nullUser;
    default:
      return state;
  }
}