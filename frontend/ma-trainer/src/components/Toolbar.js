import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ToolbarComponent = ({ userLoggedIn }) => {
  // Retrieve username from local storage
  const username = localStorage.getItem('username');

  return (
    <AppBar position="static" sx={{ backgroundColor: '#e63946' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MATrainer
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {userLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to={`/user/${username}`}>
              Welcome, {username}
            </Button>
            <Button color="inherit" component={Link} to="/logout">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/sign-up">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default ToolbarComponent;