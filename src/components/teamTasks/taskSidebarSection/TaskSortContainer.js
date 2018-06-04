import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../../actions'
import { withRouter } from 'react-router';

class TaskSortContainer extends React.Component {
  render() {
    return (
      <div className="sidebar-sort-container">
        <form>
          <select value={this.props.sortSelection} onChange={this.props.sortListener}>
            <option value=''>Select..</option>
            <option value="title">Task Title</option>
            <option value="updated">Last Updated</option>
            <option value="status_summary">Status</option>
          </select>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user.currentUser,
    userTasks: state.user.userTasks,
    teamPages: state.teamPages.allPages,
    teamTags: state.teamTags.allTags,
    teamTasks: state.teamTasks.allTasks,
    teamUsers: state.teamUsers.allUsers
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskSortContainer))
