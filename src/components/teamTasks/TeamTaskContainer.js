import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom'
import WithAuth from '../../wrappers/WithAuth'
import TeamTaskList from './TeamTaskList'
import TeamTaskNewItem from './TeamTaskNewItem'

class TeamTaskContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tasksDisplayed: "",
      showNewTaskForm: false,
      newTask: {status_summary: ''}
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

  newTaskFormListener = (event) => {
    let value = event.target.type === "checkbox" ? event.target.checked : event.target.value
    let name = event.target.name
    let newTaskState = this.state.newTask
    console.log("in container#newTaskFormListener — value", value)
    console.log("in container#newTaskFormListener — name", name)
    console.log("in container#newTaskFormListener — newTaskState", newTaskState)


    newTaskState[name] = value
    this.setState({
      newTask: newTaskState
    })
    console.log("in container#newTaskFormListener — updated state[newTask]", this.state.newTask)

  }


  newTaskSubmit = (event) => {
    event.preventDefault()
    let task = this.state.newTask
    console.log("in container#newTaskSubmit — task", task)
    this.props.createNewTask(task)
    this.setState({
      newTask: {
        title: '',
        description: '',
        priority: '',
        status_summary: ''
      }
    })
  }

  render() {
    return (
      <div className="team-task-container">
        <div className="header"><h1>Team Tasks</h1></div>
        <div className="section">
          <TeamTaskNewItem newTaskFormListener={this.newTaskFormListener} newTaskStatusListener={this.newTaskStatusListener} newTaskSubmit={this.newTaskSubmit} newTask = {this.state.newTask} />
        </div>

        <div className="taskList">{this.renderTasks()}</div>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamTaskContainer));
