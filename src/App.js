import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.css';
import './stylesheets/sidebar.css'
import './stylesheets/taskdetail.css'
import './stylesheets/tasknotifications.css'
import './stylesheets/tasklist.css'
import './web-fonts.css'
import './hk_grotesk/stylesheet.css'
import './Haboro_Fonts/Haboro_Fonts.css'
import './Franklin_Gothic_FS_Book-Webfont/Webfonts/stylesheet.css'
import registerServiceWorker from './registerServiceWorker';

import * as Actions from './actions'

import Home from './components/Home'
import LogIn from './components/LogIn'
import LogOut from './components/LogOut'
import NavBar from './components/NavBar'
import WithAuth from './wrappers/WithAuth'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      auth: {
        currentUser: null,
        loggingIn: false
      },
    }
  }

  setLoggedInUser = (user) => {
     localStorage.setItem('token', user.token)
     this.setState({
       auth: {
         currentUser: {
           username: user.username,
           id: user.id
         },
         loggingIn: true
       }
     })

     this.props.loadCurrentUser(this.state.auth.currentUser)
     this.props.loadAllTasks()

   }



   logOutUser = () => {
     localStorage.removeItem('token')
     this.setState({
       auth: { currentUser: null, loggingIn: false }
     })
     window.location = '/login'
}

  componentDidMount() {

    const token=localStorage.getItem('token')
    if (token) {
      return fetch("https://capstack-tasks-api.herokuapp.com/api/v1/current_user", {
        headers:  {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          Authorization: token
        }})
        .then(response => response.json())
        .then(user => {
          if(user) {
            this.setState({
              auth: {
                currentUser: user,
                loggingIn: true
              },

            }); this.props.loadCurrentUser(this.state.auth.currentUser)
            this.props.loadAllTasks()
            this.props.loadAllPages()
            this.props.loadAllTags()
            this.props.loadAllUsers()
          }

          else {
            this.setState({
              auth: {
                currentUser: null,
                loggingIn: false
              }
            })
          }
        })
      }
  }




// <Router>
//   <div className="App">
//
//
//     <Route exact path="/login" render={() => <LogIn setLoggedInUser={this.setLoggedInUser} /> } />
//
//     <Route exact path="/logout" render={() => <LogOut /> } />
//
//     <Route exact path="/" render={() => <Home user={this.props.user} /> } />
//
//   </div>
// </Router>
//



  render() {


// if (this.state.auth.loggingIn) {
    return (

      <Router>
              <div className="App">

                <Route exact path="/login" render={() => <LogIn setLoggedInUser={this.setLoggedInUser} auth={this.state.auth} /> } />


                <NavBar auth={this.state.auth} loggedIn = {this.state.auth.loggingIn} logOutUser = {this.logOutUser} />


                <Route exact path="/" render={() => <Home loggedIn = {this.state.auth.loggingIn} auth = {this.state.auth}/> } />

              </div>

      </Router>

    )
  }

  // if (!this.state.auth.loggingIn) {
  //
  //   return (
  //     <Router>
  //       <div>
  //       <Route exact path="/login" render={() => <LogIn setLoggedInUser={this.setLoggedInUser} auth={this.state.auth} /> } />
  //
  //     </div>
  //
  //     </Router>
  //   )
  // }
  // }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
