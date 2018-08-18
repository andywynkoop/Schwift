import React, { Component } from 'react';
import style from './css/ChannelIndex.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchChannels, selectChannel, fetchChannel } from './channel_actions';
import { receiveActiveWorkspace } from '../workspace/workspace_actions';
import { setModal } from '../modal/modal_actions';

class ChannelIndex extends Component {
  componentDidMount() {
    this.props.setActiveWorkspace(this.props.match.params.id);
  }

  selectChannel = channelId => {
    this.props.selectChannel(channelId);
    this.props.fetchChannel(channelId)
  }

  render() {
    const { workspace, openNewChannel, user } = this.props;
    if (!workspace) return <div />;
    return(
      <div className={style.app}>
        <h1>{workspace.name}</h1>
        <h2>
          <span className={style.online}>●</span>
          <span className={style.name}>{user.firstname} {user.lastname}</span>
        </h2>
        <div className={style.channelHeader}>
          <h2>Channels</h2>
          <button onClick={openNewChannel}>⊕</button>
        </div>
        
        {workspace.channels.map(channel => 
          <h3 
            key={channel._id} 
            onClick={() => this.selectChannel(channel._id)}
          >
            {"# "}{channel.name}
          </h3>
        )}
        <div className={style.channelHeader}>
          <h2>Direct Messages</h2>
          <button>⊕</button>
        </div>
      </div>
    )
  }
}

const msp = state => ({
  workspace: state.entities.workspaces[state.ui.activeWorkspace],
  user: state.entities.users[state.session.currentUser]
});

const mdp = dispatch => ({
  setActiveWorkspace: workspaceId => dispatch(receiveActiveWorkspace(workspaceId)),
  selectChannel: channelId => dispatch(selectChannel(channelId)),
  fetchChannel: channelId => dispatch(fetchChannel(channelId)),
  openNewChannel: () => dispatch(setModal("CREATE_CHANNEL"))
});

export default connect(msp, mdp)(withRouter(ChannelIndex));