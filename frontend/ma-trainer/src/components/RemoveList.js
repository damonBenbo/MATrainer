import React, { useState } from 'react';
import axios from 'axios';

const RemoveList = ({ listId, onRemove }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState(null);

  const handleRemove = async () => {
    try {
      setIsRemoving(true);

      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');

      if (!token) {
        setError('User not authenticated');
        return;
      }

      // Make a DELETE request to remove the list
      const response = await axios.delete(
        `http://localhost:5000/api/${username}/lists/${listId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // If the list was successfully removed on the server, call the onRemove function to update the UI
        onRemove(listId);
      } else {
        setError('Failed to remove list');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while removing the list');
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div>
      {isRemoving ? (
        <p>Removing...</p>
      ) : (
        <>
          <button onClick={handleRemove}>Remove List</button>
          {error && <p>Error: {error}</p>}
        </>
      )}
    </div>
  );
};

export default RemoveList;