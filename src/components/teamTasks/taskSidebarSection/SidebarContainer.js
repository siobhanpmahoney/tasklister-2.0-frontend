import React from 'react'
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
          <details>
            <summary><span className="sidebar-heading">
            Filter
          </span></summary>
        <TaskFilterContainer textFilterListener={this.props.textFilterListener}/>
          </details>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-heading">Sort</span>
        </div>
      </div>
    )
  }
}

export default SidebarContainer
