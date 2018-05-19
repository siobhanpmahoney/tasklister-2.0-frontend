import React from 'react'

class TeamTaskDetail extends React.Component {

  render() {
    console.log(this.props)
    return (
      <div className="task-detail-container">

        <div className="task-detail-header">
          <span className="task-detail-title">
            {this.props.task.title}
          </span>

          <span className="task-detail-tags">
          </span>

          <span className="task-detail-last-updated"></span>
        </div>

      </div>
    )
  }
}

export default TeamTaskDetail
