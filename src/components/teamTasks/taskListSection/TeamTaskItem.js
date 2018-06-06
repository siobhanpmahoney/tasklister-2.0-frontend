import React from 'react'
// import { withRouter } from 'react-router';


class TeamTaskItem extends React.Component {

  componentDidMount() {
    this.props
  }

  renderTaskDetails = (event) => {
    this.props.selectTaskDetail(event, this.props.t, this.props.pages, this.props.tags, this.props.users)
  }

  renderTagList = () => {
    if (!!this.props.tags) {
      return this.props.tags.map((tag) => {
        if (!!tag.title) {
          return <span className="ind-tag">
            <i className="material-icons" key = {tag.title} style={{fontSize: "12px", top:"3px"}}>label</i> {tag.title}</span>
          }
        })
      } else {
        return <span className="ind-tag no-display"></span>
      }
    }
    formattedSavedDate = (dateArg) => {
      let dateSaved = new Date(dateArg)
      let timeSaved =  new Date(dateArg).toLocaleTimeString()
      console.log(timeSaved)
      return `${dateSaved.toLocaleDateString()} at ${timeSaved}`
    }

  render() {
    if (!this.props.t) {
      return <div>Loading..</div>
    }

    return (
      <div className="task-list-item" onClick={this.renderTaskDetails}>

        <div className="task-list-item-title">
          {this.props.t.title}
        </div>


        {this.renderTagList()}
          <br /><span className="list-updated">Updated {this.formattedSavedDate(this.props.t.updated_at)}</span>



      </div>



    )
  }
}

export default TeamTaskItem;
