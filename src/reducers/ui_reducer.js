import { combineReducers } from "redux";
import sessionViewReducer from '../session/reducers/session_view_reducer';
import sessionEmailReducer from '../session/reducers/session_email_reducer';
import activeWorkspaceReducer from '../workspace/reducers/active_workspace_reducer';
import modalReducer from '../modal/modal_reducer';

export default combineReducers({
  sessionView: sessionViewReducer,
  sessionEmail: sessionEmailReducer,
  activeWorkspace: activeWorkspaceReducer,
  modal: modalReducer
});