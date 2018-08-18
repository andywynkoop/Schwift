import { receiveWorkspace } from "../workspace/workspace_actions";

export const fetchChannels = workspaceId => dispatch =>
  console.log('fetching channels for ', workspaceId);

export const SELECT_CHANNEL = "SELECT_CHANNEL";
export const selectChannel = channelId => ({
  type: SELECT_CHANNEL,
  channelId
});

export const createChannel = channel => (dispatch, getState) => {
  const { session: { currentUser: userId }, ui: { activeWorkspace: workspaceId }} = getState();

  return axios.post('/api/channels', { userId, workspaceId, channel })
    .then(({data: workspace}) => dispatch(receiveWorkspace(workspace)));
}