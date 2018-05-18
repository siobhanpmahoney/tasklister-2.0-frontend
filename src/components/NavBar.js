import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
// import WithAuth from '../wrappers/WithAuth'


class NavBar extends React.Component {

  renderHTML = () => {
    if (this.props.auth.loggingIn) {
      return (

        <span className="header-nav">
          <span className="header-logo">CapTasks</span>
          <span className="header-links">

            <span><NavLink to="/" exact>Home</NavLink></span>

            <span onClick={this.props.logOutUser}> Log Out </span>

            </span>
          </span>
        )

      } else {
        return (
          <span>
          <NavLink to="/login" exact>Log In</NavLink>
        </span>
        )
      }
    }

  render() {

    return (
      <div className="navbar">
        <div>{this.renderHTML()}</div>
        <div>TaskLister</div>

      </div>)
    }
}



function mapStateToProps(state, props) {
  return {
    user: state.user.currentUser,
    tasks: state.user.userTasks
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
