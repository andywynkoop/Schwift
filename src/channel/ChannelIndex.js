import React, { Component } from 'react';
import style from './css/ChannelIndex.css';
import { connect } from 'react-redux';

class ChannelIndex extends Component {
  render() {
    const { workspace } = this.props;
    if (!workspace) return <div />;
    return(
      <div className={style.app}>
        <h1>{workspace.name}</h1>
      </div>
    )
  }
}

const msp = state => ({
  workspace: state.entities.workspaces[state.ui.activeWorkspace]
});

const mdp = dispatch => ({

});

export default connect(msp, mdp)(ChannelIndex);