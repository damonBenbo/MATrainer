import React, { useState, useEffect } from 'react';
import AddListItemForm from '../components/AddListItemForm';
import EditListItem from '../components/EditListItem';

const ListDetail = ({ match }) => {
  const listId = match.params.listId;
  const [listData, setListData] = useState(null);
  const [listItems, setListItems] = useState([]);
  const [showAddItemForm, setShowAddItemForm] = useState(false);

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

    // Fetch list items based on the listId
    async function fetchListItems() {
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

    fetchListData();
    fetchListItems();
  }, [listId]);

  const handleToggleAddItemForm = () => {
    // Toggle the state to show or hide the AddListItemForm component
    setShowAddItemForm((prevState) => !prevState);
  };

  return (
    <div>
      <h2>List Details</h2>
      {listData ? (
        <div>
          <p>List Name: {listData.list_name}</p>
          <p>List Description: {listData.list_description}</p>
          {/* Add more list details here */}
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
                {item.item_name}
                {item.notes && <p>Notes: {item.notes}</p>}
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
      {showAddItemForm && <AddListItemForm listId={listId} />} {/* Pass listId prop */}
    </div>
  );
};

export default ListDetail;
