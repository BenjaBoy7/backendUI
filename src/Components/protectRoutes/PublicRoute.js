import React from 'react'
import {Route,Redirect} from 'react-router-dom'

import { connect } from 'react-redux';
const PublicRoute = ({ component:Component, ...rest }) =>{
   
    return (
      <Route
        {...rest}
        render={ props  =>
          !rest.loggedIn  ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname:  "/dashboard",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  const mapStateToProps = state =>{
    return {
       loggedIn:state.auth.loggedIn,
       user:state.auth.user
    }
  }
  
  export default connect(mapStateToProps)(PublicRoute)