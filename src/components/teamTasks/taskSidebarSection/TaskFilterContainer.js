import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../../actions'
import { withRouter } from 'react-router';

class TaskFilterContainer extends React.Component {

  componentDidMount() {
    if (this.props) {
      console.log(this.props)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.teamTasks != this.props.teamTasks || prevProps.teamPages != this.props.teamPages || prevProps.teamTags != this.props.teamTags) {
      this.setState({
        tasksDisplayed: this.props.teamTasks.slice(0)
      })
    }
  }

  pageList = () => {
    return this.props.teamPages.filter((page) => {
      return page.task_ids.length > 0
    })
  }

  tagList = () => {
    return this.props.teamTags.filter((tag) => {
      return tag.task_ids.length > 0
    })
  }

  userList = () => {
    return this.props.teamUsers.map((user) => {
      return user
    })
  }

  render() {
    return (
      <div className="sidebar-filter-container">
        <div className="filter-option">

          <span className="filter-option-title">
            Task Title & Description
          </span>
          <input type="text" onChange={this.props.textFilterListener} />

        </div>

        <div className="filter-option">
          <span className="filter-option-title">
            Priority
          </span> <input name = "priority" type="checkbox" />
        </div>

        <div className="filter-option">
              <span className="filter-option-title">
                Status
              </span>





            <div className="filter-status-options">
              <label> New
                <input type="checkbox" name="status_summary" value="new" onChange={this.props.statusFilterListener} />
              </label><br />
            <label> In Progress
                <input type="checkbox" name="status_summary" value="in progress" onChange={this.props.statusFilterListener} />
              </label>
              <label> Under Review
                <input type="checkbox" name="status_summary" value="under review" onChange={this.props.statusFilterListener} />
              </label><br />
              <label> Closed
                <input type="checkbox" name="status_summary" value="closed" onChange={this.props.statusFilterListener} />
              </label>
            </div>
        </div>

        <div className="filter-option">
          <span className="filter-option-title">
            Team
          </span>
          <div className="filter-user-options">
          {this.userList().map((u) => {
            return <div>
              <label>
                <input type="checkbox" key={u._id["$oid"]} value={u.username} onChange={this.props.userFilterListener} />
                </label>{u.username}<br />
              </div>
          })}
          </div>
        </div>

        <div className="filter-option">
          <span className="filter-option-title">
            Page
          </span>
          <div className="filter-path-options">
          {this.pageList().map((p) => {
            return <div>
              <label>
                <input type="checkbox" value={p.path} onChange={this.props.pageFilterListener} />
                </label>{p.path}<br />
              </div>
          })}
          </div>
        </div>

        <div className="filter-option">
          <span className="filter-option-title">
            Team
          </span>
        </div>

        <div className="filter-option">
          <span className="filter-option-title">
            Tags
          </span>
          <div className="filter-tag-options">
          {this.tagList().map((t) => {
            return <div>
              <label>
                <input type="checkbox" value={t.title} onChange={this.props.tagFilterListener} />
                </label>{t.title}<br />
              </div>
          })}
          </div>
        </div>

        <div className="filter-button">
          <button className="filter">
            Filter
          </button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskFilterContainer));
