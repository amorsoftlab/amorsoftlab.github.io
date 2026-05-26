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
        
        {/* EventDesk Card */}
        <div className="product-card">
          <div className="product-image" style={{
            background: 'url("./eventdesk.png") center/cover no-repeat',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
          </div>
          <div className="product-content">
            <h3>EventDesk</h3>
            <p>Modern, professional accounting software designed for event planners and businesses. Manage your finances seamlessly.</p>
            <a href="https://github.com/amorsoftlab/eventdesk_release" target="_blank" rel="noreferrer" className="product-btn">
              Explore EventDesk <ExternalLink size={18} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Products;
