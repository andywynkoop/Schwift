import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './css/Feed.css';
import Textarea from 'react-textarea-autosize';
import { sendMessage } from './feed_actions';


class Feed extends Component {
  state = {
    message: '',
    keyMap: {}
  }

  update = field => e => this.setState({ [field]: e.target.value });
  
  keyDown = ({ keyCode }) => {
    const { keyMap } = this.state;
    if (keyCode === 13 && keyMap[18]) {
      this.submit();
    }
    keyMap[keyCode] = true;
    this.setState({ keyMap });
  }

  keyUp = ({ keyCode }) => {
    const { keyMap } = this.state;
    delete keyMap[keyCode];
    this.setState({ keyMap });
  }

  submit = () => {
    this.props.send(this.state.message);
    this.setState({ message: '' });
  }

  render() {
    const { channel } = this.props;
    if (!channel) return <div/>;
    return(
      <div className={style.feed}>
        <div className={style.feedHeader}>
          #{channel.name}
        </div>
        <div className={style.feedMessages}>
          Feed
        </div>
        <div className={style.feedInput}>
          <div className={style.container}>
            <Textarea 
              placeholder={`Message #${channel.name}`} 
              onKeyDown={this.keyDown} 
              onKeyUp={this.keyUp} 
              onChange={this.update('message')} 
              value={this.state.message}
            />
          </div>
        </div>
      </div>
    )
  }
}

const msp = state => ({
  channel: state.entities.channels[state.ui.activeChannel]
});

const mdp = dispatch => ({
  send: message => dispatch(sendMessage(message))
});

export default connect(msp, mdp)(Feed);