import { RECEIVE_ACTIVE_WORKSPACE, RECEIVE_WORKSPACE } from '../workspace_actions';

export default (state = null, action) => {
  const { type, workspaceId, workspace } = action;
  switch(type) {
    case RECEIVE_ACTIVE_WORKSPACE:
      return workspaceId;
    case RECEIVE_WORKSPACE:
      return workspace._id;
    default:
      return state;
  }
}