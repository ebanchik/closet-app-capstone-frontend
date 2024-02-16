import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

// Define the props for the DeleteButton component
interface DeleteButtonProps {
  itemId: number; // Assuming the item ID is a number
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ itemId }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [successMessage, setSuccessMessage] = useState<string>('');


  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");

    if (confirmDelete) {
    try {
      await axios.delete(`http://127.0.0.1:5000/items/${itemId}.json`);
      // Navigate to the homepage upon successful deletion
      setSuccessMessage('Item deleted successfully!');
      navigate('/'); // Replace '/' with the path to your homepage if different
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  } else {
    console.log("Deletion cancelled by user.")
  }
};

  return (
  <div>
    {successMessage && <div className="alert alert-success">{successMessage}</div>}
    <button onClick={handleDelete} className='delete-button'>Delete Item</button>
  </div>
  );
};

export default DeleteButton;
