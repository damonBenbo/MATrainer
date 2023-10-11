import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import Login from './Login';

const ToolbarComponent = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(''); // Store the user's username

  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true);
    setUsername(username); // Set the username when the user logs in
    setIsLoginFormVisible(false); // Hide the login form
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername(''); // Clear the username when the user logs out
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
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Welcome, {username}
            </Typography>
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