import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your server's login endpoint
      const response = await axios.post('http://localhost:5000/api/login', credentials);

      // Assuming your server responds with a token or session data upon successful login
      const token = response.data.token; // Adjust this based on your server response

      // Call the onLogin function with the token or session data
      onLogin(token);
    } catch (error) {
      // Handle login error (e.g., display an error message to the user)
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;