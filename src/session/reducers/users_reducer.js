import { RECEIVE_USER, RECEIVE_CURRENT_USER } from '../session_actions';
import { RECEIVE_CHANNEL } from '../../channel/channel_actions';

export default (state = {}, action) => {
  const { type, user, channel } = action;
  switch(type) {
    case RECEIVE_USER, RECEIVE_CURRENT_USER:
      if (!user._id) return state;
      return Object.assign({}, state, { [user._id]: user })
    case RECEIVE_CHANNEL:
      const newState = Object.assign({}, state);
      channel.members.forEach(member => newState[member._id] = member);
      return newState;
    default:
      return state;
  }
}