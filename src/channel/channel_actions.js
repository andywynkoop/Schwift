import { receiveWorkspace } from "../workspace/workspace_actions";

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

export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const receiveChannel = channel => ({
  type: RECEIVE_CHANNEL,
  channel
});
export const fetchChannel = channelId => dispatch => 
  axios.get(`/api/channels/${channelId}`)
    .then(({ data: channel }) => dispatch(receiveChannel(channel)));