import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRouteForLogged = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            : <Component {...props} />
    )} />
)

export default PrivateRouteForLogged