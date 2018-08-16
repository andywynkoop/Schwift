import { receiveWorkspace } from "../workspace/workspace_actions";

export const fetchChannels = workspaceId => dispatch =>
  console.log('fetching channels for ', workspaceId);

export const selectChannel = channelId => dispatch =>
  console.log('selecting channel');

export const createChannel = channel => (dispatch, getState) => {
  const { session: { currentUser: userId }, ui: { activeWorkspace: workspaceId }} = getState();

  return axios.post('/api/channels', { userId, workspaceId, channel })
    .then(({data: workspace}) => dispatch(receiveWorkspace(workspace)));
}