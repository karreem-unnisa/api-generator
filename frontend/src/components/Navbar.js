import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>
        <Link to="/" className="navbar-title">
          Mock API Generator
        </Link>
      </h1>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/endpoints">Endpoints</Link>
        <Link to="/try">Try API</Link>
      </div>
    </nav>
  );
};

export default Navbar;
