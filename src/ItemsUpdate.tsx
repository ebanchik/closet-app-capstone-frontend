import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Category } from "./ItemsNew"

interface Item {
  id: number;
  name: string;
  brand: string;
  size: string;
  color: string;
  fit: string;
  category_id: number;
}

interface ItemsUpdateProps {
  itemId: number;
}

export function ItemsUpdate(props: ItemsUpdateProps): JSX.Element {
  const [item, setItem] = useState<Item | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch item details and categories when component mounts
    axios.get<Item>(`http://127.0.0.1:5000/items/${props.itemId}.json`)
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });

    axios.get<Category[]>("http://127.0.0.1:5000/categories.json")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [props.itemId]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Submitted");
  
    // Create a FormData object from the form
    const formData = new FormData(event.currentTarget);
  
    // Log the form data before submission
    console.log("Form Data (before submission):", Array.from(formData.entries()));
  
    console.log("Submitting form data to backend...");
    // Assuming you have a function to handle updating the item
    // You can pass formData and success callback to it
    // Example: props.onUpdateItem(formData, () => formRef.current?.reset());
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Update Item</h1>
      <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          Name: <input name="name" type="text" defaultValue={item.name} />
        </div>
        <div>
          Brand: <input name="brand" type="text" defaultValue={item.brand} />
        </div>
        <div>
          Size: <input name="size" type="text" defaultValue={item.size} />
        </div>
        <div>
          Color: <input name="color" type="text" defaultValue={item.color} />
        </div>
        <div>
          Fit: <input name="fit" type="text" defaultValue={item.fit} />
        </div>
        <div>
          Category: 
          <select name="category_id" defaultValue={item.category_id}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          {/* Input field for selecting a file */}
          Image: <input ref={fileInputRef} type="file" name="image" accept="image/*" />
        </div>
        <button type="submit">Update item</button>
      </form>
    </div>
  );
}
