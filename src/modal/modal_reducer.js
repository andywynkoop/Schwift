import { OPEN_MODAL, CLOSE_MODAL } from './modal_actions';

export default (state = null, action) => {
  const { type, modal } = action;
  switch(type) {
    case OPEN_MODAL:
      return modal;
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
}