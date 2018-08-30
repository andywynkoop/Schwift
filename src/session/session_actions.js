import axios from 'axios';

export const RECEIVE_USER = "RECEIVE_USER";
export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});
export const createUser = user => dispatch =>
  axios.post('/api/users', { user })
    .then(({data: user}) => dispatch(receiveCurrentUser(user)))
    .catch(() => dispatch(receiveSessionError("Looks like somebody else already registered with this email")))

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});
export const fetchCurrentUser = () => dispatch => 
  axios.get('/api/session')
    .then(({ data: currentUser }) => dispatch(receiveCurrentUser(currentUser)));

export const login = user => dispatch => 
  axios.post('/api/session', { user })
    .then(({ data: user }) => dispatch(receiveCurrentUser(user)))
    .catch(() => dispatch(receiveSessionError("Wrong email or password")));

export const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER";
export const removeCurrentUser = () => ({ type: REMOVE_CURRENT_USER });
export const logout = () => dispatch =>
  axios.delete('/api/session')
    .then(() => dispatch(removeCurrentUser()));

export const RECEIVE_SESSION_VIEW = "RECEIVE_SESSION_VIEW";
export const receiveSessionView = page => ({
  type: RECEIVE_SESSION_VIEW,
  page
});

export const RECEIVE_SESSION_EMAIL = "RECEIVE_SESSION_EMAIL";
export const receiveSessionEmail = email => ({
  type: RECEIVE_SESSION_EMAIL,
  email
});

export const RECEIVE_SESSION_ERROR = "RECEIVE_SESSION_ERROR";
export const receiveSessionError = error => ({
  type: RECEIVE_SESSION_ERROR,
  error
});

export const REMOVE_SESSION_ERROR = "REMOVE_SESSION_ERROR";
export const removeSessionError = () => ({
  type: REMOVE_SESSION_ERROR
});