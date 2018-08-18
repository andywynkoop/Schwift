import { RECEIVE_WORKSPACE } from "../../workspace/workspace_actions";

export default (state = {}, action) => {
  const { type, workspace } = action;

  switch(type) {
    case RECEIVE_WORKSPACE:
      const newState = {};
      workspace.channels.forEach(channel => {
        newState[channel._id] = channel
      });
      return newState;
    default:
      return state;
  }
}