import React from 'react'

class TeamTaskDetail extends React.Component {
  render() {
    return (
      <div>{this.props.task.title}</div>
    )
  }
}

export default TeamTaskDetail
