import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'
import { withRouter } from 'react-router';
// import { Redirect } from 'react-router-dom'

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
      taskDetailPages: [{}, {path: ""}],
      taskDetailUsers: [{}, {username: ""}],
      taskDetailTags: [{}, {title: ""}],
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
      return <TeamTaskNewItem newTaskFormListener={this.newTaskFormListener} newTaskDisplayAddlFields={this.newTaskDisplayAddlFields} newTaskDisplayAddIcon={this.newTaskDisplayAddIcon} newTaskStatusListener={this.newTaskStatusListener} newTaskRefListener={this.newTaskRefListener} newTaskSubmit={this.newTaskSubmit} newTask = {this.state.newTask} newTaskPages={this.state.newTaskRef.newTaskPages} newTaskTags={this.state.newTaskRef.newTaskTags} newTaskUsers={this.state.newTaskRef.newTaskUsers}/>
    } else if (!!this.state.taskDetail) {

      let selectedTask = this.props.teamTasks.find((t) => t.task._id === this.state.taskDetail._id)

      return <TeamTaskDetail editTaskDeletePage = {this.props.editTaskDeletePage} taskEditAddlRefListener={this.taskEditAddlRefListener} taskDetail={this.state.taskDetail}  taskEditAddPageField={this.taskEditAddPageField} taskEditAddTagField={this.taskEditAddTagField} taskDetailPages={this.state.taskDetailPages} taskEditAddUserField = {this.taskEditAddUserField} taskDetailUsers={this.state.taskDetailUsers} taskDetailTags={this.state.taskDetailTags} taskEditListener={this.taskEditListener}  taskEditSubmit={this.taskEditSubmit}/>
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

  //listening to add'l values

  newTaskAddlRefListener = (event) => {
    let value = event.target.type === "checkbox" ? event.target.checked : event.target.value
    let name = event.target.name
    let stateUpdate = this.state.newTaskRef
    stateUpdate[name][stateUpdate[name].length-1] = value
    this.setState({
      newTaskRef: stateUpdate
    })

  }


  // displaying button if field already has 1 value

  newTaskDisplayAddIcon = (stateName) => {
    if (this.state.newTaskRef[stateName].length < 1) {
      return {display: "none"}
    } else {
      ("adding add icon")
      return {display:"inline"}
    }
  }

  // rendering additional fields if button clicked

  newTaskDisplayAddlFields = (stateName) => {

    return this.state.newTaskRef[stateName].map((u, idx) => {
      return <input placeholder='Team Member #${idx + 1}' type="text" name="newTaskUsers" onChange={this.newTaskRefListener} />
    })
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

    taskEditAddPageField = () => {
      console.log("in add field function")
      debugger
      let currentPageState = this.state.taskDetailPages.slice(0)
      currentPageState = [...currentPageState, { path: '' }]
      this.setState({
        taskDetailPages: currentPageState
      })
    }

    taskEditAddTagField = () => {
      let currentTagState = this.state.taskDetailTags.slice(0)
      currentTagState = [...currentTagState, { title: '' }]
      this.setState({
        taskDetailTags: currentTagState
      })
    }

    taskEditAddUserField = () => {
      let currentUserState = this.state.taskDetailUsers.slice(0)
      currentUserState = [...currentUserState, { username: '' }]
      this.setState({
        taskDetailUsers: currentUserState
      })
    }

    taskEditAddlRefListener = (event) => {

      console.log("in taskEditAddlRefListener")
      console.log(event.target.value)
      let value = event.target.type === "checkbox" ? event.target.checked : event.target.value
      let name = event.target.name
      let keyName = event.target.className
      let kV = {}
      kV[keyName] = value
      console.log("kV", kV)

      const currentRef = this.state[name].slice(0)
      currentRef[currentRef.length - 1][keyName] = value
      console.log("updated currentRef", currentRef)
      this.setState({
        name: currentRef
      })
    }

    taskEditSubmit = (event) => {
      event.preventDefault()
      let relPages = this.state.taskDetailPages
      let relTags = this.state.taskDetailTags
      this.props.editTask(this.state.taskDetail, relPages, relTags)
      let relTask = this.props.teamTasks.find((t) => t.task._id["$oid"] == this.state.taskDetail._id["$oid"])
      this.selectTaskDetail(event, relTask.task, relTask.pages, relTask.tags, relTask.users)

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
