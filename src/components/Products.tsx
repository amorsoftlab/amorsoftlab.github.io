import React from 'react';
import { Music, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            <Link to="/music-club" className="product-btn">
              Explore Music Club <ArrowRight size={18} />
            </Link>
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
            <p>Premium Hall Booking Management Software. Seamlessly manage calendar slots, reservations, event schedules, and customer details all in one place.</p>
            <Link to="/eventdesk" className="product-btn">
              Explore EventDesk <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Products;
