interface Item {
  id: number;
  name: string;
  brand: string;
  size: number;
  color: string;
  fit: string;
  category_id: number;
}

interface ItemsIndexProps {
  items: Item[];
}

export function ItemsIndex(props: ItemsIndexProps): JSX.Element {
  return (
    <div>
      <h1>All items</h1>
      {props.items.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>id: {item.id}</p>
          <p>Brand: {item.brand}</p>
          <p>Size: {item.size}</p>
          <p>Color: {item.color}</p>
          <p>Fit: {item.fit}</p>
          <p>Category: {item.category_id}</p>
        </div>
      ))}
    </div>
  );
}
