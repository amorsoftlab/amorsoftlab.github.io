import React, { useEffect, useState } from 'react';
import { Smartphone, Monitor, Download, ChevronUp } from 'lucide-react';

interface Asset {
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
}

interface Release {
  tag_name: string;
  published_at: string;
  assets: Asset[];
}

interface DownloadsProps {
  onHide: () => void;
  repoName: string;
}

const Downloads: React.FC<DownloadsProps> = ({ onHide, repoName }) => {
  const [release, setRelease] = useState<Release | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/repos/amorsoftlab/${repoName}/releases/latest`)
      .then(res => res.json())
      .then((data: Release) => {
        setRelease(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [repoName]);

  const formatSize = (bytes: number) => {
    if (bytes > 1048576) return (bytes / 1048576).toFixed(1) + ' MB';
    return (bytes / 1024).toFixed(0) + ' KB';
  };

  const getAssets = () => {
    if (!release) return { apk: null, msix: null };
    return {
      apk: release.assets.find(a => a.name.endsWith('.apk')),
      msix: release.assets.find(a => a.name.endsWith('.msix'))
    };
  };

  const getOS = () => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes('windows')) return 'windows';
    if (ua.includes('android')) return 'android';
    return 'other';
  };

  const { apk, msix } = getAssets();
  const os = getOS();

    return (
      <section className="download-section container" id="download" style={{textAlign: 'center', padding: '20px 0 80px'}}>
        <div style={{animation: 'fadeInUp 0.4s ease'}}>
          <h2>Choose your platform</h2>
          <div className="download-grid" style={{textAlign: 'left'}}>
            {loading ? (
              <div className="loading"><div className="spinner"></div> Loading releases...</div>
            ) : (
              <>
                {apk && (
                  <div
                    className={`download-card ${os === 'android' ? 'recommended' : ''}`}
                    style={os === 'android' ? {borderColor: 'var(--success)', boxShadow: '0 0 0 2px var(--success)', transform: 'translateY(-4px)'} : {}}
                  >
                    {os === 'android' && <div style={{position:'absolute', top: 16, right: 16, background: 'var(--success)', color: '#fff', padding: '6px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 'bold'}}>Recommended</div>}
                    <div className="card-icon android"><Smartphone size={28} /></div>
                    <h3>Android</h3>
                    <p className="card-desc">APK for Android 7.0 and above. Sideload directly — no Play Store needed.</p>
                    <div className="card-meta">
                      <span>📦 {formatSize(apk.size)}</span>
                      <span>⬇️ {apk.download_count} downloads</span>
                    </div>
                    <a href={apk.browser_download_url} className="download-btn primary" style={os === 'android' ? {background: 'var(--success)', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.25)'} : {}}>
                      <Download size={18} /> Download APK
                    </a>
                  </div>
                )}
                {msix && (
                  <div
                    className={`download-card ${os === 'windows' ? 'recommended' : ''}`}
                    style={os === 'windows' ? {borderColor: 'var(--accent-1)', boxShadow: '0 0 0 2px var(--accent-1)', transform: 'translateY(-4px)'} : {}}
                  >
                    {os === 'windows' && <div style={{position:'absolute', top: 16, right: 16, background: 'var(--accent-1)', color: '#fff', padding: '6px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 'bold'}}>Recommended</div>}
                    <div className="card-icon windows"><Monitor size={28} /></div>
                    <h3>Windows</h3>
                    <p className="card-desc">MSIX installer for Windows 10/11. Installs cleanly with system integration.</p>
                    <div className="card-meta">
                      <span>📦 {formatSize(msix.size)}</span>
                      <span>⬇️ {msix.download_count} downloads</span>
                    </div>
                    <a href={msix.browser_download_url} className="download-btn primary">
                      <Download size={18} /> Download for Windows
                    </a>
                  </div>
                )}
                {!apk && !msix && (
                  <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No downloadable assets found.</p>
                )}
              </>
            )}
          </div>
          
          <button 
            onClick={onHide} 
            style={{marginTop: '40px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 500, padding: '10px 20px', borderRadius: '8px', transition: 'background 0.2s'}}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
          >
            <ChevronUp size={18} /> Hide options
          </button>
        </div>

      {release && (
        <div className="version-info" style={{marginTop: '20px'}}>
          <div className="version-tag">
            Latest: <strong>{release.tag_name}</strong> &nbsp;·&nbsp; 
            {new Date(release.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Downloads;
