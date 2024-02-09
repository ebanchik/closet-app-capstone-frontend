import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

// Define the props for the DeleteButton component
interface DeleteButtonProps {
  itemId: number; // Assuming the item ID is a number
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ itemId }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/items/${itemId}.json`);
      console.log(response.data);
      // Navigate to the homepage upon successful deletion
      navigate('/'); // Replace '/' with the path to your homepage if different
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete Item</button>
  );
};

export default DeleteButton;
