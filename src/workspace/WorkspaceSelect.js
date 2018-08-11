import React, { Component } from 'react';
import { debounce } from 'lodash';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCurrentUser } from '../reducers/selectors';
import { fetchWorkspaces, receiveActiveWorkspace, createWorkspace, joinWorkspace } from './workspace_actions';
import WorkspaceNav from './WorkspaceNav';
import style from './css/WorkspaceSelect.css';

class Home extends Component {
  state = {
    workspaceName: '',
    workspaceExists: null,
    foundWorkspaceId: null
  }

  componentDidMount() {
    this.props.fetchWorkspaces(this.props.currentUser);
  }

  checkExistance = () => {
    console.log('called')
    axios.get(`/api/workspaceExists?name=${this.state.workspaceName}`)
      .then(({data: { workspaceExists, foundWorkspaceId }}) => this.setState({ workspaceExists, foundWorkspaceId }));
  }

  debouncedCheckExistance = debounce(this.checkExistance, 250);

  handleChange = e => 
    this.setState({ workspaceName: e.target.value }, this.debouncedCheckExistance())

  render() {
    const { activeWorkspace, currentUser, workspaces, selectWorkspace, join, create } = this.props;
    const { workspaceExists, foundWorkspaceId, workspaceName: name } = this.state;
    if (activeWorkspace) return <Redirect to={`/workspace/${activeWorkspace}`} />

    const options = {
      true: <h2 onClick={() => join(foundWorkspaceId, currentUser)}>+ Join this Workspace</h2>,
      false: <h2 onClick={() => create({ name }, currentUser)}>+ Create this Workspace</h2>
    }
    return(
      <div className={style.app}>
        <WorkspaceNav />
        <div className={style.main}>
          <div className={style.left}>
            <h1>{currentUser.firstname}'s Workspaces</h1>
            <ul>
            {workspaces.map(workspace => {
              return (
                <li
                  key={workspace._id} 
                  onClick={() => selectWorkspace(workspace._id)}
                >
                  {workspace.name}
                </li>
              )
            })}
            </ul>
          </div>
          <div className={style.right}>
            <h1>Choose a Different Workspace</h1>
            <div className={style.new}>
              <p>schwift.herokuapp.com/</p>
              <input type="text" value={this.state.workspaceName} onChange={this.handleChange} />
            </div>
            {options[workspaceExists]}
          </div>
        </div>
      </div>
    )
  }
}

const msp = state => ({
  currentUser: getCurrentUser(state),
  workspaces: Object.values(state.entities.workspaces),
  activeWorkspace: state.ui.activeWorkspace
})

const mdp = dispatch => ({
  fetchWorkspaces: user => dispatch(fetchWorkspaces(user)),
  selectWorkspace: id => dispatch(receiveActiveWorkspace(id)),
  create: (workspace, user) => dispatch(createWorkspace(workspace, user)),
  join: (workspaceId, user) => dispatch(joinWorkspace(workspaceId, user))
})

export default connect(msp, mdp)(Home);