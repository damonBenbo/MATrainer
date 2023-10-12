// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './components/Login';
import ToolbarComponent from './components/Toolbar';
import UserPage from './pages/UserPage'; // Import UserPage
import RouteGuard from './components/RouteGuard'; // Import the RouteGuard

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(null); // Initialize userLoggedIn as null

  return (
    <Router>
      <ToolbarComponent userLoggedIn={userLoggedIn} username={userLoggedIn ? userLoggedIn.user.username : ''} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sign-up" component={Signup} />
        <Route
          path="/login"
          render={(props) => (
            <Login {...props} setUserLoggedIn={setUserLoggedIn} userLoggedIn={userLoggedIn} />
          )}
        />
        <RouteGuard // Use the RouteGuard to protect the UserPage route
          path={`/user/:username`}
          userLoggedIn={userLoggedIn}
          component={UserPage}
        />
      </Switch>
    </Router>
  );
}

export default App;