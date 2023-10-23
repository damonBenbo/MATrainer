import React from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const RemoveListItem = ({ itemId, onRemove }) => {
    const handleRemove = async () => {
        try {
          const token = localStorage.getItem('token');
          const username = localStorage.getItem('username');
      
          if (!token) {
            console.error('User not authenticated');
            return;
          }
      
          // Make an HTTP DELETE request to the server to remove the item
          const response = await axios.delete(`http://localhost:5000/api/${username}/list-items/${itemId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
      
          if (response.status === 200) {
            // If the item was successfully removed on the server, call the onRemove function to update the UI
            onRemove(itemId);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

  return (
    <div>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};

export default RemoveListItem;