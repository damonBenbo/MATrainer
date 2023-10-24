import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import RemoveList from '../components/RemoveList';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import AddItemComponent from '../components/AddItemComponent';

const UserPage = ({ match }) => {
  const username = match.params.username;
  const [hasUserList, setHasUserList] = useState(false);
  const [showCreateListForm, setShowCreateListForm] = useState(false);
  const [listName, setListName] = useState('');
  const [listDescription, setListDescription] = useState('');
  const [userData, setUserData] = useState(null);
  const [userLists, setUserLists] = useState([]);
  const [showAddItemForm, setShowAddItemForm] = useState(false);

  const history = useHistory();

  const fetchUserLists = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('User token not available');
        return;
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
    } catch (error) {
      console.error('Error fetching user lists:', error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

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
  
  const handleToggleAddItemForm = () => {
    setShowAddItemForm(!showAddItemForm);
  };

  const handleListRemove = (removedListId) => {
    setUserLists(userLists.filter((list) => list.id !== removedListId));
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
        // Get the newly created list from the response data
        const newList = response.data;

        // Update the userLists state with the newly created list
        setUserLists([...userLists, newList]);

        setHasUserList(true);
        setShowCreateListForm(false);
        fetchUserLists();
      } else {
        console.error('Failed to create user list');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="flex-start" style={{ marginTop: '1rem' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h4" align="center" gutterBottom>
            User Profile
          </Typography>
          {userData && (
            <Typography variant="h6" align="center">Welcome, {username}!</Typography>
          )}

          {userLists.length > 0 ? (
            <div>
              <Typography variant="subtitle1" align="center">
                You have {userLists.length} user lists:
              </Typography>
              <ul>
                {userLists.map((list) => (
                  <li key={list.id} style={{ marginBottom: '1rem' }}>
                    <Link to={`/${username}/list/${list.id}`}>
                      {list.list_name}
                    </Link>{' '}
                    - {list.list_description}
                    <RemoveList listId={list.id} onRemove={handleListRemove} />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Typography variant="body1" align="center">
              You don't have any user lists yet.
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUserList}
            style={{ marginTop: '10px', display: 'block', margin: '0 auto' }}
          >
            Create User List
          </Button>

          <Button
            variant="contained"
            color={showAddItemForm ? 'secondary' : 'primary'}
            onClick={handleToggleAddItemForm}
            style={{ marginTop: '10px', display: 'block', margin: '0 auto' }}
          >
            {showAddItemForm ? 'Hide Add Item Form' : 'Add Item'}
          </Button>

          {showCreateListForm && (
            <form onSubmit={handleCreateListSubmit}>
              <div>
                <TextField
                  label="List Name"
                  type="text"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  required
                  fullWidth
                />
              </div>
              <div style={{ marginTop: '1rem' }}>
                <TextField
                  label="List Description"
                  type="text"
                  value={listDescription}
                  onChange={(e) => setListDescription(e.target.value)}
                  required
                  fullWidth
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '10px', display: 'block', margin: '0 auto' }}
              >
                Create List
              </Button>
            </form>
          )}

          {showAddItemForm && <AddItemComponent itemType="item" />}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserPage;
