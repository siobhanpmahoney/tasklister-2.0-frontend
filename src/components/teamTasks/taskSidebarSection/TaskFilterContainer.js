import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../../actions'
import { withRouter } from 'react-router';

class TaskFilterContainer extends React.Component {

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

  render() {
    console.log(this.tagList())
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
              <label> Open
                <input type="checkbox" name="status_summary" value="open" onChange={this.props.statusFilterListener} />
              </label><br />
              <label> Closed
                <input type="checkbox" name="status_summary" value="closed" onChange={this.props.statusFilterListener} />
              </label>
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
    teamTasks: state.teamTasks.allTasks
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskFilterContainer));
