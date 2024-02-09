import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Item {
  id: number;
  name: string;
  brand: string;
  size: number;
  color: string;
  fit: string;
  category_name?: string;
  filenames?: string[];
}

export const ItemPage: React.FC = () => {
  const [item, setItem] = useState<Item | null>(null);
  const { id } = useParams(); // Get the id parameter from the URL

  useEffect(() => {
    console.log(`Fetching item details for ID: ${id}`);
    const itemId = Number(id); // Convert id to number
    // Fetch item details based on the ID
    axios.get<Item>(`http://127.0.0.1:5000/items/${itemId}.json`)
      .then(response => {
        console.log('Item details fetched successfully:', response.data);
        setItem(response.data);
      })
      .catch(error => {
        console.error('Error fetching item details:', error);
      });
  }, [id]); // Fetch item details whenever the ID changes

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{item.name}</h1>
      <p>ID: {item.id}</p>
      <p>Brand: {item.brand}</p>
      <p>Size: {item.size}</p>
      <p>Color: {item.color}</p>
      <p>Fit: {item.fit}</p>
      <p>Category: {item.category_name}</p>
      {/* Display images for the item */}
      <div>
        {item.filenames && item.filenames.map((filename, index) => (
          <img key={index} src={`http://127.0.0.1:5000/uploads/${filename}`} alt="Item Image" style={{ maxWidth: '200px', maxHeight: '200px' }} />
        ))}
      </div>
    </div>
  );
};

export default ItemPage;
