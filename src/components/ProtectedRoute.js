import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../store/entities/auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    
  const auth = useSelector(state => isAuthenticated(state));
  return (
    <Route 
        {...rest} 
        render={
            props => {
                if (auth) {
                return <Component {...rest} {...props} />
                } else {
                return <Redirect to='/login'/>
                }
            }
        } 
    />
  )
}

export default ProtectedRoute;