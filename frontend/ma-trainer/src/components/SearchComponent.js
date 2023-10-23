import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, List, ListItem, ListItemText, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [showItems, setShowItems] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');

  // Function to fetch items from the API based on the search term
  const fetchItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/search/${searchTerm}`
      );

      if (response.status === 200) {
        
      }
    } catch (error) {
      console.error('Error fetching relevant items:', error);
    }
  };

  // Function to handle changes in the input field
  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Fetch items based on the new search term
    fetchItems();
  };

  // Function to handle item selection or addition
  const handleItemClick = (item) => {
    // Redirect to the item's page if it exists
    window.location.href = `/item/${item.id}`;
  };

  // Function to handle adding a new item
  const handleAddItem = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/addItem', {
        name: newItemName,
        description: newItemDescription,
      });

      if (response.status === 201) {
        // Get the newly added item from the response data
        const newItem = response.data;

        // Redirect to the newly added item's page
        window.location.href = `/item/${newItem.id}`;

        // Clear the new item fields
        setNewItemName('');
        setNewItemDescription('');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div>
      <TextField
        type="text"
        id="search-input"
        label="Search for form/weapon/pattern/technique"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleInputChange}
      />
      {showItems && filteredItems.length > 0 && (
        <List>
          {filteredItems.map((item) => (
            <ListItem key={item.id} button onClick={() => handleItemClick(item)}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
          <ListItem>
            <TextField
              type="text"
              label="New Item Name"
              variant="outlined"
              fullWidth
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <TextField
              type="text"
              label="New Item Description"
              variant="outlined"
              fullWidth
              value={newItemDescription}
              onChange={(e) => setNewItemDescription(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleAddItem}>
              Add Item
            </Button>
          </ListItem>
        </List>
      )}
    </div>
  );
};

export default SearchComponent;