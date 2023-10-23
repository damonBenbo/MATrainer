import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';

const AddItemComponent = ({ itemType }) => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  const handleAddItemDB = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/addItem', {
        name: itemName,
        description: itemDescription,
        type: itemType, // Pass the item type (Weapon/Form/Pattern/Technique)
      });

      if (response.status === 201) {
        // Item added successfully
        // You can redirect the user to the item's page or perform any other action
        // For example, redirect to the item list page:
        window.location.href = `/${itemType}s`;
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5">Add New {itemType}</Typography>
      <TextField
        type="text"
        label={`Enter ${itemType} Name`}
        variant="outlined"
        fullWidth
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <TextField
        type="text"
        label={`Enter ${itemType} Description`}
        variant="outlined"
        fullWidth
        value={itemDescription}
        onChange={(e) => setItemDescription(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAddItemDB}>
        Add {itemType}
      </Button>
    </div>
  );
};

export default AddItemComponent;