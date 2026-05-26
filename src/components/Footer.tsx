import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <div style={{marginBottom: '24px'}}>
          <h2 style={{color: 'var(--text-primary)', marginBottom: '8px', fontSize: '24px'}}>Amor Softlab</h2>
          <p>Innovating the digital landscape.</p>
        </div>
        <p>&copy; {new Date().getFullYear()} Amor Softlab. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
