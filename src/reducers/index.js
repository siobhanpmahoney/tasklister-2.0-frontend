import { combineReducers } from 'redux';
import { CURRENT_USER, ALL_TASKS, ADD_NEW_TASK, EDIT_TASK } from '../actions'

const user = (state = {currentUser: null, userTasks: [] }, action) => {
  switch(action.type) {
    case CURRENT_USER:
    state = Object.assign({},
      state,
      {
        currentUser: action.currentUser.user,
        userTasks: action.currentUser.tasks
      }
    );
    return state;


    default:
    return state;
  }
}

const teamTasks = (state = {allTasks: [] }, action) => {
  switch(action.type) {
    case ALL_TASKS:
    return Object.assign({},
      state,
      {
        allTasks: action.tasks,
      }
    );

    case ADD_NEW_TASK:
      let allTasksState = state.allTasks.slice(0)
      state = Object.assign({},
        state,
        {
          allTasks: [...allTasksState, action.newTask]
        });
        return state;


    case EDIT_TASK:
      let updatedTask = state.allTasks.find((t) => {
        return t.task._id["$oid"] == action.editedTask.task._id["$oid"]
      })

      let currentTasksState = state.allTasks.slice(0)

      const savedTasks = [
        ...currentTasksState.slice(0, currentTasksState.indexOf(updatedTask)),
        {task: action.editedTask.task, tags: action.editedTask.tags, users: action.editedTask.users, pages: action.editedTask.pages},
        ...currentTasksState.slice(currentTasksState.indexOf(updatedTask) + 1)
      ];
      state = Object.assign({},
        state,
          {
            allTasks: savedTasks
          },
        );

        return state;



      default:
        return state;
    }
  }

  const rootReducer = combineReducers({
    user, teamTasks
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
  });

  export default rootReducer;
