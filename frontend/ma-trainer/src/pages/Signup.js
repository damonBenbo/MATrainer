import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { withRouter } from 'react-router-dom'; // Import withRouter

function Signup({ history }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation (you should add more)
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      // Send the registration request without confirmPassword
      const { confirmPassword, ...registrationData } = formData;
      const response = await axios.post('http://localhost:5000/api/sign-up', registrationData);

      if (response.status === 201) {
        // Successful registration, now let's log in the user
        const loginResponse = await axios.post('http://localhost:5000/api/login', {
          username: formData.username,
          password: formData.password,
        });

        if (loginResponse.status === 200) {
          // Successful login
          // You can store the user's token or other relevant information in local storage or state
          localStorage.setItem('token', loginResponse.data.token);
          localStorage.setItem('username', formData.username);
          // Redirect to the home page or wherever you want the user to go after login
          history.push('/login'); // Redirect to login page
        }
      }
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An error occurred');
      }
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>}
      <div className="signUpForm">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Signup); // Wrap your component with withRouter
