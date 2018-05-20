import React from 'react'

class TeamTaskDetail extends React.Component {

  renderTagList = () => {
    if (!!this.props.tags) {
      return this.props.tags.map((tag) => {
        return <span className="ind-tag">
          <i className="material-icons" style={{fontSize: "12px", top:"3px"}}>label</i> {tag.title}</span>
      })
    } else {
      return <span className="ind-tag no-display">No Tags</span>
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="task-detail-container">

        <div className="task-detail-header">

          <span className="task-detail-title">
            {this.props.task.title}
          </span>

          <span className="task-detail-tags">
            {this.renderTagList()}
          </span>

          <span className="task-detail-last-updated"></span>
        </div>


        <div className="task-detail-detais">

        </div>



      </div>
    )
  }
}

export default TeamTaskDetail
