import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory


const jwt = require('jsonwebtoken');
const { secret } = require('capstone_2/MATrainer/backend/secrets');

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory(); // Get the history object

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const { token } = data;
        localStorage.setItem('token', token);
      
        // Decode the token to get user information
        const decodedToken = jwt.decode(token);
        if (decodedToken) {
          const { username } = decodedToken;
          setUserLoggedIn({ user: { username } });
        }
      
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
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default Login;