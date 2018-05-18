import { combineReducers } from 'redux';
import { CURRENT_USER, ALL_TASKS, ADD_NEW_TASK } from '../actions'

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
      console.log("in reducer")
      console.log("in reducer — allTasks", allTasksState)
      console.log("in reducer — pre ")
      state = Object.assign({},
        state,
        {
          allTasks: [...allTasksState, action.newTask]
        })
      console.log("in reducer — finished updating state", state)

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user, teamTasks
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;
