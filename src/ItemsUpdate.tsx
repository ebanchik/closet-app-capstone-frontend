import React, { useRef } from "react";
import { Category } from "./ItemsNew"; // Make sure Category is exported from ItemsNew
import { Item } from './ItemsIndex';

interface ItemsUpdateProps {
  item: Item; // Receive the item as a prop
  categories: Category[]; // Receive the categories as a prop
  onUpdateItem: (formData: FormData, successCallback: () => void) => void;
}

export function ItemsUpdate({ item, categories, onUpdateItem }: ItemsUpdateProps): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Submitted");

    // Create a FormData object from the form
    const formData = new FormData(event.currentTarget);

    // Append the file to the FormData if a file is selected
    if (fileInputRef.current?.files && fileInputRef.current.files.length >   0) {
      formData.append('image', fileInputRef.current.files[0]);
    }

    // Log the form data before submission
    console.log("Form Data (before submission):", Array.from(formData.entries()));

    console.log("Submitting form data to backend...");
    // Call the onUpdateItem prop with formData and successCallback
    onUpdateItem(formData, () => formRef.current?.reset());
  };

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
