import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand">Navbar</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-§-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/">
              <a className="nav-link active" aria-current="page">
                Home
              </a>
            </Link>
            
            <Link to="/comments">
              <a className="nav-link">comments</a>
            </Link>

            <Link to="/login">
              <a className="nav-link">login</a>
            </Link>

            <Link to="/login">
              <a
                onClick={() => {
                  localStorage.removeItem("token");
                }}
                className="nav-link"
              >
                logout
              </a>
            </Link>

            <Link to="/register">
              <a className="nav-link">register</a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
