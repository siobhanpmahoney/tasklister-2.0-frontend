import React from 'react'

class TaskAlert extends React.Component {
  render() {
    const type = this.props.alertType.split("_")[1]
    const alertClass = 'task-alert-' + type
    return (
      <div className={alertClass}>{this.props.alertType}</div>
    )
  }
}

export default TaskAlert
