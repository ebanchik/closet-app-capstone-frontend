import { useState, useEffect } from "react";
import axios from "axios";
import { ItemsIndex } from "./ItemsIndex";

interface Item {
  id: number;
  name: string;
  brand: string;
  size: number;
  color: string;
  fit: string;
  category_id: number;
  category_name: string;
  filenames?: string[]; // Ensure this matches the expected structure
}

interface ContentProps {
  searchTerm: string; // Add this line
}

// Update the function signature to accept props
export function Content({ searchTerm }: ContentProps) {
  const [items, setItems] = useState<Item[]>([]);

  const handleIndexItems = () => {
    const token = localStorage.getItem('token');
    axios.get<Item[]>("http://127.0.0.1:5000/items.json", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      setItems(response.data);
      console.log("Fetched items:", response.data);
    }).catch((error) => {
      console.error("Error fetching items:", error);
    });
  };

  useEffect(handleIndexItems, []);

  return (
    <main>
      {/* Pass searchTerm to ItemsIndex */}
      <ItemsIndex items={items} searchTerm={searchTerm} />
    </main>
  );
}