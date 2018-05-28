import { combineReducers } from 'redux';
import { CURRENT_USER, ALL_TASKS, ADD_NEW_TASK, EDIT_TASK, EDIT_TASK_DELETE_PAGE, EDIT_TASK_DELETE_TAG, ALL_PAGES } from '../actions'

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

const teamPages = (state = {allPages: [] }, action) => {
  switch(action.type) {
    case ALL_PAGES:
      state = Object.assign({},
        state,
        {
          allPages: action.pages
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

      case EDIT_TASK_DELETE_PAGE:
        // relevant task
        let rT = state.allTasks.find((t) => t.task._id["$oid"] == action.taskid)
        // up-to-date page list
        let updatedPageList = rT.pages.filter((p) => p._id["$oid"] != action.pageid)
        let allTasksCopy = state.allTasks.slice(0)
        const savedTasks1 = [
          ...allTasksCopy.slice(0, allTasksCopy.indexOf(rT)),
          {task: rT.task, tags: rT.tags, users: rT.users, pages: updatedPageList},
          ...allTasksCopy.slice(allTasksCopy.indexOf(rT) + 1)
        ];
        state = Object.assign({},
          state,
          {
            allTasks: savedTasks1
          },
        );
        return state;

      case EDIT_TASK_DELETE_TAG:
          // relevant task
          let relTask = state.allTasks.find((t) => t.task._id["$oid"] == action.taskid)
          // up-to-date tag list
          let updatedTagList = relTask.tags.filter((p) => p._id["$oid"] != action.tagid)
          let taskStateCopy = state.allTasks.slice(0)
          const savedTasks2 = [
            ...taskStateCopy.slice(0, taskStateCopy.indexOf(relTask)),
            {task: relTask.task, pages: relTask.pages, users: relTask.users, tags: updatedTagList},
            ...taskStateCopy.slice(taskStateCopy.indexOf(relTask) + 1)
          ];
          state = Object.assign({},
            state,
            {
              allTasks: savedTasks2
            },
          );
          return state;


      default:
        return state;
    }
  }

  const rootReducer = combineReducers({
    user, teamPages, teamTasks
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
  });

  export default rootReducer;
