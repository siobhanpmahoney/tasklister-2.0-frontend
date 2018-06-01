export const CURRENT_USER = 'CURRENT_USER'
export const ALL_TASKS = 'ALL_TASKS'
export const ADD_NEW_TASK = 'ADD_NEW_TASK'
export const EDIT_TASK = 'EDIT_TASK'
export const EDIT_TASK_DELETE_PAGE = 'EDIT_TASK_DELETE_PAGE'
export const EDIT_TASK_DELETE_TAG = 'EDIT_TASK_DELETE_TAG'
export const EDIT_TASK_DELETE_USER = 'EDIT_TASK_DELETE_USER'
export const ALL_PAGES = 'ALL_PAGES'
export const ALL_TAGS = 'ALL_TAGS'
export const ALL_USERS = 'ALL_USERS'


export function loadCurrentUser(user) {
  return (dispatch) => {
    fetch(`http://localhost:3000/api/v1/users/${user.username}`)
    .then(response => response.json())
    .then(json => dispatch({
      type: CURRENT_USER,
      currentUser: json
    }))
  }
}

export function loadAllTasks() {
  return (dispatch) => {
    fetch('http://localhost:3000/api/v1/tasks')
    .then(response => response.json())
    .then(json => dispatch({
      type: ALL_TASKS,
      tasks: json
    }))
  }
}

export function loadAllPages() {
  return (dispatch) => {
    fetch('http://localhost:3000/api/v1/pages')
    .then(response => response.json())
    .then(json => dispatch({
      type: ALL_PAGES,
      pages: json
    }))
  }
}

export function loadAllTags() {
  return (dispatch) => {
    fetch('http://localhost:3000/api/v1/tags')
    .then(response => response.json())
    .then(json => dispatch({
      type: ALL_TAGS,
      tags: json
    }))
  }
}

export function loadAllUsers() {
  return (dispatch) => {
    fetch('http://localhost:3000/api/v1/users')
    .then(response => response.json())
    .then(json => dispatch({
      type: ALL_USERS,
      users: json
    }))
  }
}
export function createNewTask(taskInfo, taskPageInfo, taskTagInfo, taskUserInfo) {
  console.log("Action: Create_Task")
  console.log("taskInfo", taskInfo)
  console.log("taskPageInfo", taskPageInfo)
  console.log("taskTagInfo", taskTagInfo)
  console.log("taskUserInfo", taskUserInfo)
  return (dispatch) => {
    fetch(`http://localhost:3000/api/v1/tasks`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        title: taskInfo.title,
        description: taskInfo.description,
        priority: taskInfo.priority,
        status_summary: taskInfo.status_summary,
        rel_pages: taskPageInfo,
        rel_tags: taskTagInfo,
        rel_users: taskUserInfo
      })
    })
    .then(response => response.json())

    .then(json => {
      dispatch({
      type: ADD_NEW_TASK,
      newTask: json
    })
  })
  }
}

export function editTask(selectedTask, selectedTaskPages, selectedTaskTags, selectedTaskUsers) {
  let url = "http://localhost:3000/api/v1/tasks/" + selectedTask._id["$oid"]
  return (dispatch) => {
    return fetch(url,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        },
        body: JSON.stringify({
          title: selectedTask.title,
          // github_branch: selectedTask.github_branch,
          description: selectedTask.description,
          priority: selectedTask.priority,
          status_summary: selectedTask.status_summary,
          rel_pages: selectedTaskPages,
          rel_tags: selectedTaskTags,
          rel_users: selectedTaskUsers
        })
      })
      .then(response => response.json())
      .then(json => dispatch({
        type: EDIT_TASK,
        editedTask: json
      }))
  }
}

export function editTaskDeletePage(relTask, relPage) {
  let url = "http://localhost:3000/api/v1/tasks/" + relTask._id["$oid"] + "/pages/" + relPage._id["$oid"]
  return (dispatch) => {
    return fetch(url, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(json => dispatch({
      type: EDIT_TASK_DELETE_PAGE,
      payload: json,
      taskid: relTask._id["$oid"],
      pageid: relPage._id["$oid"]
    }))
  }
}

export function editTaskDeleteTag(relTask, relTag) {
  let url = "http://localhost:3000/api/v1/tasks/" + relTask._id["$oid"] + "/tags/" + relTag._id["$oid"]
  return (dispatch) => {
    return fetch(url, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(json => dispatch({
      type: EDIT_TASK_DELETE_TAG,
      payload: json,
      taskid: relTask._id["$oid"],
      tagid: relTag._id["$oid"]
    }))
  }
}

export function editTaskDeleteUser(relTask, relUser) {
  let url = "http://localhost:3000/api/v1/tasks/" + relTask._id["$oid"] + "/users/" + relUser._id["$oid"]
  return (dispatch) => {
    return fetch(url, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(json => dispatch({
      type: EDIT_TASK_DELETE_USER,
      payload: json,
      taskid: relTask._id["$oid"],
      userid: relUser._id["$oid"]
    }))
  }
}
