import React from 'react';

const Navbar: React.FC = () => {
  return (
    <header>
      <div className="container nav-container">
        <a href="#" className="nav-logo">
          <img src="amor_softlab_logo.png" alt="Amor Softlab" style={{height: '36px', width: 'auto'}} />
          Amor Softlab
        </a>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About Us</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
