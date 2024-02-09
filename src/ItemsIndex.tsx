import { Link } from 'react-router-dom';

export interface Item {
  id: number;
  name: string;
  brand: string;
  size: number;
  color: string;
  fit: string;
  category_id: number;
  category_name?: string;
  filenames?: string[]; // Assuming the filenames are stored in an array
}

interface ItemsIndexProps {
  items: Item[];
}

export function ItemsIndex(props: ItemsIndexProps): JSX.Element {
  console.log("Number of items:", props.items.length); // Log the number of items

  return (
    <div>
      <h1>All items</h1>
      {props.items.map((item) => {
        console.log("Item:", item); // Log the item object
        try {
          return (
            <div key={item.id}>
              <Link to={`/item/${item.id}`}>
                <h2>{item.name}</h2>
              </Link>
              {/* <p>id: {item.id}</p> */}
              <p>Brand: {item.brand}</p>
              {/* <p>Size: {item.size}</p>
              <p>Color: {item.color}</p>
              <p>Fit: {item.fit}</p>
              <p>Category: {item.category_name}</p> */}
              {/* Display images for the item */}
              <div>
                {item.filenames && item.filenames.map((filename, index) => (
                  <img key={index} src={`http://127.0.0.1:5000/uploads/${filename}`} alt="Item Image" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                ))}
              </div>
            </div>
          );
        } catch (error) {
          console.error("Error rendering item:", error); // Log any rendering errors
          return null; // Return null if there's an error
        }
      })}
    </div>
  );
}