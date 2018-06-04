import { combineReducers } from 'redux';
import { CURRENT_USER, ALL_TASKS, ADD_NEW_TASK, EDIT_TASK, EDIT_TASK_DELETE_PAGE, EDIT_TASK_DELETE_TAG, EDIT_TASK_DELETE_USER, DELETE_TASK, ALL_PAGES, ALL_TAGS, ALL_USERS, CLOSE_ALERT } from '../actions'

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

const teamTags= (state = {allTags: [] }, action) => {
  switch(action.type) {
    case ALL_TAGS:
    // console.log(action.tags)
    state = Object.assign({},
      state,
      {
        allTags: action.tags
      }
    );
    // console.log(state)
    return state;

    default:
    return state;
  }
}

const teamUsers = (state = {allUsers: [] }, action) => {
  switch(action.type) {
    case ALL_USERS:
    // console.log(action.tags)
    state = Object.assign({},
      state,
      {
        allUsers: action.users
      }
    );
    // console.log(state)
    return state;

    default:
    return state;
  }
}

const teamTasks = (state = {allTasks: [], isRenderingAlert: false, alertType: null }, action) => {
  switch(action.type) {
    case ALL_TASKS:
      return Object.assign({},
        state,
        {
          allTasks: action.tasks,
        }
      );

    case ADD_NEW_TASK:
      console.log("in REDUCER")
      console.log(action.newTask)
      let allTasksState = state.allTasks.slice(0)
      console.log(allTasksState)
      state = Object.assign({},
        state,
        {
          allTasks: [...allTasksState, action.newTask],
          isRenderingAlert: true,
          alertType: "task_created"
        });
        console.log("after state update", state)
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
            allTasks: savedTasks,
            isRenderingAlert: true,
            alertType: "task_updated",
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
            allTasks: savedTasks1,
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


      case EDIT_TASK_DELETE_USER:
        // relevant task
        let relTask2 = state.allTasks.find((t) => t.task._id["$oid"] == action.taskid)
        // up-to-date tag list
        let updatedUserList = relTask2.users.filter((p) => p._id["$oid"] != action.userid)
        let taskStateCopyU = state.allTasks.slice(0)
        const savedTasks3 = [
          ...taskStateCopyU.slice(0, taskStateCopyU.indexOf(relTask2)),
          {task: relTask2.task, pages: relTask2.pages, users: relTask2.users, users: updatedUserList},
          ...taskStateCopyU.slice(taskStateCopyU.indexOf(relTask2) + 1)
        ];
        state = Object.assign({},
          state,
          {
            allTasks: savedTasks3
          },
        );
      return state;

      case DELETE_TASK:
        console.log(action.updatedTaskList)
        state = Object.assign({},
          state,
          {
            allTasks: action.updatedTaskList,
            isRenderingAlert: true,
            alertType: "task_deleted",
          }
        );
      return state;

      case CLOSE_ALERT:
        state = Object.assign({},
          state,
          {
            isRenderingAlert: false,
            alertType: null
          }
        )


      default:
        return state;
    }
  }

  const rootReducer = combineReducers({
    user, teamPages, teamTags, teamTasks, teamUsers
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
  });

  export default rootReducer;
