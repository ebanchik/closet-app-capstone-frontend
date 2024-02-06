import React, { useRef } from "react";

interface ItemsNewProps {
  onCreateItem: (formData: FormData, successCallback: () => void) => void;
}

export function ItemsNew(props: ItemsNewProps) {
  // Use useRef to create a reference to the form element
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Log the event object
    console.log('Event:', event);
  
    // Log the form element
    console.log('Form Element:', formRef.current);
  
    // Log the form data
    console.log('Form Data:', new FormData(event.currentTarget));
  
    // Directly pass new FormData to onCreateItem
    props.onCreateItem(new FormData(event.currentTarget), () => formRef.current?.reset());
  };

  return (
    <div>
      <h1>New Item</h1>
      {/* Assign the formRef to the ref attribute */}
      <form ref={formRef} onSubmit={handleSubmit}>
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
          Category: <input name="category_id" type="integer" />
        </div>
        <button type="submit">Create item</button>
      </form>
    </div>
  );
}
