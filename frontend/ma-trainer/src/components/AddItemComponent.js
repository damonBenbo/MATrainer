import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddItemComponent = () => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [category, setCategory] = useState('Weapon'); // Default category is Weapon

  const handleAddItemDB = async () => {
    try {
      // Convert category to lowercase
      const lowercaseCategory = category.toLowerCase();

      const response = await axios.post(`https://matrainer.onrender.com/api/${lowercaseCategory}s`, {
        name: itemName,
        description: itemDescription,
      });

      if (response.status === 201) {
        // Item added successfully
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5">Add New Item</Typography>
      <FormControl fullWidth variant="outlined" style={{ marginBottom: '16px' }}>
        <InputLabel>Select Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Select Category"
        >
          <MenuItem value="Weapon">Weapon</MenuItem>
          <MenuItem value="Form">Form</MenuItem>
          <MenuItem value="Technique">Technique</MenuItem>
          <MenuItem value="Pattern">Pattern</MenuItem>
        </Select>
      </FormControl>
      <TextField
        type="text"
        label={`Enter ${category} Name`}
        variant="outlined"
        fullWidth
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <TextField
        type="text"
        label={`Enter ${category} Description`}
        variant="outlined"
        fullWidth
        value={itemDescription}
        onChange={(e) => setItemDescription(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAddItemDB}>
        Add {category}
      </Button>
    </div>
  );
};

export default AddItemComponent;
