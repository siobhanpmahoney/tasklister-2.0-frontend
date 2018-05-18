export const CURRENT_USER = 'CURRENT_USER'
export const ALL_TASKS = 'ALL_TASKS'
export const ADD_NEW_TASK = 'ADD_NEW_TASK'


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

export function createNewTask(taskInfo) {
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
        status_sumamry: taskInfo.status_summary,
      })
    })
    .then(response => response.json())
    .then(json => dispatch({
      type: ADD_NEW_TASK,
      newTask: json
    }))
  }
}
