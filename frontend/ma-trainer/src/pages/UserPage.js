import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const UserPage = ({ match, userLoggedIn }) => {
  const username = match.params.username;
  const [hasUserList, setHasUserList] = useState(false);
  const [showCreateListForm, setShowCreateListForm] = useState(false);
  const [listName, setListName] = useState('');
  const [listDescription, setListDescription] = useState('');

  const history = useHistory(); // Add this line to use the history object

  // Check if the logged-in user matches the user page
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username'); // Use a different variable name
  
        if (!token) {
          // No token found, the user is not logged in
          history.push('/login'); // Redirect to the login page
        } else {
          console.log("Im inside else 1");
          // Token found, send a request to the server to verify it
          const response = await fetch(`http://localhost:5000/api/user/${storedUsername}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (response.status === 200) {
            // User is authorized to access the page
            // You can fetch additional user data here if needed
          } else {
            // User is not authorized to access the page
            console.log(response);
            history.push('/'); // Redirect to the home page or show an error message
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    fetchData();
  }, [username, history]);

  const handleAddUserList = () => {
    // When the button is clicked, show the form
    setShowCreateListForm(true);
  };

  const handleCreateListSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have the user_id available in your front end state or context
    const user_id = userLoggedIn.user.id;

    // Prepare data to send to the server
    const data = {
      user_id: user_id,
      list_name: listName,
      list_description: listDescription,
    };

    try {
      // Send a POST request to your server to create the user's list
      const response = await fetch('/api/createUserList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // The list was created successfully
        setHasUserList(true);
        setShowCreateListForm(false);
      } else {
        // Handle errors if the request fails
        console.error('Failed to create user list');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>Welcome, {username}!</p>

      {hasUserList ? (
        <p>You have a user list.</p>
      ) : (
        <p>You don't have a user list yet.</p>
      )}

      <button onClick={handleAddUserList}>Create User List</button>

      {showCreateListForm && (
        <form onSubmit={handleCreateListSubmit}>
          <div>
            <label>List Name:</label>
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>List Description:</label>
            <input
              type="text"
              value={listDescription}
              onChange={(e) => setListDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create List</button>
        </form>
      )}
    </div>
  );
};

export default UserPage;