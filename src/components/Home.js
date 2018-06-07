import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom'
import TeamTaskContainer from './teamTasks/TeamTaskContainer'
import WithAuth from '../wrappers/WithAuth'

class Home extends React.Component {


// componentDidMount() {
//   if (!this.props.auth.loggingIn) {
//      <Redirect to = '/login' />
//   } else {
//     console.log(this.props)
//   }
// }

render() {

  if (!this.props.auth.loggingIn) {
    return (
      <Redirect to='/login' />
    )
  }

  if (this.props.user == null && this.props.auth.loggingIn) {
    return <div>loading..</div>
  }
  if (this.props.auth.loggingIn) {
    return (
      <div>
      <TeamTaskContainer setLoggedInUser={this.props.setLoggedInUser} auth={this.props.auth}/>
      </div>
    )
  }






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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth(Home)));
