import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './components/Login'; // Import the Login component
import Logout from './components/Logout';
import ToolbarComponent from './components/Toolbar';
import UserPage from './pages/UserPage'; // Import UserPage

function App() {

  return (
    <Router>
      <ToolbarComponent />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sign-up" component={Signup} />
        <Route
          path="/login"
          component={Login}
        />
        <Route path="/logout" component={Logout} />
        <Route
          path={`/user/:username`}
          component={UserPage}
        />
      </Switch>
    </Router>
  );
}

export default App;