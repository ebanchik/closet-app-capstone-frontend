import { useEffect } from 'react';
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
  searchTerm: string;
}

const isUserAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export function ItemsIndex({ items, searchTerm }: ItemsIndexProps): JSX.Element {
  console.log("Number of items:", items.length); // Log the number of items

  useEffect(() => {
    // Function to handle the refresh
    const handleRefresh = () => {
      if (localStorage.getItem('shouldRefresh') === 'true') {
        window.location.reload();
        localStorage.removeItem('shouldRefresh');
      }
    };

    // Call the refresh function initially
    handleRefresh();

    // Clean up the listener on unmount
    return () => {
      // No cleanup needed in this case
    };
  }, []);

  // Filtering items based on the searchTerm
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchTerm.toLowerCase())
    // Add more conditions as needed for other item attributes you want to include in the search
  );

  return (
    <div className="container">
      <section className="index">
        <div className="homepage">
          <h1 className="homepage-text">Armoire</h1>
        </div>
        <div className='center-container'>
          <img src="/assets/arrow.png" alt="Arrow" className="arrow" style={{ width: "50px", height: "50px" }} />
        </div>
        {isUserAuthenticated() ? (
          <>
            <h1 className="index-header">CURRENT WARDROBE:</h1>
          </>
        ) : (
          <h1 className="index-header">Please Login</h1>
        )}
        <div className="container d-flex justify-content-center">
          <div className="row g-4 justify-content-center">
            {filteredItems.map((item) => {
              const firstImageSrc = item.filenames && item.filenames.length > 0 ? `http://127.0.0.1:5000/uploads/${item.filenames[0]}` : undefined;
  
              return (
                <div className='col-12 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center' key={item.id}>
                  <div className="card custom-card-font w-100">
                    {/* Responsive Image Container */}
                    <div className="card-img-container">
                      {firstImageSrc && <img className="card-img-top" src={firstImageSrc} alt="Item Image" />}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title card-title-custom"><Link to={`/item/${item.id}`}>{item.name}</Link></h5>
                      <p className="card-text">
                        {item.brand}<br />
                        {/* Additional item details here */}
                      </p>
                      {/* Optional link to item details */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {isUserAuthenticated() && (
        <div className="container d-flex justify-content-center mt-4">
          <Link to="/new-item" className="add-button-2">+</Link>
        </div>
      )}
    </div>
  );
}