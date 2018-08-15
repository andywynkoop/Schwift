import axios from 'axios';

export const RECEIVE_WORKSPACES = "RECEIVE_WORKSPACES";
export const receiveWorkspaces = workspaces => ({
  type: RECEIVE_WORKSPACES,
  workspaces
});
export const fetchWorkspaces = user => dispatch =>
  axios.get(`/api/workspaces?userId=${user._id}`)
    .then(res => dispatch(receiveWorkspaces(res.data.workspaces)));

export const RECEIVE_ACTIVE_WORKSPACE = "RECEIVE_ACTIVE_WORKSPACE";
export const receiveActiveWorkspace = workspaceId => ({
  type: RECEIVE_ACTIVE_WORKSPACE,
  workspaceId
});

export const RECEIVE_WORKSPACE = "RECEIVE_WORKSPACE";
export const receiveWorkspace = workspace => ({
  type: RECEIVE_WORKSPACE,
  workspace
});
export const createWorkspace = (workspace, user) => dispatch => 
  axios.post('/api/workspaces', { workspace, user })
    .then(({ data: workspace}) => dispatch(receiveWorkspace(workspace)));

export const joinWorkspace = (workspaceId, user) => dispatch =>
  axios.patch(`/api/workspace/${workspaceId}`, { user })
    .then(({ data: workspace }) => dispatch(receiveWorkspace(workspace)));

export const fetchWorkspace = workspaceId => dispatch =>
  axios.get(`/api/workspace/${workspaceId}`)
    .then(({ data: workspace }) => dispatch(receiveWorkspace(workspace)));