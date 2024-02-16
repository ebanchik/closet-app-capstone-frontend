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
  const [successMessage, setSuccessMessage] = useState<string>("");
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

    const formData = new FormData(event.currentTarget);

    const formDataArray = Array.from(formData.entries());
    console.log("Form Data:", formDataArray);


    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    };

    // Get the file input element
    // const fileInput = fileInputRef.current;

    // Add the filename to the FormData object if a file is selected
    // if (fileInput && fileInput.files && fileInput.files.length > 0) {
    //   const filename = fileInput.files[0].name;
    //   formData.append("filename", filename);
    // }

    try {
      const formDataArray = Array.from(formData.entries());
      console.log(formDataArray);      const response = await axios.post<NewItemResponse>("http://127.0.0.1:5000/items.json", formData, config);
      console.log("Item created successfully:", response.data);
      // Reset the form
      formRef.current?.reset();
      setSuccessMessage("Item created successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };
  

  

  return (
    <div className="new-item-form">
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <h1 className="new-item-header-container">New Item</h1>
      <form ref={formRef} onSubmit={handleSubmit} className='new-item-form' encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name:</label>
          <input name="name" type="text" className="form-control custom-input" id="exampleInputEmail1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Brand:</label>
          <input name="brand" type="text" className="form-control custom-input" id="exampleInputPassword1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">Size:</label>
          <input name="size" type="text" className="form-control custom-input" id="exampleInputPassword2" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword3" className="form-label">Color:</label>
          <input name="color" type="text" className="form-control custom-input" id="exampleInputPassword3" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword4" className="form-label">Fit:</label>
          <input name="fit" type="text" className="form-control custom-input" id="exampleInputPassword4" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword5" className="form-label">Category:</label>
          <select name="category_id" className="form-select">
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword6" className="form-label">Image:</label>
          <input ref={fileInputRef} type="file" name="image" className="form-control" id="exampleInputPassword6" accept="image/*" />
        </div>
        <button type="submit" className="btn btn-primary">Create item</button>
      </form>
    </div>
  );
            }  