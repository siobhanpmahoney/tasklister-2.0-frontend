import React from 'react'
import TaskSortContainer from './TaskSortContainer'
import TaskFilterContainer from './TaskFilterContainer'

class SidebarContainer extends React.Component {

  selectTaskDetail = (event) => {
    this.props.selectTaskDetail(event, "new")
  }

  render() {
    return (
      <div className="sidebar-container">
        <div className="sidebar-section">
          <div className="sidebar-create-new-task">
            <span className="sidebar-heading">Create New Task</span>
            <button onClick={this.selectTaskDetail}> + </button>
          </div>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-heading">Sort</span>
            <TaskSortContainer sortListener={this.props.sortListener}/>
        </div>


        <div className="sidebar-section">
          <details>
            <summary><span className="sidebar-heading">
            Filter
          </span></summary>
        <TaskFilterContainer textFilterListener={this.props.textFilterListener} priorityFilterListener = {this.props.PriorityFilterListener} statusFilterListener = {this.props.statusFilterListener} pageFilterListener = {this.props.pageFilterListener} userFilterListener = {this.props.userFilterListener} tagFilterListener = {this.props.tagFilterListener}/>
          </details>
        </div>

      </div>
    )
  }
}

export default SidebarContainer
