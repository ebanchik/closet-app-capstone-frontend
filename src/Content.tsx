import axios from "axios"
import { useState, useEffect } from "react";
import { ItemsIndex } from "./ItemsIndex"

export function Content() {
  const [items, setItems] = useState([]);

  const handleIndexItems = () => {
    console.log("handleIndexItems");
    axios.get("http://127.0.0.1:5000/items.json").then((response) => {
      console.log(response.data);
      setItems(response.data);
    });
  };

  useEffect(handleIndexItems, []);
     
  return (
    <main>
      <ItemsIndex items={items}/>
    </main>
  )
}