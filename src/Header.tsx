import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Header() {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

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
    <header className='custom-header'>
      <nav className="navbar navbar-expand-lg custom-header-bg" style={{ height: '80px', position: 'fixed', top: '0', zIndex:   1000 }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand home-button" to="/">HOME</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-buttons d-flex">
            <Link className="navbar-brand login" to="/login">LOGIN</Link>
            <button className="navbar-brand logout" onClick={handleLogout}>LOGOUT</button>
            <Link className="navbar-brand new-item" to="/new-item">+</Link>
          </div>
          {showLogoutMessage && <p className="logout-success-message">Logout Successful</p>}
        </div>
      </nav>
    </header>
  );
}