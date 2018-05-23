import React from 'react'

class SidebarContainer extends React.Component {

  selectTaskDetail = (event) => {
    this.props.selectTaskDetail(event, "new")
  }

  render() {
    return (
      <div className="sidebar-container">
        <div className="sidebar-create-new-task">
          <button onClick={this.selectTaskDetail}>Create New Task</button>
        </div>
      </div>
    )
  }
}

export default SidebarContainer
