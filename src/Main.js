// import React from 'react'
// import Home from './components/Home'
// import LogIn from './components/LogIn'
// import authorize from './AuthHOC'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux';
// import * as Actions from './actions'
// import { Redirect, Switch, Route, withRouter } from 'react-router-dom'
//
// class Main extends React.Component {
//   render() {
//     const Home = authorize(Home)
//
//     return(
//       <div>
//         <Switch>
//           <Route exact path='/login' component={LogIn}/>
//           <Route exact path='/' component={Home} />
//           <Redirect to='/login'/>
//         </Switch>
//       </div>
//     )
//   }
// }
//
// function mapStateToProps(state, props) {
//   return {
//     user: state.user.user,
//
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(Actions, dispatch);
// }
//
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
