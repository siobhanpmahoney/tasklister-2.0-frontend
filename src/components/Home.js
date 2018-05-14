import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom'
import WithAuth from '../wrappers/WithAuth'

class Home extends React.Component {

componentDidMount() {
  if (!this.props.auth.loggingIn) {
     <Redirect to = '/login' />
  } else {
    console.log(this.props)
  }
}

render() {
  console.log("in Home, rendering props", this.props)
  if (this.props.user == null && !!this.props.auth.loggingIn) {
    return <div>loading..</div>
  }
  if (!!this.props.auth.loggingIn) {
    return (
      <div>Welcome {this.props.user.username}</div>
    )
  }




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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth(Home)));
