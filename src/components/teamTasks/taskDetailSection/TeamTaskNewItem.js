
import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../../actions'
import { withRouter } from 'react-router';

class TeamTaskNewItem extends React.Component {
  render() {
    return (
      <div className="newTaskForm">
        <form>
          <h3><label>New Task</label></h3>

          <div><label><span className="field-name">Task Title:</span>
            <textarea name="title" onChange={this.props.newTaskFormListener} />
          </label></div>

        <div><label><span className="field-name">Task Description:</span>
            <textarea name="description" onChange={this.props.newTaskFormListener} />
          </label></div>

        <div>
            <label>
              <span className="field-name">Priority:</span>
              <input type="checkbox" name="priority" onChange={this.props.newTaskFormListener} />
          </label>
        </div>

        <div>
          <label>
            <div className="field-name">Relevant Paths
            </div>
            <textarea name="newTaskPages" className="path" onChange={this.props.newTaskRefListener} />
          </label>
        </div>

        <div>
          <label>
            <div className="field-name">Assign Team</div>

              <textarea name="newTaskUsers" className="username" onChange={this.props.newTaskRefListener}  />

          </label>
        </div>

        <div>
          <label>
            <div className="field-name">Tags

            </div>
              <textarea name="newTaskTags" className="title" onChange={this.props.newTaskRefListener} />
          </label>
        </div>

          <div><label>Status Summary:
            <select name='status_summary' value={this.props.newTask.status_summary} onChange={this.props.newTaskFormListener}>
              <option value=''>Select...</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </label></div>

        <button onClick={this.props.newTaskSubmit}>Submit</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamTaskNewItem));
