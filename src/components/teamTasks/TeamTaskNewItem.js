import React from 'react'

class TeamTaskNewItem extends React.Component {
  render() {
    return (
      <div className="newTaskForm">
        <form onSubmit={this.props.newTaskSubmit}>
          <h3><label>New Task</label></h3>

          <p><label> Task Title:
            <input type="text" name="title" onChange={this.props.newTaskFormListener} />
          </label></p>

          <p><label> Task Description:
            <input type="text" name="description" onChange={this.props.newTaskFormListener} />
          </label></p>

          <p><label>Priority:
            <input type="checkbox" name="priority" onChange={this.props.newTaskFormListener} />
          </label></p>

          <p><label>Status Summary:
            <select name='status_summary' value={this.props.newTask.status_summary} onChange={this.props.newTaskFormListener}>
              <option value=''>Select...</option>
              <option value="open" onChange={this.props.newTaskFormListener}>Open</option>
              <option value="closed" onChange={this.props.newTaskFormListener}>Closed</option>
            </select>
          </label></p>

        <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default TeamTaskNewItem
