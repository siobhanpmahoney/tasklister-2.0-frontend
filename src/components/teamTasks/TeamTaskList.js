import React from 'react'
import TeamTaskItem from './TeamTaskItem'
import { withRouter } from 'react-router';


class TeamTaskList extends React.Component {

  tableHeaders = () => {
    return ["Task", "Team Member", "Tags", "Relevant Paths", "Status Summary"]
  }

  render() {
    return (
      <div className="table-container">
        <div className="table-header-row">
          <span className="header-cell cell-task">Task</span>
          <span className="header-cell cell-team-member">Team Members</span>
          <span className="header-cell cell-tags">Tags</span>
          <span className="header-cell cell-relevant-pages">Relevant Paths</span>
          <span className="header-cell cell-status-summary">Status Summary</span>


        </div>

        {this.props.tasks.map((t) => {
          return<TeamTaskItem key={t.task._id["$oid"]} t={t.task} taskPages={t.pages} taskUsers = {t.users} taskTags = {t.tags}/>
        })}
      </div>
    )
  }
}

export default withRouter(TeamTaskList)
