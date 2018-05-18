import React from 'react'

class TaskStatusDetail extends React.Component {
  render() {
    return (
      <div>{this.props.taskStatusDetail.description}</div>
    )
  }
}

export default TaskStatusDetail
