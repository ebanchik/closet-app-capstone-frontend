import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { ItemsIndex } from "./ItemsIndex";
import { ItemsNew } from "./ItemsNew";

interface Item {
  id: number;
  name: string;
  brand: string;
  size: number;
  color: string;
  fit: string;
  category_id: number;
}

export function Content() {
  const [items, setItems] = useState<Item[]>([]);

  const handleIndexItems = () => {
    console.log("handleIndexItems");
    axios.get<Item[]>("http://127.0.0.1:5000/items.json").then((response) => {
      console.log(response.data);
      setItems(response.data);
    });
  };

  const handleCreateItem = (formData: FormData, successCallback: () => void) => {
    const itemData = {
      name: formData.get("name") as string,
      brand: formData.get("brand") as string,
      size: Number(formData.get("size")),
      color: formData.get("color") as string,
      fit: formData.get("fit") as string,
      category_id: Number(formData.get("category_id")),
    };
    console.log({itemData})
    axios
      .post<Item>("http://127.0.0.1:5000/items.json", formData) 
      .then((response: AxiosResponse<Item>) => {
        setItems([...items, response.data]);
        successCallback();
      });
  };
  
  
  useEffect(handleIndexItems, []);

  return (
    <main>
      <ItemsNew onCreateItem={handleCreateItem} />
      <ItemsIndex items={items} />
    </main>
  );
}
