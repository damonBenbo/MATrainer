import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://matrainer.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const { token, username } = data; // Get username from the response

        // Set both the token and username in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);

        // Call the onLogin callback with the token
        onLogin(token);

        // Redirect to the home page
        history.push('/');
      } else {
        // Handle login failure
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '300px', margin: '0 auto', marginTop: '1rem' }}>
      <Typography variant="h5">Login</Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        style={{ marginTop: '10px' }}
      >
        Log In
      </Button>
    </Paper>
  );
}

export default Login;
