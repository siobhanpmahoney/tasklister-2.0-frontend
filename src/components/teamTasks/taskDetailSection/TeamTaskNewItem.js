import React from 'react'

class TeamTaskNewItem extends React.Component {
  render() {
    return (
      <div className="newTaskForm">
        <form>
          <h3><label>New Task</label></h3>

          <div><label><span className="field-name">Task Title:</span>
            <input type="text" name="title" onChange={this.props.newTaskFormListener} />
          </label></div>

        <div><label><span className="field-name">Task Description:</span>
            <input type="text" name="description" onChange={this.props.newTaskFormListener} />
          </label></div>

        <div>
            <label>
              <span className="field-name">Priority:</span>
              <input type="checkbox" name="priority" onChange={this.props.newTaskFormListener} />
          </label>
        </div>

        <div>
          <label>
            <div className="field-name">Relevant Paths
              <button className="add ref" style={this.props.newTaskDisplayAddIcon("newTaskPages")} onClick={()=>this.props.newTaskDisplayAddlFields("newTaskPages")}>
                <i className="material-icons add-ref">add_circle_outline</i>
              </button></div>
              <input type="text" name="newTaskPages" onChange={this.props.newTaskRefListener} />
          </label>
        </div>

        <div>
          <label>
            <div className="field-name">Assign Team
              <button className="add ref" style={this.props.newTaskDisplayAddIcon("newTaskUsers")} onClick={()=>this.props.newTaskDisplayAddlFields("newTaskUsers")}>
                <i className="material-icons add-ref">add_circle_outline</i></button></div>
              <input type="text" name="newTaskUsers" onChange={this.props.newTaskRefListener}  />

          </label>
        </div>

        <div>
          <label>
            <div className="field-name">Tags
              <button className="add ref" style={this.props.newTaskDisplayAddIcon("newTaskTags")} onClick={()=>this.props.newTaskDisplayAddlFields("newTaskTags")}>
                <i className="material-icons add-ref">add_circle_outline</i>
              </button>
            </div>
              <input type="text" name="newTaskTags" onChange={this.props.newTaskRefListener} />
          </label>
        </div>

          <div><label>Status Summary:
            <select name='status_summary' value={this.props.newTask.status_summary} onChange={this.props.newTaskFormListener}>
              <option value=''>Select...</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </label></div>

        <button onClick={this.props.newTaskSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}

export default TeamTaskNewItem
