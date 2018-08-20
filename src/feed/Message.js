import React from 'react';
import { connect } from 'react-redux';
import style from './css/Message.css';
const defaultAvatar = "https://s3-us-west-1.amazonaws.com/spacebook-assets/photos/images/000/000/001/original/no_face.png";

const Message = ({ message, author, timestamp }) => 
    <div className={style.message}>
      <img src={defaultAvatar} className={style.avatar} />
      <div className={style.content}>
        <p>
          <span className={style.name}>{author.firstname} {author.lastname}</span>
          <span className={style.timestamp}>{timestamp}</span>
        </p>
        <p className={style.body}>{message.body}</p>
      </div>
    </div>;


const msp = (state, props) => ({
  author: state.entities.users[props.message.author],
  timestamp: new Date(props.message.createdAt).toLocaleTimeString()
});

export default connect(msp)(Message);