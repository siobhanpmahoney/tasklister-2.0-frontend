export const CURRENT_USER = 'CURRENT_USER'
export const ALL_TASKS = 'ALL_TASKS'


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
    .then(response => response.response.json())
    .then(json => dispatch({
      type: ALL_TASKS,
      tasks: json
    }))
  }
}
