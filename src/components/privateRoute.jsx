import React, { useState, useEffect } from 'react';
import {Route,Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
const PrivateRoute = ({ component: Component, ...rest }) => {
    let auth = useSelector(state => state.auth);

    return (
        <>
        { auth.isLogged ? 
        <Route {...rest} render={
          props => <Component {...rest} {...props} />
        } />
    : <Redirect path='/login'/>}
    </>
      )
}

export default PrivateRoute;