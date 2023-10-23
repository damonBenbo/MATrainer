import React, { useState, useEffect } from 'react';
import AddListItemForm from '../components/AddListItemForm';
import EditListItem from '../components/EditListItem';

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

  const handleCancelEdit = () => {
    // Clear the editingItemId state to exit editing mode
    setEditingItemId(null);
  };



  return (
    <div>
      <h2>List Details</h2>
      {listData ? (
        <div>
          <p>List Name: {listData.list_name}</p>
          <p>List Description: {listData.list_description}</p>
        </div>
      ) : (
        <p>Loading list data...</p>
      )}

      {listItems.length > 0 ? (
        <div>
          <h3>List Items</h3>
          <ul>
            {listItems.map((item) => (
              <li key={item.id}>
                {editingItemId === item.id ? ( // Check if editing mode is active for this item
                  <EditListItem
                    item={item}
                    onSave={handleSaveEditedItem}
                    onCancel={handleCancelEdit}
                  />
                ) : (
                  <>
                    {item.item_name} - {item.item_type}
                    {item.notes && <p>Notes: {item.notes}</p>}
                    <button onClick={() => handleEditItem(item.id)}>Edit</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No list items found.</p>
      )}
      <button onClick={handleToggleAddItemForm}>
        {showAddItemForm ? 'Hide Form' : 'Show Form'}
      </button>
      {showAddItemForm && <AddListItemForm listId={listId} />}
    </div>
  );
};

export default ListDetail;