import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './css/Feed.css';
import Textarea from 'react-textarea-autosize';
import { sendMessage, receiveMessage } from './feed_actions';
import { selectMessages } from './reducers/selectors';
import Message from './Message';

class Feed extends Component {
  state = {
    message: '',
    keyMap: {}
  }

  componentDidMount() {
    this.socket = io.connect('http://localhost:3210');
    this.socket.on('newMessage', message => {
      this.props.receiveNewMessage(message);
    });
    this.socket.on('connection', message => console.log(message))
  }

  componentDidUpdate() {
    if (this.feedEnd)
      this.scrollToFeedEnd();
  }

  update = field => e => this.setState({ [field]: e.target.value });
  
  keyDown = ({ keyCode }) => {
    let { keyMap } = this.state;
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

  scrollToFeedEnd = () => {
    this.feedEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    const { channel } = this.props;
    if (!channel) return <div/>;
    console.log(this.state.message);
    return(
      <div className={style.feed}>
        <div className={style.feedHeader}>
          #{channel.name}
        </div>
        <div className={style.feedMessages}>
          {this.props.messages.map((message) => <Message key={message._id} message={message} />)}
          <div ref={el => this.feedEnd = el } />
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
  channel: state.entities.channels[state.ui.activeChannel],
  messages: selectMessages(state)
});

const mdp = dispatch => ({
  send: message => dispatch(sendMessage(message)),
  receiveNewMessage: message => dispatch(receiveMessage(message))
});

export default connect(msp, mdp)(Feed);