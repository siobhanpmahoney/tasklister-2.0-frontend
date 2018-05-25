import React from 'react'

class TeamTaskNewItem extends React.Component {
  render() {
    return (
      <div className="newTaskForm">
        <form onSubmit={this.props.newTaskSubmit}>
          <h3><label>New Task</label></h3>

          <p><label><span className="field-name">Task Title:</span>
            <input type="text" name="title" onChange={this.props.newTaskFormListener} />
          </label></p>

        <p><label><span className="field-name">Task Description:</span>
            <input type="text" name="description" onChange={this.props.newTaskFormListener} />
          </label></p>

          <p>
            <label>
              <span className="field-name">Priority:</span>
              <input type="checkbox" name="priority" onChange={this.props.newTaskFormListener} />
          </label>
        </p>

        <p>
          <label>
            <div className="field-name">Relevant Paths <button style={this.props.newTaskDisplayAddIcon("newTaskPages")}>Add</button></div>
              <input type="text" name="newTaskPages" onChange={this.props.newTaskRefListener} />
          </label>
        </p>

        <p>
          <label>
            <div className="field-name">Assign Team</div>
              <input type="text" name="newTaskUsers" onChange={this.props.newTaskRefListener}  />
          </label>
        </p>

        <p>
          <label>
            <div className="field-name">Tags</div>
              <input type="text" name="newTaskTags" onChange={this.props.newTaskRefListener} />
          </label>
        </p>

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
