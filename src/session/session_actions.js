import axios from 'axios';
export const RECEIVE_USER = "RECEIVE_USER";
export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});
export const createUser = user => dispatch =>
  axios.post('/api/users', { user })
    .then(user => dispatch(receiveUser(user)));

