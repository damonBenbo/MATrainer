import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ToolbarComponent = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#e63946'}}>
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
        {/* Add more buttons for navigation or actions */}
      </Toolbar>
    </AppBar>
  );
};

export default ToolbarComponent;