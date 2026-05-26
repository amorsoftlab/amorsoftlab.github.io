import React, { useEffect, useState } from 'react';
import { Download, List, Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Downloads from '../components/Downloads';
import Changelog from '../components/Changelog';

interface ProjectPageProps {
  repoName: string;
  title: string;
  description: string;
  imagePath: string;
  logoPath?: string;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ repoName, title, description, imagePath, logoPath }) => {
  const [latestVersion, setLatestVersion] = useState<string>('Loading latest version...');
  const [showDownloads, setShowDownloads] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    fetch(`https://api.github.com/repos/amorsoftlab/${repoName}/releases/latest`)
      .then(res => res.json())
      .then(data => {
        if (data && data.tag_name) {
          setLatestVersion(`${data.tag_name} available now`);
        }
      })
      .catch(() => setLatestVersion('Latest version available now'));
  }, [repoName]);

  return (
    <div style={{minHeight: '100vh'}}>
      <div className="container" style={{padding: '24px'}}>
        <Link to="/" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600}}>
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>

      <section className="hero container" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '60px', padding: '40px 24px 80px', textAlign: 'left', flexWrap: 'wrap'}}>
        <div className="hero-left" style={{flex: '1 1 500px', display: 'flex', justifyContent: 'center'}}>
          <img src={imagePath} alt={title} style={{width: '100%', maxWidth: '800px', height: 'auto', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', animation: 'fadeInUp 0.8s ease'}} />
        </div>

        <div className="hero-right" style={{flex: '1 1 400px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', animation: 'fadeInUp 0.8s ease 0.2s backwards'}}>
          <div className="hero-badge" style={{marginBottom: '24px'}}>
            <span className="dot"></span>
            <span>{latestVersion}</span>
          </div>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px'}}>
            {logoPath && <img src={logoPath} alt="Logo" style={{height: '64px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />}
            <h1 style={{fontSize: '56px', fontWeight: 900, margin: 0}}>{title}</h1>
          </div>

          <h2 style={{fontSize: '24px', fontWeight: 700, marginBottom: '16px'}}>
            <span className="text-gradient">by Amor Softlab</span>
          </h2>
          <p style={{fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: '1.6', marginBottom: '40px'}}>
            {description}
          </p>

          <div className="hero-buttons" style={{display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '320px'}}>
            <button onClick={() => setShowDownloads(true)} className="download-btn primary" style={{width: '100%', fontSize: '18px', padding: '16px 24px'}}>
              <Download size={20} /> Download Options
            </button>
            
            <button onClick={() => setShowChangelog(true)} className="download-btn" style={{width: '100%', fontSize: '18px', padding: '16px 24px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border)'}}>
              <List size={20} /> Release Notes
            </button>
            
            {/* Support Me (UPI) Button */}
            <a href="upi://pay?pa=amorsoftlab@upi&pn=Amor%20Softlab&cu=INR" className="download-btn" style={{width: '100%', fontSize: '18px', padding: '16px 24px', background: '#fdf2f8', color: '#db2777', border: '1px solid #fbcfe8', textDecoration: 'none'}}>
              <Heart size={20} /> Support Me (UPI)
            </a>
          </div>
        </div>
      </section>

      {showDownloads && (
        <div style={{animation: 'fadeInUp 0.4s ease', padding: '40px 0', borderTop: '1px solid var(--border)'}}>
          <Downloads onHide={() => setShowDownloads(false)} repoName={repoName} />
        </div>
      )}
      {showChangelog && <Changelog onClose={() => setShowChangelog(false)} repoName={repoName} />}
    </div>
  );
};

export default ProjectPage;
