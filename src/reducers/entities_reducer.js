import { combineReducers } from 'redux';
import usersReducer from '../session/reducers/users_reducer';
import workspacesReducer from '../workspace/reducers/workspaces_reducer';
import channelsReducer from '../channel/reducers/channels_reducer';
import messagesReducer from '../feed/reducers/messages_reducer';

export default combineReducers({
  users: usersReducer,
  workspaces: workspacesReducer,
  channels: channelsReducer,
  messages: messagesReducer
});