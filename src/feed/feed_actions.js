import axios from 'axios';

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});
export const sendMessage = body => (dispatch, getState) => {
  const { session: { currentUser: author }, ui: { activeChannel: channel } } = getState();
  const message = { body, author, channel };
  return axios.post('/api/messages', { message })
    .then(({ data: message }) => dispatch(receiveMessage(message)));
}
  
