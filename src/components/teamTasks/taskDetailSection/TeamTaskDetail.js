import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../../actions'
import { withRouter } from 'react-router';

class TeamTaskDetail extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      taskRendered: null,
      taskRenderedPages: [],
      taskRenderedTags: [],
      taskRenderedUsers: []
    }
  }

  componentDidMount() {
    console.log(this.props)
  }



  renderTagList = () => {
    if (!!this.props.taskDetailTags) {
      return this.props.taskDetailTags.map((tag) => {
        if (!!tag.title) {
          return <span className="ind-tag">
            <i className="material-icons" key = {tag.title} style={{fontSize: "12px", top:"3px"}}>label</i> {tag.title}</span>
          }
        })
      } else {
        return <span className="ind-tag no-display">No Tags</span>
      }
    }

    formattedSavedDate = (dateArg) => {
      let dateSaved = new Date(dateArg)
      let timeSaved =  new Date(dateArg).toLocaleTimeString()
      console.log(timeSaved)
      return `${dateSaved.toLocaleDateString()} at ${timeSaved}`
    }

    taskEditAddPageField = () => {
      let currentPageState = this.state.taskRenderedPages.slice(0)
      currentPageState = [...currentPageState, { path: '' }]
      this.setState({
        taskRenderedPages: currentPageState
      })
    }

    priorityCheck = () => {
      return this.props.taskDetail.priority
    }

    userCheck = (u) => {
      return !!this.props.taskDetailUsers.find((user) => {
        return user.username === u.username
      })
    }




    render() {

      return (
        <div className="task-detail-container">

          <div className="task-detail-header">
          <div className="task-detail-buttons">
            <span className="task-detail-edit-submit-button">
              <button className="edit-submit" onClick={this.props.taskEditSubmit}>Save</button>
            </span>

            <span className="task-detail-delete-button">
              <button className="edit-delete" onClick={this.props.deleteAndReload}>Delete</button>
            </span>
            </div>

            <div className="task-detail-title">
                {this.props.taskDetail.title}
              </div>

            <div className="task-detail-tags">
              {this.renderTagList()}
            </div>



          </div>

          <div className="task-detail-detais">


            <div className="task-detail-details-dashboard">


              <textarea className="task-detail-description" name="description" value={this.props.taskDetail.description} type="contentEditable" contentEditable={true} onChange={this.props.taskEditListener} />


              <div className="task-detail-section date-updated">
                <span className="field-name">
                  Updated:
                </span>
                <span className="updated_at" name="updated_at">{this.formattedSavedDate(this.props.taskDetail.updated_at)}</span>
              </div>

              <div className="task-detail-section date-created">
                <span className="field-name">Created: </span>

              <span className="created_at">{this.formattedSavedDate(this.props.taskDetail.created_at)}</span>
                </div>

                <div className="task-detail-section priority">
                  <span className="field-name">
                    Priority
                  </span>
                    <input type="checkbox" name="priority" checked={this.priorityCheck()} onChange={this.props.taskEditListener} />

                </div>

                <div className="task-detail-section users">
                  <span className="field-name">
                    Responsible Team Members:
                  </span>

                  <div className="users-edit">

                  {this.props.teamUsers.map((u) => {
                    return <label>{u.username}
                      <input type="checkbox" checked ={this.userCheck(u)} key={u._id["$oid"]} name="taskDetailUsers" className="username" value={u.username}   onChange={this.props.taskEditUserPageListener} /><br />
                    </label>
                  })}
                  </div>

              </div>

              <div className="task-detail-section relevant-pages">
                <span className="field-name">Relevant Paths: </span>
                <button className="add ref" onClick={this.props.taskEditAddPageField}>
                  +
                </button>
                <div className="pages-edit">
                <ul>
                  {this.props.taskDetailPages.map((p, idx) => {
                    return !!p.path ? (
                      <li key={p.path} name="taskDetailTags" className="path">
                        {p.path} <button onClick={()=>this.props.editTaskDeletePageReload(this.props.taskDetail, p)}> x </button>
                      </li>
                    ) : (
                      <textarea key={idx} name="taskDetailPages" className="path"  type="contentEditable" onChange={this.props.taskEditAddlRefListener} />
                    )

                })}

                </ul>
              </div>
              </div>

              <div className="task-detail-section relevant-tags">
                <span className="field-name">Tags: </span>
                <button className="add ref" onClick={this.props.taskEditAddTagField}>
                  +
                </button>
                <div className="tags-edit">
                <ul>
                  {this.props.taskDetailTags.map((t, idx) => {
                    return !!t.title ? (
                      <li key={t.title} name="taskDetailTags" className="title">
                        {t.title} <button onClick={()=>this.props.editTaskDeleteTagReload(this.props.taskDetail, t)}> x </button>
                      </li>
                    ) : (
                      <textarea key={idx} name="taskDetailTags" className="title"  type="contentEditable" onChange={this.props.taskEditAddlRefListener} />
                    )

                })}

                </ul>
                </div>
              </div>

            <div className="task-detail-section github-branch">
              <span className="field-name">
                GitHub Branch:
              </span>
              {this.props.taskDetail.github_branch}
            </div>

            <div className="task-detail-section status-summary">
              <span className="field-name">
                Current Status:
              </span>
              <div className="status-summary-edit">
                <select name='status_summary'  value={this.props.taskDetail.status_summary} onChange={this.props.taskEditListener}>
                <option value=''>Select...</option>
                <option value="new">New</option>
                <option value="in progress">In Progress</option>
                <option value="under review">Under Review</option>
                <option value="closed">Closed</option>
              </select>
            </div>
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
    teamPages: state.teamPages.allPages,
    teamTags: state.teamTags.allTags,
    teamTasks: state.teamTasks.allTasks,
    teamUsers: state.teamUsers.allUsers,
    isRenderingAlert: state.teamTasks.isRenderingAlert,
    alertType: state.teamTasks.alertType
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamTaskDetail));
