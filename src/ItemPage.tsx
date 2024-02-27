import { CustomCursor } from './CustomCursor';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ItemsUpdate } from './ItemsUpdate'; // Import ItemsUpdate component
import { Item } from './ItemsIndex';
import DeleteButton from './DeleteButton';

// Define the Category interface
interface Category {
  id: number;
  category_name: string;
}

export const ItemPage: React.FC = () => {
  const [item, setItem] = useState<Item | null>(null);
  const [categories, setCategories] = useState<Category[]>([]); // State for categories
  const [showUpdateForm, setShowUpdateForm] = useState(false); // New state to toggle form visibility
  const { id } = useParams(); // Get the id parameter from the URL

  // Function to fetch item details
  const fetchItemDetails = useCallback(async () => {
    const itemId = Number(id); // Convert id to number
    try {
      const response = await axios.get<Item>(`http://127.0.0.1:5000/items/${itemId}.json`);
      console.log('Fetched item details:', response.data);
      setItem(response.data);
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  }, [id]); // Dependency array includes id

  // Function to fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get<Category[]>('http://127.0.0.1:5000/categories.json');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []); // No dependencies, so it runs once on mount

  // Fetch item details when the component mounts or when itemId changes
  useEffect(() => {
    fetchItemDetails();
  }, [fetchItemDetails]); // Dependency array includes fetchItemDetails

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]); // Dependency array includes fetchCategories

  const handleUpdateItem = async (formData: FormData) => {
    if (!item) {
      console.error('Cannot update item: item data is not available');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found in local storage.");
      return;
    }
  
  
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data'
        }
      };
      console.log('Updating item with formData:', Array.from(formData.entries()));
      const response = await axios.patch(`http://127.0.0.1:5000/items/${item.id}.json`, formData, config);
      console.log('Item updated successfully:', response.data);
      // Refresh the item data after successful update
      fetchItemDetails();
      // Assuming you have a success callback to handle UI changes
      // successCallback();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const toggleUpdateFormVisibility = () => {
    setShowUpdateForm(!showUpdateForm);
  };


  if (!item || !categories) {
    return <div>Loading...</div>;
  }

  return (
      <div className='item-content'>
        <CustomCursor />
        <h1 className='item-title'>{item.name}</h1>
        <p>Brand: {item.brand}</p>
        <p>Size: {item.size}</p>
        <p>Color: {item.color}</p>
        <p>Fit: {item.fit}</p>
        <p>Category: {item.category_name}</p>
        <div className='button-container'>
          <button className='custom-edit-button' onClick={toggleUpdateFormVisibility}>
            {showUpdateForm ? 'Hide Update Form' : 'Edit Item'}
          </button>
          <DeleteButton itemId={item.id} /> {/* Adjusted for simplicity */}
        </div>
        {showUpdateForm && <ItemsUpdate item={item} categories={categories} onUpdateItem={handleUpdateItem} />}
      <div className='image-wrapper'> {/* This will now be positioned next to the content */}
        {item.filenames?.map((filename, index) => (
          <img key={index} src={`http://127.0.0.1:5000/uploads/${filename}`} alt="Item Image"/>
        ))}
      </div>
      </div>
  );
        } 