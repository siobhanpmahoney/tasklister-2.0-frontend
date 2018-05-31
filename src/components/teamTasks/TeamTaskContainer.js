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
      tasksDisplayed: [],
      textFilter: "",
      priorityFilter: false,
      statusFilter: [],
      pageFilter: [],
      teamFilter: [],
      tagFilter: [],
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
    let allTasks = this.props.teamTasks.slice(0)
    // console.log(allTasks)
    this.setState({
      tasksDisplayed: allTasks
    })
  }



  // tasks listed in sidebar begin

  tasksToList = () => {
    let taskProps = this.props.teamTasks.slice(0)
    // if (!!this.state.textFilter) {
    //   let textInput = this.state.textFilter
    //   let filtered = current.filter((t) => {
    //     return t.task.description.includes(textInput) || t.task.title.includes(textInput)
    //   })
    //   this.setState({
    //     tasksDisplayed:filtered
    //   })
    //   }
    // if (this.state.statusFilter.length == 0) {
    //     this.setState({
    //       tasksDisplayed: current
    //     })
    //   } else if
      if (this.state.textFilter === "") {
        taskProps = taskProps
      } else {
        taskProps = taskProps.filter((t) => {
          return t.task.title.includes(this.state.textFilter) || t.task.description.includes(this.state.textFilter)
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
      this.setState({
        tasksDisplayed: taskProps
      })
  }

  renderTasks = () => {

    return <TeamTaskList tasks={this.state.tasksDisplayed.slice(0)} selectTaskDetail={this.selectTaskDetail}/>
  }

  // filter listeners begin

  textFilterListener = (event) => {
    // event.preventDefault()
    let v = event.target.value
    //
    // let current = this.state.tasksDisplayed
    //
    // let filtered = current.filter((t) => {
    //   return t.task.title.includes(v) || t.task.description.includes(v)
    // })
    this.setState({

        textFilter: v
    }, this.tasksToList)

  }



  priorityFilterListener = (event) => {
    if (event.target.checked) {
      this.setState({

          priorityFilter: true

      })
    } else {
      this.setState({
        priorityFilter: false
      })
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
    }, this.tasksToList)
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
    }, this.tasksToList)
  }

  teamFilterListener = (event) => {

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
    }, this.tasksToList)
  }



  //filter listeners end

  // tasks listed in sidebar end

  // task rendered in detail section begin

    // task render begin

  renderTaskDetailSection = () => {
    if (this.state.taskDetail === 'new') {
      return <TeamTaskNewItem newTaskFormListener={this.newTaskFormListener} newTaskDisplayAddlFields={this.newTaskDisplayAddlFields} newTaskDisplayAddIcon={this.newTaskDisplayAddIcon} newTaskStatusListener={this.newTaskStatusListener} newTaskRefListener={this.newTaskRefListener} newTaskSubmit={this.newTaskSubmit} newTask = {this.state.newTask} newTaskPages={this.state.newTaskRef.newTaskPages} newTaskTags={this.state.newTaskRef.newTaskTags} newTaskUsers={this.state.newTaskRef.newTaskUsers}/>
    } else if (!!this.state.taskDetail) {

      let selectedTask = this.props.teamTasks.find((t) => t.task._id === this.state.taskDetail._id)

      return <TeamTaskDetail editTaskDeletePageReload={this.editTaskDeletePageReload} editTaskDeleteTagReload={this.editTaskDeleteTagReload} taskEditAddlRefListener={this.taskEditAddlRefListener} taskDetail={this.state.taskDetail} taskDetailUsers={this.state.taskDetailUsers} taskDetailTags={this.state.taskDetailTags} taskEditAddPageField={this.taskEditAddPageField} taskEditAddTagField={this.taskEditAddTagField} taskDetailPages={this.state.taskDetailPages} taskEditAddUserField = {this.taskEditAddUserField}  taskEditListener={this.taskEditListener}  taskEditSubmit={this.taskEditSubmit}/>
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
      // console.log(updatedPageState)
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
      this.props.editTask(this.state.taskDetail, relPages, relTags)
      let relTask = this.props.teamTasks.find((t) => t.task._id["$oid"] == this.state.taskDetail._id["$oid"])
      // console.log(relTask)
      // debugger
      this.selectTaskDetail(event, this.state.taskDetail, relPages, relTags, this.state.taskDetailUsers)

}


    // edit task end

  // task listed in detail section end

  render() {

    return (
      <div>
        <div className="header"><h1>Team Tasks</h1></div>
<div className="team-task-container">
        <div className="section-1">
          <SidebarContainer textFilterListener={this.textFilterListener} priorityFilterListener = {this.PriorityFilterListener} statusFilterListener = {this.statusFilterListener} pageFilterListener = {this.pageFilterListener} teamFilterListener = {this.teamFilterListener} tagFilterListener = {this.tagFilterListener} selectTaskDetail={this.selectTaskDetail}/>
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
    teamPages: state.teamPages.allPages,
    teamTags: state.teamTags.allTags,
    teamTasks: state.teamTasks.allTasks
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamTaskContainer));
