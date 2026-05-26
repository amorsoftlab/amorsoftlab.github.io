import React from 'react';
import { ExternalLink, Music } from 'lucide-react';

const Products: React.FC = () => {
  return (
    <section id="products" className="products container">
      <h2 className="section-title">Projects</h2>
      
      <div style={{display: 'grid', gap: '32px', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', maxWidth: '1000px', margin: '0 auto'}}>
        
        {/* Music Club Card */}
        <div className="product-card">
          <div className="product-image">
            <Music size={64} color="var(--text-primary)" opacity={0.8} />
          </div>
          <div className="product-content">
            <h3>Music Club</h3>
            <p>Stream, discover, and enjoy your favorite music. A beautiful desktop and mobile application available for Windows and Android.</p>
            <a href="https://amorsoftlab.github.io/music_club_release/" className="product-btn">
              Explore Music Club <ExternalLink size={18} />
            </a>
          </div>
        </div>
        
        {/* Upcoming Product Placeholder */}
        <div className="product-card" style={{opacity: 0.6}}>
          <div className="product-image" style={{background: 'rgba(255,255,255,0.05)'}}>
            <span style={{fontSize: '24px', fontWeight: 600, color: 'var(--text-secondary)'}}>Coming Soon</span>
          </div>
          <div className="product-content">
            <h3>Next Gen App</h3>
            <p>We are constantly working on new and exciting software. Stay tuned for our upcoming releases.</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Products;
