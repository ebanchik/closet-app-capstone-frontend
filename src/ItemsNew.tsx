import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

interface NewItemResponse {
  id: number;
  name: string;
  brand: string;
  size: number;
  color: string;
  fit: string;
  category_id: number;
  category_name: string;
  filename?: string[]; // New attribute for filename
}

export interface Category {
  id: number;
  category_name: string;
}

export function ItemsNew(): JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch categories when component mounts
    axios.get<Category[]>("http://127.0.0.1:5000/categories.json")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Submitted");

    // Create a FormData object from the form
    const formData = new FormData(event.currentTarget);

    // Log the form data before submission
    console.log("Form Data (before submission):", Array.from(formData.entries()));

    console.log("Submitting form data to backend...");
    try {
      const response = await axios.post<NewItemResponse>("http://127.0.0.1:5000/items.json", formData);
      console.log("Item created successfully:", response.data);
      // Reset the form
      formRef.current?.reset();
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };
  

  

return (
  <div>
    <h1>New Item</h1>
    <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        Name: <input name="name" type="text" />
      </div>
      <div>
        Brand: <input name="brand" type="text" />
      </div>
      <div>
        Size: <input name="size" type="text" />
      </div>
      <div>
        Color: <input name="color" type="text" />
      </div>
      <div>
        Fit: <input name="fit" type="text" />
      </div>
      <div>
        Category: 
        <select name="category_id">
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
      <button type="submit">Create item</button>
    </form>
  </div>
);
          }