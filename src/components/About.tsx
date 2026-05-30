import { useState } from 'react';
import { Cpu, Send, CheckCircle2, ShieldAlert, Award, Globe, Rocket } from 'lucide-react';

export default function About() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    // Simulate sending message to backend
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const coreValues = [
    { icon: <Rocket size={24} />, title: 'Performance First', desc: 'Every application we craft is optimized for resource usage, startups, and lightning-fast render speeds.' },
    { icon: <Award size={24} />, title: 'Premium Aesthetics', desc: 'We believe functional software should also be visually striking. We design interfaces that inspire and delight users.' },
    { icon: <Globe size={24} />, title: 'Open Source', desc: 'We are committed to public development, providing developer tools, desktop extensions, and core utilities for all.' }
  ];

  const technologies = [
    { name: 'TypeScript', desc: 'Type Safety' },
    { name: 'React', desc: 'UI Core' },
    { name: 'Electron', desc: 'Desktop Apps' },
    { name: 'Node.js', desc: 'Backends' },
    { name: 'Go / Golang', desc: 'High-perf microservices' },
    { name: 'Flutter', desc: 'Cross-platform Mobile' },
    { name: 'GraphQL', desc: 'APIs' },
    { name: 'PostgreSQL', desc: 'Relational DBs' }
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>About AmorSoftLabs</h2>
          <p>Innovating digital solutions with clean architectures and gorgeous user interfaces</p>
        </div>

        <div className="about-grid">
          {/* Main Info */}
          <div className="about-info">
            <div className="glass-card">
              <h2 style={{ marginBottom: '16px' }}>Who We Are</h2>
              <p className="about-text" style={{ marginBottom: '16px' }}>
                AmorSoftLabs is a development studio dedicated to crafting state-of-the-art tools,
                utilities, and core libraries. We specialize in cross-platform desktop engineering,
                hybrid mobile application pipelines, and performant web microservices.
              </p>
              <p className="about-text">
                All our products are developed open-source. We prioritize clean architectures, 
                high speed, zero bloated code bases, and premium design language.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              {coreValues.map((value, idx) => (
                <div key={idx} className="glass-card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div className="asset-icon-box" style={{ width: '48px', height: '48px', borderRadius: '12px' }}>
                    {value.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>{value.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5 }}>{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card">
              <h3 style={{ marginBottom: '16px' }}>Technology Matrix</h3>
              <div className="tech-grid">
                {technologies.map((tech) => (
                  <div key={tech.name} className="tech-item">
                    <Cpu size={18} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{tech.name}</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 400, color: 'var(--text-muted)' }}>{tech.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-card glass-card">
            <h3>Get In Touch</h3>
            <p>Have questions about our software or looking for custom collaborations? Shoot us a message.</p>

            {status === 'success' && (
              <div className="form-status success">
                <CheckCircle2 size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                Your message has been sent successfully! We will get back to you shortly.
              </div>
            )}

            {status === 'error' && (
              <div className="form-status error">
                <ShieldAlert size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                Please fill out all the fields in the form.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your name"
                    disabled={status === 'loading'}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your email"
                    disabled={status === 'loading'}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="How can we help you?"
                  disabled={status === 'loading'}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary btn-submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
