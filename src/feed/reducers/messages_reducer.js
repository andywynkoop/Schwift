import { RECEIVE_MESSAGE } from '../feed_actions';
import { RECEIVE_CHANNEL } from '../../channel/channel_actions';

export default (state = {}, action) => {
  const { type, message, channel } = action;
  const newState = Object.assign({}, state);

  switch(type) {
    case RECEIVE_MESSAGE:
      newState[message._id] = message;
      return newState;
    case RECEIVE_CHANNEL:
      channel.messages.forEach(message => newState[message._id] = message);
      return newState;
    default: 
      return state;
  }
}