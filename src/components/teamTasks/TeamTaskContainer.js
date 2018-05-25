import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom'

import TeamTaskList from './taskListSection/TeamTaskList'
import TeamTaskNewItem from './taskDetailSection/TeamTaskNewItem'
import TeamTaskDetail from './taskDetailSection/TeamTaskDetail'
import SidebarContainer from './taskSidebarSection/SidebarContainer'

class TeamTaskContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tasksDisplayed: "",
      taskDetail: null,
      taskDetailPages: [],
      taskDetailUsers: [],
      taskDetailTags: [],
      newTask: {status_summary: ''},
      newTaskRef: {
        newTaskPages: [],
        newTaskTags: [],
        newTaskUsers: []
      },

    }
  }

  componentDidMount() {
    this.setState({
      tasksDisplayed: "all"
    })
  }

  // tasks listed in sidebar begin

  renderTasks = () => {
    if (this.state.tasksDisplayed === "all") {
       return this.tasksToList(this.props.teamTasks)
    }
  }

  tasksToList = (t) => {
    return <TeamTaskList tasks={t} selectTaskDetail={this.selectTaskDetail}/>
  }

  // tasks listed in sidebar end

  // task rendered in detail section begin

    // task render begin

  renderTaskDetailSection = () => {
    if (this.state.taskDetail === 'new') {
      return <TeamTaskNewItem newTaskFormListener={this.newTaskFormListener} newTaskDisplayAddIcon={this.newTaskDisplayAddIcon} newTaskStatusListener={this.newTaskStatusListener} newTaskRefListener={this.newTaskRefListener} newTaskSubmit={this.newTaskSubmit} newTask = {this.state.newTask} />
    } else if (!!this.state.taskDetail) {

      let selectedTask = this.props.teamTasks.find((t) => t.task._id === this.state.taskDetail._id)

      return <TeamTaskDetail task={this.state.taskDetail} pages={this.state.taskDetailPages} users={this.state.taskDetailUsers} tags={this.state.taskDetailTags} taskEditListener={this.taskEditListener}  taskEditSubmit={this.taskEditSubmit}/>
    } else {
      return <div className="fillerText">Select a task or create a new one!</div>
    }
  }

  selectTaskDetail = (event, tsk, tskPages, tskTags, tskUsers) => {
    event.preventDefault()
    this.setState({
      taskDetail: tsk,
      taskDetailPages: tskPages,
      taskDetailTags: tskTags,
      taskDetailUsers: tskUsers
    })
  }

    // task render end

    // new task begin

  newTaskFormListener = (event) => {
    let value = event.target.type === "checkbox" ? event.target.checked : event.target.value
    let name = event.target.name
    let newTaskState = this.state.newTask
    newTaskState[name] = value
    this.setState({
      newTask: newTaskState
    })
  }

  newTaskRefListener = (event) => {
    let value = event.target.type === "checkbox" ? event.target.checked : event.target.value
    let name = event.target.name
    let stateUpdate = this.state.newTaskRef
    stateUpdate[name][0] = value
    this.setState({
      newTaskRef: stateUpdate
    })
  }

  newTaskDisplayAddIcon = (name) => {
    if (this.state.newTaskRef[name].length < 1) {
      return {display: "none"}
    } else {
      return {display:"inline"}
    }
  }


  newTaskSubmit = (event) => {
    event.preventDefault()

    let task = this.state.newTask
    let taskPages = this.state.newTaskRef.newTaskPages
    let taskTags = this.state.newTaskRef.newTaskTags
    let taskUsers = this.state.newTaskRef.newTaskUsers
    this.props.createNewTask(task, taskPages, taskTags, taskUsers)
    // this.setState({
    //   newTask: {
    //     title: '',
    //     description: '',
    //     priority: '',
    //     status_summary: ''
    //   }
    // })
  }

    // new task end

    // edit task begin

    taskEditListener = (event) => {
      let value = event.target.type === "checkbox" ? event.target.checked : event.target.value
      let name = event.target.name
      let currentTaskState = Object.assign({}, this.state.taskDetail)
      currentTaskState[name] = value
      this.setState({
        taskDetail: currentTaskState
      })
    }

    taskEditSubmit = (event) => {
      event.preventDefault()
      this.props.editTask(this.state.taskDetail)

    }


    // edit task end

  // task listed in detail section end

  render() {
    return (
      <div>
        <div className="header"><h1>Team Tasks</h1></div>
<div className="team-task-container">
        <div className="section-1">
          <SidebarContainer selectTaskDetail={this.selectTaskDetail}/>
        </div>

        <div className="section-2">
          {this.renderTasks()}
        </div>

        <div className="section-3">
          {this.renderTaskDetailSection()}
        </div>
</div>
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
