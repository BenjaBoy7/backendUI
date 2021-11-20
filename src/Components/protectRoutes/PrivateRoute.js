import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import { connect } from 'react-redux';


export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route {...rest} render={props => {
    console.log("rest",rest)
      if (! rest.loggedIn) {
          return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      }

      if (roles && roles.indexOf(rest.user.role) === -1) {
          return <Redirect to={{ pathname: '/dashboard'}} />
      }
      return <Component {...props} />
  }} />
)

  const mapStateToProps = state =>{
    return {
       loggedIn:state.auth.loggedIn,
       user:state.auth.user
    }
  }
  
  export default connect(mapStateToProps)(PrivateRoute)