import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

const UserPage = ({ match }) => {
  const username = match.params.username;
  const [hasUserList, setHasUserList] = useState(false);
  const [showCreateListForm, setShowCreateListForm] = useState(false);
  const [listName, setListName] = useState('');
  const [listDescription, setListDescription] = useState('');
  const [userData, setUserData] = useState(null);
  const [userLists, setUserLists] = useState([]);

  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          history.push('/login');
        } else {
          // Fetch user data
          const userDataResponse = await fetch(`http://localhost:5000/api/user/${username}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (userDataResponse.status === 200) {
            const userData = await userDataResponse.json();
            setUserData(userData);
          } else {
            history.push('/');
          }

          // Fetch the user's lists
          const userListsResponse = await fetch(`http://localhost:5000/api/user/${username}/lists`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (userListsResponse.status === 200) {
            const userListsData = await userListsResponse.json();
            setUserLists(userListsData);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, [username, history]);

  const handleAddUserList = () => {
    setShowCreateListForm(true);
  };

  const handleCreateListSubmit = async (e) => {
    e.preventDefault();

    if (!userData) {
      console.error('User data not available');
      return;
    }

    const data = {
      list_name: listName,
      list_description: listDescription,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/createUserList', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 201) {
        setHasUserList(true);
        setShowCreateListForm(false);
      } else {
        console.error('Failed to create user list');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      {userData && (
        <p>Welcome, {username}!</p>
      )}

{userLists.length > 0 ? (
      <div>
        <p>You have {userLists.length} user lists:</p>
        <ul>
          {userLists.map((list) => (
            <li key={list.id}>
              {/* Use Link to navigate to the list page */}
              <Link to={`/list/${list.id}`}>{list.list_name}</Link> - {list.list_description}
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <p>You don't have any user lists yet.</p>
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