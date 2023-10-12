import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useHistory } from 'react-router-dom'; // Import useHistory

import Login from './Login';

const ToolbarComponent = ({ userLoggedIn, username }) => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory(); // Get the history object

  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true);
    setIsLoginFormVisible(false); // Hide the login form
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    history.push('/'); // Redirect to the home page
  };

  const handleLoginClick = () => {
    setIsLoginFormVisible(!isLoginFormVisible); // Toggle the visibility
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#e63946' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MATrainer
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {!isLoggedIn && ( // Show the sign-up button when the user is not logged in
          <Button color="inherit" component={Link} to="/sign-up">
            Sign-up
          </Button>
        )}
        {isLoggedIn ? (
          // Render username and logout button for authenticated users
          <>
            <Link to={`/user/${username}`} style={{ textDecoration: 'none' }}>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                Welcome, {username}
              </Typography>
            </Link>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          // Render the login button when the user is not logged in
          <Button color="inherit" onClick={handleLoginClick}>
            Login
          </Button>
        )}
      </Toolbar>
      {isLoginFormVisible && !isLoggedIn && ( // Only show the login form if not logged in
        <Login onLogin={handleLoginSuccess} />
      )}
    </AppBar>
  );
};

export default ToolbarComponent;