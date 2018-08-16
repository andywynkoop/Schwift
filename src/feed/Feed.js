import React, { Component } from 'react';
import { connect } from 'react-redux';


class Feed extends Component {
  render() {
    return(
      <div className={style.feed}>
      Feed
      </div>
    )
  }
}

const msp = state => ({
  channel: null
});
// state.entities.channels[state.ui.activeChannel]

export default connect(msp)(Feed);