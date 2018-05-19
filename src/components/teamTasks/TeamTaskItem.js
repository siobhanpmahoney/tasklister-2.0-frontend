import React from 'react'
import TaskStatusDetail from './taskStatusDetails/TaskStatusDetail'
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'


class TeamTaskItem extends React.Component {

  componentDidMount() {
    this.props
  }

  relPages = () => {
    if (this.props.taskPages.length > 0) {
      return this.props.taskPages.map((p) => {
        return p.path
      }).join(", ")
    } else {
      return <i>No relevant pages listed</i>
    }
  }

  taskStatusDetails = () => {

    if (this.props.t.status_details != undefined && this.props.t.status_details.length > 0) {
      this.props.t.status_details.map((d) => {
        return d
      })
    }

  }

  render() {
    if (!this.props.t) {
      return <div>Loading..</div>
    }
    return (
      <div className="taskData">
        <div className="table-row">
        <span className="task-cell cell-task">{this.props.t.title}</span>
        <span className="task-cell cell-team-member">{this.props.taskUsers.map((u) => {
          return <span>{u.username}</span>
        })}</span>
      <span className="task-cell cell-tags">
        {this.props.taskTags.map((t) => {
          return <span>{t.title}</span>
        })}
      </span>
      <span className="task-cell cell-relevant-pages">{this.relPages()}</span>
      <span className="task-cell cell-status-summary"> {this.props.t.status_summary} </span>
      </div>
      <div className="taskDetails">
        <div className="taskDescription">
          <b>Description:</b>{this.props.t.description}
        </div>


      </div>

      </div>
    )
  }
}

export default TeamTaskItem;
