import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './css/NewChannelModal.css';
import { closeModal } from '../modal/modal_actions';

class NewChannelModal extends Component {
  render() {
    console.log(this.props.modal);
    return(
      <div className={style.open}>
        New Channel Modal
        <button className={style.closeButton} onClick={this.props.close}>ⓧ</button>
      </div>     
    )
  }
}

const msp = state => ({
  modal: (state.ui.modal === "CREATE_CHANNEL"),
});

const mdp = dispatch => ({
  close: () => dispatch(closeModal())
});

export default connect(msp, mdp)(NewChannelModal);

// this.props.modal ? style.open : style.closed