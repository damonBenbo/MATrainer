import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';

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
        const response = await fetch(`https://matrainer.onrender.com/${endpoint}`, {
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
        notes: notes,
      };

      // Send a POST request to add the item to list_items
      const response = await fetch(`https://matrainer.onrender.com/api/${username}/list-items`, {
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
        window.location.reload();
      } else {
        console.error('Failed to add item to the list');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>Add Item to List</Typography>
      <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FormControl style={{ marginBottom: '10px' }}>
          <label>Select Category:</label>
          <Select value={selectedCategory} onChange={handleCategoryChange}>
            <MenuItem value="Forms">Forms</MenuItem>
            <MenuItem value="Patterns">Patterns</MenuItem>
            <MenuItem value="Weapons">Weapons</MenuItem>
            <MenuItem value="Techniques">Techniques</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ marginBottom: '10px' }}>
          <label>Select Item:</label>
          <Select value={selectedItem} onChange={handleItemChange}>
            <MenuItem value="">-- Select an item --</MenuItem>
            {availableItems.map((item) => (
              <MenuItem key={item.id} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ marginBottom: '10px' }}>
          <label>Notes:</label>
          <TextareaAutosize
            rowsMin={4}
            value={notes}
            onChange={handleNotesChange}
            placeholder="Add notes here"
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Item
        </Button>
      </form>
    </Paper>
  );
};

export default AddListItemForm;
