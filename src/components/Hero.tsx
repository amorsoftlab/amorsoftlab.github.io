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
      <a href="#products" className="hero-btn">
        Explore Products <ArrowRight size={20} />
      </a>
    </section>
  );
};

export default Hero;
