import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Login from './Login';

const ToolbarComponent = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

  const handleLoginClick = () => {
    setIsLoginFormVisible(!isLoginFormVisible); // Toggle the visibility
  };

  const handleLogin = (credentials) => {
    // Handle login logic, e.g., send a request to the server
    // If successful, you can update the UI or redirect the user
    console.log('Login with credentials:', credentials);
    // Hide the login form
    setIsLoginFormVisible(false);
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
        <Button color="inherit" component={Link} to="/sign-up">
          Sign-up
        </Button>
        <Button color="inherit" onClick={handleLoginClick}>
          Login
        </Button>
        {/* Add more buttons for navigation or actions */}
      </Toolbar>
      {isLoginFormVisible && <Login onLogin={handleLogin} />}
    </AppBar>
  );
};

export default ToolbarComponent;