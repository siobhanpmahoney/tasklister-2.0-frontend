import { combineReducers } from 'redux';
import { CURRENT_USER, ALL_TASKS } from '../actions'

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
      console.log("in reducer", state)
      return state;


    default:
      return state;
  }
}

const teamTasks = (state = {allTasks: null }, action) => {
  switch(action.type) {
    case ALL_TASKS:
      state = Object.assign({},
      state,
      {
        allTasks: action.tasks,
      }
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
