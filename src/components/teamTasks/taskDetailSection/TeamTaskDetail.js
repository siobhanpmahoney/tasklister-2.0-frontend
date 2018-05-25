import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../../actions'
import { withRouter } from 'react-router';

class TeamTaskDetail extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      pageAddNewField: false,
      tagAddNewField: false,
      userAddNewField: false,
    }
  }

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

  formattedSavedDate = (dateArg) => {
    let dateSaved = new Date(dateArg)
    return dateSaved.toLocaleDateString()
  }



  render() {
    console.log("in task item detail", this.props)

    return (
      <div className="task-detail-container">

        <div className="task-detail-header">

          <span className="task-detail-tags">
            {this.renderTagList()}
          </span><br />

          <span className="task-detail-title">
            {this.props.taskDetail.title}
          </span>


        </div>


        <div className="task-detail-detais">
          <div className="task-detail-edit-submit-button">
            <button onClick={this.props.taskEditSubmit}>Save</button>
          </div>
          <div className="task-detail-details-dashboard">
            <textarea className="task-detail-description" name="description" value={this.props.taskDetail.description} type="contentEditable" onChange={this.props.taskEditListener} />


            <div className="task-detail-date-updated">
              <span className="field-name">
                Updated:
              </span>
              <textarea name="updated_at" value={this.formattedSavedDate(this.props.taskDetail.updated_at)} type="contentEditable" readOnly />
            </div>
            <div className="task-detail-date-created">
              <span className="field-name">Created: </span>{this.formattedSavedDate(this.props.taskDetail.created_at)}
            </div>

            <div className="task-detail-users">
              <span className="field-name">Responsible Team Members: </span>
              <ul>
                {this.props.users.map((u) => {
                  return <textarea className="task-detail-description"  value={u.username} type="contentEditable" onChange={this.props.taskEditListener} />
                })}
              </ul>
            </div>

            <div className="task-detail-relevant-pages">
              <span className="field-name">Relevant Paths: </span>
              <ul>
                {this.props.pages.map((p)=> {
                  return <li>{p.path}</li>
                })}
              </ul>
            </div>
            <div className="task-detail-github-branch">
              <span className="field-name">GitHub Branch: </span> {this.props.taskDetail.github_branch}
            </div>
            <div className="task-detail-status-summary">
              <span className="field-name">Current Status: </span>
                <select name='status_summary'  value={this.props.taskDetail.status_summary} onChange={this.props.taskEditListener}>
                  <option value=''>Select...</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
            </div>
          </div>

          <div className="task-detail-details-status-updates">

          </div>

        </div>



      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user.currentUser,
    userTasks: state.user.userTasks,
    teamTasks: state.teamTasks.allTasks
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamTaskDetail));
