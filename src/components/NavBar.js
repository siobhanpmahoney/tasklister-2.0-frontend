import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import { withRouter } from 'react-router';
import { NavLink, Redirect } from 'react-router-dom';
import WithAuth from '../wrappers/WithAuth'


class NavBar extends React.Component {

  renderHTML = () => {
    if (!!this.props.user) {
      console.log("in Nav", this.props.user)
      return (

        <span>
          <span>

            <NavLink to="/" exact>Home</NavLink>

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
