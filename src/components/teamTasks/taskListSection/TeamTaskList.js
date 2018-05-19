import React from 'react'
import TeamTaskItem from './TeamTaskItem'
import { withRouter } from 'react-router';


class TeamTaskList extends React.Component {

  tableHeaders = () => {
    return ["Task", "Team Member", "Tags", "Relevant Paths", "Status Summary"]
  }

  render() {
    console.log(this.props.tasks[0])
    return (
      <div className="task-list">

        {this.props.tasks.map((t) => {
          return<TeamTaskItem t={t.task} selectTaskDetail={this.props.selectTaskDetail}/>
        })}
      </div>
    )
  }
}

export default TeamTaskList
