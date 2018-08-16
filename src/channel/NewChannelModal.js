import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './css/NewChannelModal.css';
import { closeModal } from '../modal/modal_actions';
import { createChannel } from './channel_actions';

class NewChannelModal extends Component {
  state = {
    name: '',
    purpose: ''
  }
  
  update = field => e => this.setState({ [field]: e.target.value});

  handleSubmit = () => {
    this.props.create(this.state);
    this.props.close();
  }

  render() {
    return(
      <div className={this.props.modal ? style.open : style.closed}>
        <button className={style.closeButton} onClick={this.props.close}>ⓧ</button>
        <div className={style.modal}>
          <h1>Create a channel</h1>
          <p>Channels are where your team communicates. They're best when organized around a topic – #leads, for example.</p>
          <h4>Name</h4>
          <input type="text" value={this.state.name} onChange={this.update('name')} />
          <h4>Purpose</h4>
          <input type="text" value={this.state.purpose} onChange={this.update('purpose')} />
          <div className={style.formButtons}>
            <button onClick={this.props.close}>Cancel</button>
            <button onClick={this.handleSubmit}>Create Channel</button>
          </div>
        </div>
      </div>     
    )
  }
}

const msp = state => ({
  modal: (state.ui.modal === "CREATE_CHANNEL"),
});

const mdp = dispatch => ({
  close: () => dispatch(closeModal()),
  create: channel => dispatch(createChannel(channel))
});

export default connect(msp, mdp)(NewChannelModal);