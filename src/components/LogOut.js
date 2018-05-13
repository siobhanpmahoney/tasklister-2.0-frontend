import React from 'react'
import LogIn from './LogIn'
import { connect } from 'react-redux';
import * as Actions from '../actions'
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

class LogOut extends React.Component {
  render() {
    return (
      <div>
      <h3>You have been signed out.</h3>
      <h4>If you would like to return to your profile, please sign back in.</h4>
      <LogIn />
      </div>
    )
  }
}


export default withRouter(connect(LogOut));
