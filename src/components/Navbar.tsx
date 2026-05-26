import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isAbout = location.pathname === '/about';

  return (
    <header>
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <img src="amor_softlab_logo.png" alt="Amor Softlab" style={{height: '36px', width: 'auto'}} />
          Amor Softlab
        </Link>
        <nav className="nav-links">
          <Link to="/" style={{ color: !isAbout ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Home</Link>
          <span 
            style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}
            onClick={() => {
              if (isAbout) {
                window.location.hash = '/';
              } else {
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Projects
          </span>
          <Link to="/about" style={{ color: isAbout ? 'var(--text-primary)' : 'var(--text-secondary)' }}>About Me</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
