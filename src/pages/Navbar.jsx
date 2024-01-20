import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="nav">
      <section className='logo'>
        <section className='logo-title'>
          <h1>HealthHub</h1>
          <h3>Navigate Wellness, Share the Pathway</h3>
        </section>
      </section>
      <section className='navbar-links'>
        <Link to="/">Home 🏠</Link>
        <Link to="/Chat">HealthGPT 🍃</Link>
        <Link to="/Doctors">Local Doctors 👨‍⚕️</Link>
      </section>
    </nav>
  );
}

export default Navbar;