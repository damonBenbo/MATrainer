import React, { useState, useEffect } from 'react';
import AddListItemForm from '../components/AddListItemForm';
import EditListItem from '../components/EditListItem';
import RemoveListItem from '../components/RemoveListItem';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


const ListDetail = ({ match }) => {
  const listId = match.params.listId;
  const [listData, setListData] = useState(null);
  const [listItems, setListItems] = useState([]);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);


      // Fetch list items based on the listId
      const fetchListItems = async () => {
        try {
          const token = localStorage.getItem('token');
          const username = localStorage.getItem('username');
  
          if (!token) {
            // Handle the case where the user is not authenticated
            console.error('User not authenticated');
            return;
          }
  
          // Fetch the list items using the listId parameter
          const response = await fetch(`http://localhost:5000/api/${username}/list-items/${listId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (response.status === 200) {
            const listItemsData = await response.json();
            setListItems(listItemsData);
          } else {
            // Handle the case where the list items are not found or other errors
            console.error('Error fetching list items');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }

  useEffect(() => {
    // Fetch list data based on the listId
    async function fetchListData() {
      try {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (!token) {
          // Handle the case where the user is not authenticated
          console.error('User not authenticated');
          return;
        }

        // Fetch the list data using the listId parameter
        const response = await fetch(`http://localhost:5000/api/${username}/list/${listId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const listData = await response.json();
          setListData(listData);
        } else {
          // Handle the case where the list is not found or other errors
          console.error('Error fetching list data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchListData();
    fetchListItems();
  }, [listId]);

  const handleToggleAddItemForm = () => {
    // Toggle the state to show or hide the AddListItemForm component
    setShowAddItemForm((prevState) => !prevState);
  };

  const handleEditItem = (itemId) => {
    // Set the editingItemId state to the ID of the item being edited
    setEditingItemId(itemId);
  };

  const handleSaveEditedItem = async (editedItem) => {
    try {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');

      if (!token) {
        // Handle the case where the user is not authenticated
        console.error('User not authenticated');
        return;
      }

      // Perform the update request to save the edited item data on the server
      const response = await fetch(
        `http://localhost:5000/api/${username}/list-items/${editedItem.id}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedItem),
        }
      );

      if (response.status === 200) {
        // Update the state with the edited item
        setEditingItemId(null); // Clear the editing state

        // Fetch updated list items here if needed
        fetchListItems();
      } else {
        // Handle the case where the update fails
        console.error('Error updating item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onRemove = () => {
    fetchListItems();
  }

  const handleCancelEdit = () => {
    // Clear the editingItemId state to exit editing mode
    setEditingItemId(null);
  };


  return (
    <div>
      <Typography variant="h4" gutterBottom align="center">
        List Details
      </Typography>
      {listData ? (
        <Paper elevation={3} style={{ padding: '20px', margin: '10px 0' }}>
          <Typography variant="h6" style={{ marginBottom: '10px' }} align="center">
            List Name: {listData.list_name}
          </Typography>
          <Typography variant="body1" align="center">
            List Description: {listData.list_description}
          </Typography>
        </Paper>
      ) : (
        <p>Loading list data...</p>
      )}

      {listItems.length > 0 ? (
        <div>
          <Typography variant="h5" style={{ margin: '20px 0' }} align="center">
            List Items
          </Typography>
          <List>
          {listItems.map((item) => (
  <div key={item.id} style={{ display: 'flex', alignItems: 'center'}}>
    <ListItem style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
      {editingItemId === item.id ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <EditListItem
            item={item}
            onSave={handleSaveEditedItem}
            onCancel={handleCancelEdit}
          />
        </div>
      ) : (
        <>
          <ListItemText style={{ marginLeft: '10px', flex: '1' }}
            primary={item.item_name}
            secondary={item.item_type}
          />
          {item.notes && (
            <Typography variant="body2" style={{ marginBottom: '5px' }} align="center">
              Notes: {item.notes}
            </Typography>
          )}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEditItem(item.id)}
            style={{ marginRight: '10px' }}
          >
            Edit
          </Button>
          <RemoveListItem itemId={item.id} onRemove={onRemove} />
        </>
      )}
    </ListItem>
    {listItems.indexOf(item) < listItems.length - 1 && (
      <Divider />
    )}
  </div>
))}
          </List>
        </div>
      ) : (
        <p>No list items found.</p>
      )}
      <Button
        variant="contained"
        color={showAddItemForm ? 'secondary' : 'primary'}
        onClick={handleToggleAddItemForm}
        style={{ marginTop: '20px', display: 'block', margin: '0 auto' }}
      >
        {showAddItemForm ? 'Hide Form' : 'Add Items'}
      </Button>
      {showAddItemForm && <AddListItemForm listId={listId} />}
    </div>
  );
};


export default ListDetail;