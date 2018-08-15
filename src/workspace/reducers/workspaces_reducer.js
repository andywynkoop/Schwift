import { RECEIVE_WORKSPACES, RECEIVE_WORKSPACE } from '../workspace_actions';

export default (state = {}, action) => {
  const { type, workspaces, workspace } = action; 
  switch(type) {
    case RECEIVE_WORKSPACES:
      const newState = {};
      workspaces.forEach(workspace => newState[workspace._id] = workspace);
      return newState;
    case RECEIVE_WORKSPACE:
      return Object.assign({}, state, { [workspace._id]: workspace })
    default:
      return state;
  }
}