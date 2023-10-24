import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const EditListItem = ({ item, onSave, onCancel }) => {
  const [editedItem, setEditedItem] = useState(item);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({
      ...editedItem,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(editedItem); // Pass the editedItem back to the parent component for saving
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <h3>Edit Item</h3>
      <TextField
        label="Item Name"
        type="text"
        name="item_name"
        value={editedItem.item_name}
        onChange={handleChange}
        fullWidth
      />
      <br />
      <TextField
        label="Item Type"
        type="text"
        name="item_type"
        value={editedItem.item_type}
        onChange={handleChange}
        fullWidth
      />
      <br />
      <label>
        Notes:
        <TextareaAutosize
          rowsmin={4}
          name="notes"
          value={editedItem.notes}
          onChange={handleChange}
          style={{ width: '100%', minHeight: '100px' }}
        ></TextareaAutosize>
      </label>
      <br />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
      <Button variant="contained" color="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default EditListItem;
