import { SELECT_CHANNEL } from "../channel_actions";

export default (state = null, action) => {
  const { type, channelId } = action;

  switch(type) {
    case SELECT_CHANNEL:
      return channelId;
    default: 
      return state;
  }
}