import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg custom-header-bg" style={{ height: '80px', position: 'fixed', top: '0', zIndex:   1000 }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand home-button" to="/">Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-buttons d-flex">
            <Link className="navbar-brand login" to="/login">Login</Link>
            <Link className="navbar-brand logout" to="/logout">Logout</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
