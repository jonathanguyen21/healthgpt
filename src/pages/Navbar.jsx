import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <section className="logo">
        <section className="logo-title">
          <Link to="/">
            <h1>HealthHub</h1>
          </Link>
          <Link to="/">
            <h3>Navigate Wellness, Share the Pathway</h3>
          </Link>
        </section>
      </section>
      <section className="navbar-links">
        <Link to="/">Home 🏠</Link>
        <Link to="/Chat">HealthGPT 🍃</Link>
        <Link to="/DoctorsNearMe">Local Doctors 👨‍⚕️</Link>
      </section>
    </nav>
  );
};

export default Navbar;
