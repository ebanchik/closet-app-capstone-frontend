import React, { useRef, useState } from "react";
import { Category } from "./ItemsNew"; // Make sure Category is exported from ItemsNew
import { Item } from './ItemsIndex';

interface ItemsUpdateProps {
  item: Item; // Receive the item as a prop
  categories: Category[]; // Receive the categories as a prop
  onUpdateItem: (formData: FormData) => void;
}

export function ItemsUpdate({ item, categories, onUpdateItem }: ItemsUpdateProps): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length >  0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Submitted");
  
    // Delay FormData creation until just before appending the file
    const formData = new FormData(event.currentTarget);

    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    console.log("Form Data (immediately after creation):", Array.from(formData.entries()));
  
    // Append the file to the FormData if a file is selected
    if (fileInputRef.current?.files && fileInputRef.current.files.length >   0) {
      formData.append('image', fileInputRef.current.files[0]);
    } else {
      formData.append('image', ''); // Add a placeholder value or null to indicate no change
    }

    // Append the file to the FormData if a file is selected
    if (fileInputRef.current?.files && fileInputRef.current.files.length >  0) {
      formData.append('image', fileInputRef.current.files[0]);
      console.log("Form Data after appending file:", Array.from(formData.entries()));
    } else {
      formData.append('image', '');
    }
    
    // Call the onUpdateItem prop with formData
    onUpdateItem(formData);
  };

  return (
    <div className="update-item-form">
      <h1 className="update-item-header-container">Update Item</h1>
      <form ref={formRef} onSubmit={handleSubmit} className='update-item-form' encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input name="name" type="text" className="form-control" id="name" defaultValue={item.name} />
        </div>
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">Brand:</label>
          <input name="brand" type="text" className="form-control" id="brand" defaultValue={item.brand} />
        </div>
        <div className="mb-3">
          <label htmlFor="size" className="form-label">Size:</label>
          <input name="size" type="text" className="form-control" id="size" defaultValue={item.size} />
        </div>
        <div className="mb-3">
          <label htmlFor="color" className="form-label">Color:</label>
          <input name="color" type="text" className="form-control" id="color" defaultValue={item.color} />
        </div>
        <div className="mb-3">
          <label htmlFor="fit" className="form-label">Fit:</label>
          <input name="fit" type="text" className="form-control" id="fit" defaultValue={item.fit} />
        </div>
        <div className="mb-3">
          <label htmlFor="category_id" className="form-label">Category:</label>
          <select name="category_id" className="form-select" id="category_id" defaultValue={item.category_id}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image:</label>
          <input ref={fileInputRef} type="file" name="image" className="form-control" id="image" accept="image/*" onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn btn-primary">Update item</button>
      </form>
    </div>
  );
            }  