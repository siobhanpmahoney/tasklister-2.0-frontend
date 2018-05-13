import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink, Link, withRouter} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import registerServiceWorker from './registerServiceWorker';

import * as Actions from './actions'
import Main from './Main'

import Home from './components/Home'
import LogIn from './components/LogIn'
import LogOut from './components/LogOut'
import NavBar from './components/NavBar'

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
    console.log("in App#setLoggedInUser - argument", user)
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
      return fetch("http://localhost:3000/api/v1/current_user", {
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
    console.log("in app#render", this.state.auth.loggingIn)


if (!!this.state.auth.loggingIn) {
    return (

      <Router>
              <div className="App">

                <NavBar loggedIn = {this.state.auth.currentUser} logOutUser = {this.logOutUser} />


                <Route exact path="/" render={() => <Home loggedIn = {this.state.auth.currentUser} auth = {this.state.auth}/> } />

              </div>

      </Router>

    )
  }

  if (!this.state.auth.loggingIn) {
    console.log("in app#render, !this.state.auth.loggingIn", !this.state.auth.loggingIn)
    return (
      <Router>

        <Route exact path="/login" render={() => <LogIn setLoggedInUser={this.setLoggedInUser} auth={this.state.auth} /> } />


      </Router>
    )
  }
  }
}




function mapStateToProps(state, props) {
  return {
    user: state.user.currentUser,
    userTasks: state.user.userTasks

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
