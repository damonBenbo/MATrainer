import React, { useState } from 'react';

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
    <div>
      <h3>Edit Item</h3>
      <label>
        Item Name:
        <input
          type="text"
          name="item_name"
          value={editedItem.item_name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Item Type:
        <input
          type="text"
          name="item_type"
          value={editedItem.item_type}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Notes:
        <textarea
          name="notes"
          value={editedItem.notes}
          onChange={handleChange}
        ></textarea>
      </label>
      <br />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditListItem;