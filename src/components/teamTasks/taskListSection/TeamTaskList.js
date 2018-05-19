import React from 'react'
import TeamTaskItem from './TeamTaskItem'
import { withRouter } from 'react-router';


class TeamTaskList extends React.Component {

  tableHeaders = () => {
    return ["Task", "Team Member", "Tags", "Relevant Paths", "Status Summary"]
  }

  render() {
    console.log(this.props.tasks)
    return (
      <div className="table-container">

        {this.props.tasks.map((t) => {
          return<TeamTaskItem t={t.task} taskPages={t.pages} taskUsers = {t.users} taskTags = {t.tags} selectTaskDetail={this.props.selectTaskDetail}/>
        })}
      </div>
    )
  }
}

export default TeamTaskList
