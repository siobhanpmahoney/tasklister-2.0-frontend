import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom'
import WithAuth from '../../wrappers/WithAuth'
import TeamTaskList from './TeamTaskList'

class TeamTaskContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tasksDisplayed: "",
    }
  }

  componentDidMount() {
    this.setState({
      tasksDisplayed: "all"
    })
  }

  renderTasks = () => {
    if (this.state.tasksDisplayed === "all") {
       return this.tasksToList(this.props.teamTasks)
    }
  }

  tasksToList = (t) => {
    return <TeamTaskList tasks={t}/>
  }

  render() {
    return (
      <div className="team-task-container">
        <h1>Team Tasks</h1>

            {this.renderTasks()}

      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user.currentUser,
    userTasks: state.user.userTasks,
    teamTasks: state.teamTasks.allTasks
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth(TeamTaskContainer)));
