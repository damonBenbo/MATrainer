import React, { useState, useEffect } from 'react';

const AddListItemForm = ({ listId }) => {
  const [selectedCategory, setSelectedCategory] = useState('Forms'); // Default category
  const [availableItems, setAvailableItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

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
            endpoint = `/api/forms`;
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

  const handleAddItem = async (e) => {
    e.preventDefault();

    // Send a request to add the selected item to list_items
    // ...

    // Clear the selected item after adding
    setSelectedItem('');
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
              <option key={item.id} value={item.id}>
                {item.item_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddListItemForm;