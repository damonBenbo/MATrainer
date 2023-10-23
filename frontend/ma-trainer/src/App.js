// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './components/Login';
import ToolbarComponent from './components/Toolbar';
import UserPage from './pages/UserPage';
import ListDetail from './pages/ListDetail';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token'); // Use localStorage to store the token
    if (token) {
      setUserLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    setUserLoggedIn(true);
    // Save the user's authentication token in localStorage upon login
    localStorage.setItem('token', token); // Use the token passed from Login component
  };

  const handleLogout = () => {
    setUserLoggedIn(false);
    // Remove the authentication token from localStorage upon logout
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <ToolbarComponent
        userLoggedIn={userLoggedIn}
        onLogout={handleLogout} // Pass the handleLogout function to the toolbar
      />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sign-up" component={Signup} />
        <Route path="/login">
          <Login onLogin={handleLogin} /> {/* Pass the handleLogin function */}
        </Route>
        <Route
          path={`/user/:username`}
          component={UserPage}
        />
        <Route path="/:username/list/:listId" component={ListDetail} />
      </Switch>
    </Router>
  );
}

export default App;
