import React from 'react';
import { Camera, Code2, Heart, ExternalLink } from 'lucide-react';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

const About: React.FC = () => {
  return (
    <section id="about" style={{ padding: '120px 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>

      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '72px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', padding: '6px 18px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, color: 'var(--accent-1)', marginBottom: '20px' }}>
          <Heart size={14} /> The Person Behind It
        </div>
        <h2 className="section-title" style={{ marginBottom: '16px' }}>About Me</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          A photographer who codes — I capture light by day and build software by night.
        </p>
      </div>

      {/* Main Card */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '40px' }}>

        {/* Photography — Profession */}
        <div className="product-card" style={{ borderColor: 'rgba(236,72,153,0.2)', background: 'rgba(236,72,153,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(236,72,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ec4899' }}>
              <Camera size={26} />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#ec4899', marginBottom: '4px' }}>Profession</div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>Photography</h3>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '28px', fontSize: '15px' }}>
            Photography is my primary passion and profession. I specialize in wedding and portrait photography, 
            capturing genuine emotions and timeless moments. Every frame tells a story — and I live to tell them.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a
              href="https://www.instagram.com/magical_world_i_see/"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 18px', background: 'rgba(236,72,153,0.08)', borderRadius: '12px', textDecoration: 'none', color: 'var(--text-primary)', border: '1px solid rgba(236,72,153,0.15)', transition: 'all 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(236,72,153,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(236,72,153,0.08)')}
            >
              <InstagramIcon />
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>@magical_world_i_see</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Personal Photography</div>
              </div>
              <ExternalLink size={14} style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }} />
            </a>

            <a
              href="https://www.instagram.com/amor_weddings_/"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 18px', background: 'rgba(236,72,153,0.08)', borderRadius: '12px', textDecoration: 'none', color: 'var(--text-primary)', border: '1px solid rgba(236,72,153,0.15)', transition: 'all 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(236,72,153,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(236,72,153,0.08)')}
            >
              <InstagramIcon />
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>@amor_weddings_</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Professional Wedding Photography</div>
              </div>
              <ExternalLink size={14} style={{ marginLeft: 'auto', color: 'var(--text-secondary)' }} />
            </a>
          </div>
        </div>

        {/* Coding — Interest */}
        <div className="product-card" style={{ borderColor: 'rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-1)' }}>
              <Code2 size={26} />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--accent-1)', marginBottom: '4px' }}>Hobby &amp; Interest</div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>Software Dev</h3>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '28px', fontSize: '15px' }}>
            Coding is something I discovered out of curiosity and fell in love with. I build apps that solve real problems — 
            things I'd personally want to use. <strong style={{ color: 'var(--text-primary)' }}>Amor Softlab</strong> is where 
            that curiosity turns into real, polished software. No formal training — just passion, patience, and a lot of late nights.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['Flutter', 'Dart', 'React', 'TypeScript', 'Vite', 'Firebase'].map(tech => (
              <span key={tech} style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.08)', borderRadius: '100px', fontSize: '13px', fontWeight: 600, color: '#ffffff', border: '1px solid rgba(255,255,255,0.15)' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Philosophy Quote */}
      <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid var(--border)' }}>
        <p style={{ fontSize: '22px', fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '680px', margin: '0 auto' }}>
          "I see the world through a lens — sometimes glass, sometimes code. Both are tools for creating something beautiful from nothing."
        </p>
      </div>

    </section>
  );
};

export default About;
