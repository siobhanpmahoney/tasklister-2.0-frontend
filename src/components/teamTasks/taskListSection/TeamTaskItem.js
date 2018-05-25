import React from 'react'
// import { withRouter } from 'react-router';


class TeamTaskItem extends React.Component {

  componentDidMount() {
    this.props
  }

  renderTaskDetails = (event) => {
    this.props.selectTaskDetail(event, this.props.t, this.props.pages, this.props.tags, this.props.users)
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



      </div>



    )
  }
}

export default TeamTaskItem;
