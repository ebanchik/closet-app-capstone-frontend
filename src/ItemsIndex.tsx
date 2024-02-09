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
      <div className="row g-4">
        {props.items.map((item) => {
          console.log("Item:", item); // Log the item object
          try {
            const firstImageSrc = item.filenames && item.filenames.length >  0 ? `http://127.0.0.1:5000/uploads/${item.filenames[0]}` : undefined;

            return (
              <div key={item.id} className="col-12 col-md-4 col-lg-3">
                <div className="card h-100" style={{ width: '18rem' }}>
                  {firstImageSrc && <img className="card-img-top" src={firstImageSrc} alt="Item Image" />}
                  <div className="card-body">
                    <h5 className="card-title"><Link to={`/item/${item.id}`}>{item.name}</Link></h5>
                    <p className="card-text">
                      Brand: {item.brand}<br />
                      {/* Add other item details here */}
                    </p>
                    <Link to={`/item/${item.id}`} className="btn btn-primary">View Details</Link>
                  </div>
                </div>
              </div>
            );
          } catch (error) {
            console.error("Error rendering item:", error); // Log any rendering errors
            return null; // Return null if there's an error
          }
        })}
      </div>
    </div>
  );
}

export default ItemsIndex;
