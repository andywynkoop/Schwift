import React, { Component } from 'react';
import style from './css/ChannelIndex.css';
import { connect } from 'react-redux';
import { fetchChannels, selectChannel } from './channel_actions';
import { receiveActiveWorkspace } from '../workspace/workspace_actions';

class ChannelIndex extends Component {
  componentDidMount() {
    this.props.setActiveWorkspace(this.props.match.params.workspaceId).then(() => {
      this.props.fetchChannels(this.props.workspace._id)
    });
  }
  render() {
    const { workspace } = this.props;
    if (!workspace) return <div />;
    return(
      <div className={style.app}>
        <h1>workspace: {workspace.name}</h1>
      </div>
    )
  }
}

const msp = state => ({
  workspace: state.entities.workspaces[state.ui.activeWorkspace]
});

const mdp = dispatch => ({
  setActiveWorkspace: (workspaceId) => dispatch(receiveActiveWorkspace(workspaceId)),
  fetchChannels: (workspaceId) => dispatch(fetchChannels(workspaceId)),
  selectChannel: (channelId) => dispatch(selectChannel(channelId))
});

export default connect(msp, mdp)(ChannelIndex);