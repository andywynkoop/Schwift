import React from 'react';
import style from './css/Workspace.css';
import ChannelIndex from '../channel/ChannelIndex';
import Feed from '../feed/Feed';


export default () => 
  <div className={style.app}>
    <ChannelIndex />
    <Feed />
  </div>