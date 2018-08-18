import axios from 'axios';

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});
export const sendMessage = message => dispatch =>
  console.log('sending: ', message);
