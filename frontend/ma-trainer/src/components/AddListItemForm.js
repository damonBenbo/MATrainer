import React, { useState, useEffect, useContext } from 'react';

const AddListItemForm = ({ listId }) => {
  const [selectedCategory, setSelectedCategory] = useState('Forms'); // Default category
  const [availableItems, setAvailableItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [notes, setNotes] = useState(''); // Added state for notes
  
 
  useEffect(() => {
    // Fetch available items for the selected category based on listId and selectedCategory
    async function fetchAvailableItems() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Handle the case where the user is not authenticated
          console.error('User not authenticated');
          return;
        }

        // Define the endpoint based on the selected category
        let endpoint;
        switch (selectedCategory) {
          case 'Techniques':
            endpoint = `/api/techniques`;
            break;
          case 'Patterns':
            endpoint = `/api/patterns`;
            break;
          case 'Weapons':
            endpoint = `/api/weapons`;
            break;
          case 'Forms':
            endpoint = `/api/forms/names`;
            break;
          default:
            console.error('Invalid category');
            return;
        }

        // Fetch available items based on the selected category and listId
        const response = await fetch(`http://localhost:5000${endpoint}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const itemsData = await response.json();
          setAvailableItems(itemsData);
        } else {
          // Handle the case where items are not found or other errors
          console.error('Error fetching items data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchAvailableItems();
  }, [listId, selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedItem(''); // Clear selected item when changing categories
  };

  const handleItemChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
  
    if (!selectedItem || !listId) {
      console.error('Selected item or list ID is missing');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      if (!token) {
        console.error('User not authenticated');
        return;
      }
  
      // Create a data object to send to the server
      const data = {
        listId: listId,
        item_name: selectedItem,
        item_type: selectedCategory,
        notes: notes
      };
  
      // Send a POST request to add the item to list_items
      const response = await fetch(`http://localhost:5000/api/${username}/list-items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (response.status === 200) {
        // Item added successfully, you can handle the success action here
        console.log('Item added to the list');
        // Optionally, you can clear the selected item
        setSelectedItem('');
        setNotes('');
      } else {
        console.error('Failed to add item to the list');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h3>Add Item to List</h3>
      <form onSubmit={handleAddItem}>
        <div>
          <label>Select Category:</label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="Forms">Forms</option>
            <option value="Patterns">Patterns</option>
            <option value="Weapons">Weapons</option>
            <option value="Techniques">Techniques</option>
          </select>
        </div>
        <div>
          <label>Select Item:</label>
          <select value={selectedItem} onChange={handleItemChange}>
            <option value="">-- Select an item --</option>
            {availableItems.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            rows="4"
            cols="50"
            value={notes}
            onChange={handleNotesChange}
            placeholder="Add notes here"
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddListItemForm;