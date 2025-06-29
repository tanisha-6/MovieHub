import { Link } from "react-router-dom";
import "../css/Navbar.css"
import { FaSearch, FaHeart, FaHome } from 'react-icons/fa'; // Icons for better UI

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <span className="logo-movie">Movie</span>
        <span className="logo-hub">Hub</span>
      </Link>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          <FaHome /> Home
        </Link>
        <Link to="/favorites" className="nav-link">
          <FaHeart /> Favorites
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;