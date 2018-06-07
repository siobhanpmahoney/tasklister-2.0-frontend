import React from 'react'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import { withRouter, Redirect } from 'react-router';

class LogIn extends React.Component {
  static propTypes = {
    setLoggedInUser: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props)

    this.state = {
      credentials: {
        username: "",
        password: ""
      }
    }
  }

  formListener = (event) => {
    let value = event.target.value
    let name = event.target.name
    let currentCredState = Object.assign({},this.state.credentials)
    currentCredState[name] = value
    this.setState({
      credentials: currentCredState
    })
    console.log(this.state)
  }

  loginUser = (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    return fetch("https://capstack-tasks-api.herokuapp.com/api/v1/login", {
      method: 'POST',
      headers:  {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: token
      },
      body: JSON.stringify(this.state.credentials)
    })
    .then(response => response.json())
    .then(res => {
      console.log(res)
      if (res.error) {
        alert(res.error)
      }
      else {
      this.props.setLoggedInUser(res)
      window.location = '/'
    }
    })
  }






  render() {
    if (!this.props.auth.loggingIn) {
    return (
      <div className="login">

        <h3>Sign In</h3>
      <form>
      <input type="text" name="username" onChange={this.formListener} />
      <input type="password" name="password" onChange={this.formListener} />
      <button className="buttons" onClick={this.loginUser} style={{backgroundColor:"#21d8f8", color:"white", padding:"0.5em", fontFamily: "Avenir", borderRadius:"6px", borderStyle:"none"}}>Login</button>
      </form>

      </div>
    )
  } else if (this.props.auth.loggingIn) {
    return (
      <Redirect to="/" />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));
