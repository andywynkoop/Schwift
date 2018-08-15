import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWorkspace } from './workspace_actions';
import style from './css/Workspace.css';
import ChannelIndex from '../channel/ChannelIndex';
import Feed from '../feed/Feed';

class Workspace extends Component {
  componentDidMount() {
    this.props.fetchWorkspace();
  }

  render() {
    return(
      <div className={style.app}>
        <ChannelIndex />
        <Feed />
      </div>
    )
  }
}

const mdp = (dispatch, props) => ({
  fetchWorkspace: () => dispatch(fetchWorkspace(props.match.params.id))
});

export default connect(null, mdp)(Workspace);