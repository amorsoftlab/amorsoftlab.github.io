import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Music, Briefcase } from 'lucide-react';

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
          <div className="nav-item-dropdown">
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
            <div className="dropdown-menu">
              <Link to="/music-club" className="dropdown-item">
                <div className="dropdown-item-icon"><Music size={18}/></div>
                <div className="dropdown-item-text">
                  <span className="dropdown-item-title">Music Club</span>
                  <span className="dropdown-item-desc">Free Music Streaming</span>
                </div>
              </Link>
              <Link to="/eventdesk" className="dropdown-item">
                <div className="dropdown-item-icon" style={{color: '#8b5cf6'}}><Briefcase size={18}/></div>
                <div className="dropdown-item-text">
                  <span className="dropdown-item-title">EventDesk</span>
                  <span className="dropdown-item-desc">Hall Booking Management</span>
                </div>
              </Link>
            </div>
          </div>
          <Link to="/about" style={{ color: isAbout ? 'var(--text-primary)' : 'var(--text-secondary)' }}>About Me</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
