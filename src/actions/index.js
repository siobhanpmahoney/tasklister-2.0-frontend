export const CURRENT_USER = 'CURRENT_USER'
export const ALL_TASKS = 'ALL_TASKS'
export const ADD_NEW_TASK = 'ADD_NEW_TASK'
export const EDIT_TASK = 'EDIT_TASK'
export const EDIT_TASK_DELETE_PAGE = 'EDIT_TASK_DELETE_PAGE'


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

export function createNewTask(taskInfo, taskPageInfo, taskTagInfo, taskUserInfo) {
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

export function editTask(selectedTask, selectedTaskPages, selectedTaskTags) {
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
          rel_tags: selectedTaskTags
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
  
  console.log("in action")
  console.log("action arguments")
  console.log("relTask", relTask)
  console.log("relPage", relPage)
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
