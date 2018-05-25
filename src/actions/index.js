export const CURRENT_USER = 'CURRENT_USER'
export const ALL_TASKS = 'ALL_TASKS'
export const ADD_NEW_TASK = 'ADD_NEW_TASK'
export const EDIT_TASK = 'EDIT_TASK'


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
  console.log("in action — createNewTask, taskInfo argument", taskInfo)
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

export function editTask(selectedTask) {
  let url = "http://localhost:3000/api/v1/tasks/" + selectedTask._id["$oid"]
  console.log("in action")
  console.log("in action, testing url", url)
  console.log("in action, testing selectedTask", selectedTask)
  console.log("in action, testing selectedTask.title", selectedTask.title)
  console.log("in action, testing selectedTask.description", selectedTask.description)

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
          status_summary: selectedTask.status_summary

        })
      })
      .then(response => response.json())
      .then(json => dispatch({
        type: EDIT_TASK,
        editedTask: json
      }))
  }
}
