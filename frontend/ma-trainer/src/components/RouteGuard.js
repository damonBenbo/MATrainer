// RouteGuard.js protects routes to only allow authorized users

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Define a route guard component that takes a user's status and the requested username
const RouteGuard = ({ userLoggedIn, username, component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => {
        console.log('userLoggedIn:', userLoggedIn);
        console.log('username:', username);
  
        if (userLoggedIn && userLoggedIn.user.username === username) {
          return <Component {...props} />;
        } else {
          console.log('Redirecting to home page');
          return <Redirect to="/" />;
        }
      }}
    />
  );

export default RouteGuard;