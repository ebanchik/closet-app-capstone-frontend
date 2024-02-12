import { useState, useEffect } from "react";
import axios from "axios";
import { ItemsIndex } from "./ItemsIndex";
// import { ItemsNew } from "./ItemsNew";
// import { ItemsUpdate } from "./ItemsUpdate";

interface Item {
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

export function Content() {
  const [items, setItems] = useState<Item[]>([]);

  const handleIndexItems = () => {
    // Retrieve the JWT token from local storage or wherever it's stored
    const token = localStorage.getItem('token');

    // Configure the Axios request with the Authorization header
    axios.get<Item[]>("http://127.0.0.1:5000/items.json", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      setItems(response.data);
      console.log("Fetched items:", response.data);
    }).catch((error) => {
      // Handle any errors that occur during the request
      console.error("Error fetching items:", error);
    });
  };

  // const handleCreateItem = (formData: FormData, successCallback: () => void) => {
  //   axios
  //     .post<Item>("http://127.0.0.1:5000/items.json", formData)
  //     .then((response: AxiosResponse<Item>) => {
  //       setItems(prevItems => [...prevItems, response.data]); // Update items state with new item
  //       successCallback();
  //     })
  //     // .catch(error => {
  //     //   console.error("Error creating item:", error);
  //     // });
  // };
  
  useEffect(handleIndexItems, []);

  return (
    <main>
      {/* <ItemsNew onCreateItem={handleCreateItem} /> */}
      {/* <ItemsUpdate onUpdateItem={handleUpdate} /> */}
      <ItemsIndex items={items} />
    </main>
  );
}
