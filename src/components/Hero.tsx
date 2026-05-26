import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="hero container">
      <h1 className="hero-title">
        Crafting modern <br />
        <span className="text-gradient">digital experiences</span>
      </h1>
      <p className="hero-subtitle">
        We build beautiful, fast, and secure software applications. Amor Softlab specializes in delivering top-tier digital products designed for the future.
      </p>

      <div style={{marginTop: '40px', marginBottom: '60px', width: '100%', maxWidth: '1000px'}}>
        <img 
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80" 
          alt="Software Development" 
          style={{width: '100%', height: '400px', objectFit: 'cover', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)'}} 
        />
      </div>

      <a href="#products" className="hero-btn">
        Explore Products <ArrowRight size={20} />
      </a>
    </section>
  );
};

export default Hero;
