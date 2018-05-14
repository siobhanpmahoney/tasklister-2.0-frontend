import React from 'react'

class TeamTaskItem extends React.Component {

  relPages = () => {
    if (this.props.taskPages.length > 0) {
      return this.props.taskPages.map((p) => {
        return p.path
      }).join(", ")
    } else {
      return <i>No relevant pages listed</i>
    }
  }

  render() {
    if (this.props.taskTags != [] && this.props.taskTags[0] && this.props.taskTags[0]["title"]) {
      console.log("in TeamTaskItem, props:", this.props.taskTags[0].title)
    }


    return (
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
    )
  }
}

export default TeamTaskItem
