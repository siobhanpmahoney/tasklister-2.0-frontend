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
import TaskAlert from './taskNotifications/TaskAlert'

class TeamTaskContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tasksDisplayed: [],

      textFilter: "",
      priorityFilter: false,
      statusFilter: [],
      pageFilter: [],
      teamFilter: [],
      tagFilter: [],
      userFilter: [],
      sortSelection: null,

      newTask: {status_summary: ''},
      newTaskPages: [{path: ""}],
      newTaskTags: [{title: ""}],
      newTaskUsers: [],

      taskDetail: null,
      taskDetailPages:[{path: ""}],
      taskDetailUsers: [{username: ""}],
      taskDetailTags: [{}, {title: ""}],


    }
  }

  componentDidMount() {
    let allTasks = this.props.teamTasks.slice(0)
    this.setState({
      tasksDisplayed: allTasks,
      taskDetail: null
    }, this.listFilteredTasks)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.teamTasks != this.props.teamTasks || prevProps.teamPages != this.props.teamPages || prevProps.teamTags != this.props.teamTags) {
      this.setState({
        tasksDisplayed: this.props.teamTasks.slice(0)
      }, this.listFilteredTasks)
    }

  }

  // tasks listed in sidebar begin

  allTasks = () => {
    return this.props.teamTasks.slice()
  }




  listFilteredTasks = () => {
    let taskProps = this.props.teamTasks.slice()

    if (this.state.sortSelection === 'title') {
        taskProps = taskProps.sort((a, b)=>{
          return a.task.title.localeCompare(b.task.title)
        })
        console.log(taskProps)
      } else if (this.state.sortSelection === 'updated') {
        taskProps = taskProps.sort((a, b) => {
          let dateA = new Date(a.task.updated_at).valueOf()
          let dateB = new Date(b.task.updated_at).valueOf()
          return dateB - dateA
        })
      }
      else if (this.state.sortSelection === 'status_summary') {
        taskProps = taskProps.sort((a, b) => {
          return a.task.status_summary.localeCompare(b.task.status_summary)
        })
      } else {
        taskProps = taskProps.sort((a, b) => {
              let dateA = new Date(a.task.created_at).valueOf()
              let dateB = new Date(b.task.created_at).valueOf()
              return dateB - dateA
            })
      }

    if (this.state.textFilter === "") {
      taskProps = taskProps
    } else {
      taskProps = taskProps.filter((t) => {
        return t.task.title.includes(this.state.textFilter) || t.task.description.includes(this.state.textFilter)
      })
    }
    if (!this.state.priorityFilter) {
      taskProps = taskProps
    } else {
      taskProps = taskProps.filter((t) => {
        return t.task.priority
      })
    }
    if (this.state.statusFilter.length > 0) {
      taskProps = taskProps.filter((t) => {
        return this.state.statusFilter.includes(t.task.status_summary)
      })
    }
    if (this.state.pageFilter.length === 0) {
      taskProps = taskProps
    } else if (this.state.pageFilter.length > 0) {
      taskProps = taskProps.filter((task) => {
        return task.pages.find((page) => {
          return this.state.pageFilter.includes(page.path)
        })
      })
    }
    if (this.state.tagFilter.length === 0) {
      taskProps = taskProps
    } else if (this.state.tagFilter.length > 0) {
      taskProps = taskProps.filter((task) => {
        return task.tags.find((tag) => {
          return this.state.tagFilter.includes(tag.title)
        })
      })
    }
    if (this.state.userFilter.length === 0) {
      taskProps = taskProps
    } else if (this.state.userFilter.length > 0) {
      taskProps = taskProps.filter((task) => {
        return task.users.find((user) => {
          return this.state.userFilter.includes(user.username)
        })
      })
    }
    this.setState({
      tasksDisplayed: taskProps
    }, console.log(this.state.tasksDisplayed))
  }

  renderTasks = () => {
    return <TeamTaskList tasks={this.state.tasksDisplayed.slice(0)} selectTaskDetail={this.selectTaskDetail}/>
  }

  // filter listeners begin

  textFilterListener = (event) => {
    let v = event.target.value
    this.setState({
      textFilter: v
    }, this.listFilteredTasks)
  }


  priorityFilterListener = (event) => {
    if (event.target.checked) {
      this.setState({
        priorityFilter: true
      }, this.listFilteredTasks)
    } else {
      this.setState({
        priorityFilter: false
      }, this.listFilteredTasks)
    }
  }

  statusFilterListener = (event) => {
    let currentStatusFilters = this.state.statusFilter
    if (event.target.checked) {
      currentStatusFilters.push(event.target.value)
    } else {
      currentStatusFilters.splice(currentStatusFilters.indexOf(event.target.value), 1)
    }
    this.setState({
      statusFilter: currentStatusFilters
    }, this.listFilteredTasks)
  }

  pageFilterListener = (event) => {
    let currentPageFilters = this.state.pageFilter
    if (event.target.checked) {
      currentPageFilters.push(event.target.value)
    } else {
      currentPageFilters.splice(currentPageFilters.indexOf(event.target.value), 1)
    }
    this.setState({
      pageFilter: currentPageFilters
    }, this.listFilteredTasks)
  }

  userFilterListener = (event) => {
    let currentUserFilters = this.state.userFilter
    if (event.target.checked) {
      currentUserFilters.push(event.target.value)
    } else {
      currentUserFilters.splice(currentUserFilters.indexOf(event.target.value), 1)
    }
    this.setState({
      userFilter: currentUserFilters
    }, this.listFilteredTasks)
  }

  tagFilterListener = (event) => {
    let currentTagFilters = this.state.tagFilter
    if (event.target.checked) {
      currentTagFilters.push(event.target.value)
    } else {
      currentTagFilters.splice(currentTagFilters.indexOf(event.target.value), 1)
    }
    this.setState({
      tagFilter: currentTagFilters
    }, this.listFilteredTasks)
  }

  //filter listeners end


  sortListener = (event) => {
    event.preventDefault()
    let value = event.target.value
    console.log(value)
    this.setState({
      sortSelection: value
    }, this.listFilteredTasks)
  }


  // tasks listed in sidebar end

  // task rendered in detail section begin

  // task render begin

  renderTaskDetailSection = () => {
    if (this.state.taskDetail === 'new') {
      return <TeamTaskNewItem newTaskDeletePageReload={this.newTaskDeletePageReload} newTaskDeleteTagReload={this.newTaskDeleteTagReload}  newTaskFormListener={this.newTaskFormListener} newTaskAddPageField={this.newTaskAddPageField} newTaskAddTagField={this.newTaskAddTagField}  newTaskDisplayAddlFields={this.newTaskDisplayAddlFields} newTaskDisplayAddIcon={this.newTaskDisplayAddIcon} newTaskStatusListener={this.newTaskStatusListener} newTaskRefListener={this.newTaskRefListener} newTaskUserPageListener={this.newTaskUserPageListener} newTaskAddlRefListener = {this.newTaskAddlRefListener} newTaskSubmit={this.newTaskSubmit} newTask = {this.state.newTask} newTaskPages={this.state.newTaskPages} newTaskTags={this.state.newTaskTags} newTaskUsers={this.state.newTaskUsers}/>
    } else if (!!this.state.taskDetail) {

      let selectedTask = this.props.teamTasks.find((t) => t.task._id === this.state.taskDetail._id)

      return <TeamTaskDetail editTaskDeletePageReload={this.editTaskDeletePageReload} editTaskDeleteTagReload={this.editTaskDeleteTagReload} taskEditAddlRefListener={this.taskEditAddlRefListener} taskEditUserPageListener={this.taskEditUserPageListener} taskDetail={this.state.taskDetail} taskDetailUsers={this.state.taskDetailUsers} taskDetailTags={this.state.taskDetailTags} taskEditAddPageField={this.taskEditAddPageField} taskEditAddTagField={this.taskEditAddTagField} taskDetailPages={this.state.taskDetailPages} taskEditAddUserField = {this.taskEditAddUserField}  taskEditListener={this.taskEditListener} taskEditSubmit={this.taskEditSubmit} deleteAndReload={this.deleteAndReload}/>
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
    }, this.listFilteredTasks)
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

    let keyName = event.target.className

    let kV = {}
    kV[keyName] = value

    const currentRef = this.state[name].slice(0)

    currentRef[currentRef.length-1][keyName] = value

    this.setState({
      name: currentRef
    })

  }

  //listening to add'l values

  newTaskAddlRefListener = (event) => {
    let value = event.target.type === "checkbox" ? event.target.checked : event.target.value
    let name = event.target.name
    let keyName = event.target.className
    let kV = {}
    kV[keyName] = value
    const currentRef = this.state[name].slice(0)
    currentRef[currentRef.length - 1][keyName] = value
    this.setState({
      name: currentRef
    })
  }

  newTaskUserPageListener = (event) => {
    let value = event.target.value
    let userState = this.state.newTaskUsers.slice(0)
    if (event.target.checked) {
      let addUser = {}
      addUser["username"] = value

      userState = [...userState, addUser]

    } else {
      let user = this.state.newTaskUsers.find((u) => {
        return u.username == value
      })
      userState.splice(userState.indexOf(value), 1)
    }
    this.setState({
      newTaskUsers: userState
    })
  }

  newTaskAddPageField = (event) => {
    event.preventDefault()
    let currentPageState = this.state.newTaskPages.slice(0)
    currentPageState = [...currentPageState, { path: '' }]
    this.setState({
      newTaskPages: currentPageState
    })
  }

  newTaskAddTagField = (event) => {
    event.preventDefault()
    let currentTagState = this.state.newTaskTags.slice(0)
    currentTagState = [...currentTagState, { title: '' }]
    this.setState({
      newTaskTags: currentTagState
    })
  }


  // new task — event handler for deleting ref fields  [begin]

  newTaskDeletePageReload = (task, page) => {
    let t = task
    let currentPageState = this.state.newTaskPages.slice(0)
    let updatedPageState = [...currentPageState.slice(0, currentPageState.indexOf(page)),... currentPageState.slice(currentPageState.indexOf(page)+1)]
    this.setState({
      newTaskPages: updatedPageState
    })
  }

  newTaskDeleteTagReload = (task, tag) => {
    let t = task
    let currentTagState = this.state.newTaskTags.slice(0)
    let updatedTagState = [...currentTagState.slice(0, currentTagState.indexOf(tag)),... currentTagState.slice(currentTagState.indexOf(tag)+1)]
    this.setState({
      newTaskTags: updatedTagState
    })
  }

  newTaskDeleteUserReload = (task, user) => {
    let t = task
    let currentUserState = this.state.newTaskUsers.slice(0)
    let updatedUserState = [...currentUserState.slice(0, currentUserState.indexOf(user)),... currentUserState.slice(currentUserState.indexOf(user)+1)]
    this.setState({
      newTaskUsers: updatedUserState
    })
  }

  // new task — event handler for deleting ref fields  [end]


  newTaskSubmit = (event) => {
    event.preventDefault()
    let task = this.state.newTask
    let taskPages = this.state.newTaskPages.slice(0)
    let taskTags = this.state.newTaskTags.slice(0)
    let taskUsers = this.state.newTaskUsers.slice(0)
    this.props.createNewTask(task, taskPages, taskTags, taskUsers)
    this.setState({
      taskDetail: null,
      taskDetailPages:[{path: ""}],
      taskDetailUsers: [{username: ""}],
      taskDetailTags: [{}, {title: ""}],
      newTask: {status_summary: ''},
      newTaskPages: [{path: ""}],
      newTaskTags: [{title: ""}],
      newTaskUsers: [{username: ""}]
    }, this.listFilteredTasks)

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



  taskEditUserPageListener = (event) => {
    let value = event.target.value
    let userState = this.state.taskDetailUsers.slice(0)
    if (event.target.checked) {
      let addUser = {}
      addUser["username"] = value
      userState = [...userState, addUser]
    } else {
      let user = this.state.taskDetailUsers.find((u) => {
        return u.username == value
      })
      if (!!user._id) {
        this.props.editTaskDeleteUser(this.state.taskDetail, user)
      }
      userState.splice(userState.indexOf(value), 1)
    }
    this.setState({
      taskDetailUsers: userState
    })
  }

  taskEditAddlRefListener = (event) => {
    let value = event.target.type === "checkbox" ? event.target.checked : event.target.value
    let name = event.target.name
    let keyName = event.target.className
    let kV = {}
    kV[keyName] = value
    const currentRef = this.state[name].slice(0)
    currentRef[currentRef.length - 1][keyName] = value
    this.setState({
      name: currentRef
    })
  }

  editTaskDeletePageReload = (task, page) => {
    let t = task
    if (!!page._id) {
      this.props.editTaskDeletePage(task, page)
    }
    let currentPageState = this.state.taskDetailPages.slice(0)
    let updatedPageState = [...currentPageState.slice(0, currentPageState.indexOf(page)),... currentPageState.slice(currentPageState.indexOf(page)+1)]
    this.setState({
      taskDetailPages: updatedPageState
    })
  }

  editTaskDeleteTagReload = (task, tag) => {
    let t = task
    if (!!tag._id) {
      this.props.editTaskDeleteTag(task, tag)
    }
    let currentTagState = this.state.taskDetailTags.slice(0)
    let updatedTagState = [...currentTagState.slice(0, currentTagState.indexOf(tag)),... currentTagState.slice(currentTagState.indexOf(tag)+1)]
    // console.log(updatedTagState)
    this.setState({
      taskDetailTags: updatedTagState
    })
  }




  taskEditSubmit = (event) => {
    event.preventDefault()
    let relPages = this.state.taskDetailPages
    let relTags = this.state.taskDetailTags
    let relUsers = this.state.taskDetailUsers

    this.props.editTask(this.state.taskDetail, relPages, relTags, relUsers)
    let relTask = this.props.teamTasks.find((t) => t.task._id["$oid"] == this.state.taskDetail._id["$oid"])

    this.setState({
      taskDetail: null
    }, this.listFilteredTasks)
  }


  // edit task end

  // delete task

  abstractedDelete = (t) => {
    this.props.deleteTask(this.state.taskDetail.task)
  }

  deleteAndReload = (event) => {
    event.preventDefault()
    let selectedTask = Object.assign({}, this.state.taskDetail)
    this.props.deleteTask(selectedTask)
    this.setState({
      taskDetail: null,
    })
  }


  //

  // task listed in detail section end

    //BEGIN notification style

  alertVisibility = () => {
    if (!this.props.isRenderingAlert) {
      return {display:"none"}
    } else {
      return {display:"flex"}
    }
  }

    //END notification style

  render() {
    console.log(this.props.isRenderingAlert)
    return (
      <div>
        <div className="header"><h1>Team Tasks</h1></div>
        <div className="team-task-container">
          <div className="section-1">
            <SidebarContainer sortSelection={this.state.sortSelection} sortListener = {this.sortListener} textFilterListener={this.textFilterListener} priorityFilterListener = {this.PriorityFilterListener} statusFilterListener = {this.statusFilterListener} pageFilterListener = {this.pageFilterListener} userFilterListener = {this.userFilterListener} tagFilterListener = {this.tagFilterListener} selectTaskDetail={this.selectTaskDetail}/>
          </div>



          <div className="section-2">
            {this.renderTasks()}
          </div>



          <div className="section-3">

            <div className="task-detail-notification-container" style={this.alertVisibility()} onClick={this.props.closeAlert}>

                <TaskAlert alertType={this.props.alertType}/>

            </div>

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
    teamPages: state.teamPages.allPages,
    teamTags: state.teamTags.allTags,
    teamTasks: state.teamTasks.allTasks,
    teamUsers: state.teamUsers.allUsers,
    isRenderingAlert: state.teamTasks.isRenderingAlert,
    alertType: state.teamTasks.alertType
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamTaskContainer));
