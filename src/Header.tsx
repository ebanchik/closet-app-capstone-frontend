import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SearchBar } from './SearchBar'


export function Header({ onSearch }: { onSearch: (searchTerm: string) => void }) {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  const handleSearch = (searchTerm: string) => {
    onSearch(searchTerm);
    console.log('Searching for:', searchTerm);
  };

  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem('token');
    // Set a flag in local storage to indicate a logout event
    localStorage.setItem('shouldRefresh', 'true');
    // Redirect to the homepage
    navigate('/');
    setShowLogoutMessage(true);
    setTimeout(() => {
      setShowLogoutMessage(false);
    }, 3000);
  };
  


  return (
    <header className='custom-header hov'>
      <nav className="navbar navbar-expand-lg custom-header-bg" style={{ height: '80px', position: 'fixed', top: '0', zIndex:   1000 }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand home-button" to="/">HOME</Link>
          <div className="navbar-buttons d-flex">
            <Link className="navbar-brand login" to="/login">LOGIN</Link>
            <button className="navbar-brand logout" onClick={handleLogout}>LOGOUT</button>
            <Link className="navbar-brand signup" to="/signup">SIGNUP</Link>
            <Link className="navbar-brand new-item" to="/new-item">+</Link>
          </div>
          <div>
          <SearchBar onSearch={handleSearch} /> {/* Include the SearchBar component */}
        </div>
          {showLogoutMessage && <p className="logout-success-message">Logout Successful</p>}
        </div>
      </nav>
    </header>
  );
}