
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

      <div className="new-task-relevant-pages">
        <span className="field-name">
          Relevant Paths:
        </span>
        <button className="add ref" onClick={this.props.newTaskAddPageField}>
          +
        </button>
        <ul>
          {this.props.newTaskPages.map((p, idx) => {
            return !!p.path ? (
              <li key={p.path} name="newTaskPages" className="path">
                {p.path} <button onClick={()=>this.props.newTaskDeletePageReload(this.props.newTask, p)}> x </button>
            </li>
          ) : (
            <textarea key={idx} name="newTaskPages" className="path"  type="contentEditable" onChange={this.props.newTaskAddlRefListener} />
          )

        })}

      </ul>
    </div>

    <div>
      <label>
        <span className="field-name">
          Assign Team
        </span>

        <button className="add ref" onClick={this.props.newTaskAddUserField}>
          +
        </button>
        <ul>
          {this.props.newTaskUsers.map((u, idx) => {
            return !!u.username ? (
              <li key={u.username} name="newTaskUsers" className="username">
                {u.username} <button onClick={()=>this.props.newTaskDeleteUserReload(this.props.newTask, u)}> x </button>
            </li>
          ) : (
            <textarea key={idx} name="newTaskUsers" className="username"  type="contentEditable" onChange={this.props.newTaskAddlRefListener} />
          )

        })}

      </ul>

    </label>
  </div>

  <div>
    <label>
      <span className="field-name">
        Tags
      </span>
      <button className="add ref" onClick={this.props.newTaskAddTagField}>
        +
      </button>
      <ul>
        {this.props.newTaskTags.map((t, idx) => {
          return t.title !== "" ? (
            <li key={t.title} name="newTaskTags" className="title">
              {t.title} <button onClick={()=>this.props.newTaskDeleteTagReload(this.props.newTask, t)}> x </button>
          </li>
        ) : (
          <textarea key={idx} name="newTaskTags" className="title"  type="contentEditable" onChange={this.props.newTaskAddlRefListener} />
        )

      })}

    </ul>
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
