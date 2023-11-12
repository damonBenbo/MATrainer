import React, { useState, useEffect } from 'react';
import AddListItemForm from '../components/AddListItemForm';

const ListPage = ({ match }) => {
  const listId = match.params.listId;
  const [listData, setListData] = useState(null);

  useEffect(() => {
    // Fetch list data based on the listId
    async function fetchListData() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Handle the case where the user is not authenticated
          console.error('User not authenticated');
          return;
        }

        // Fetch the list data using the listId parameter
        const response = await fetch(`https://matrainer.onrender.com/api/:username/list/${listId}`, {
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
  }, [listId]);

  return (
    <div>
      <h2>List Details</h2>
      {listData ? (
        <div>
          <p>List Name: {listData.list_name}</p>
          <p>List Description: {listData.list_description}</p>
          {/* Add more list details here */}
          <AddListItemForm listId={listId} />
        </div>
      ) : (
        <p>Loading list data...</p>
      )}
    </div>
  );
};

export default ListPage;