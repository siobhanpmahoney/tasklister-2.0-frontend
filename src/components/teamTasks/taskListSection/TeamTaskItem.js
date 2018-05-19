import React from 'react'
import { withRouter } from 'react-router';


class TeamTaskItem extends React.Component {

  componentDidMount() {
    this.props
  }

  renderTaskDetails = (event) => {
    this.props.selectTaskDetail(event, this.props.t)
  }

  render() {
    if (!this.props.t) {
      return <div>Loading..</div>
    }
    return (
      <div className="taskData" onClick={this.renderTaskDetails}>
        <div className="task-list-item">
        <span className="task-cell cell-task">{this.props.t.title}</span>

      <span className="task-cell cell-tags">
        {this.props.taskTags.map((t) => {
          return <span>{t.title}</span>
        })}
      </span>


      </div>


      </div>
    )
  }
}

export default TeamTaskItem;
