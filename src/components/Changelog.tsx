import React, { useEffect, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface ChangelogEntry {
  version: string;
  date: string;
  changes: Record<string, string[]>;
}

interface ChangelogProps {
  onClose: () => void;
  repoName: string;
}

const Changelog: React.FC<ChangelogProps> = ({ onClose, repoName }) => {
  const [changelogs, setChangelogs] = useState<ChangelogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/amorsoftlab/${repoName}/main/changelogs.json`)
      .then(res => res.json())
      .then(data => {
        setChangelogs(data);
        if (data.length > 0) {
          setOpenItems({ 0: true });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [repoName]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const getTypeClass = (type: string) => {
    switch (type.toLowerCase()) {
      case 'added': return 'added';
      case 'changed': return 'changed';
      case 'removed': return 'removed';
      case 'fixed': return 'fixed';
      default: return '';
    }
  };

  return (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: '20px', textAlign: 'left'
        }} onClick={onClose}>
          
          <div style={{
            background: 'var(--bg-card)', width: '100%', maxWidth: '800px',
            maxHeight: '85vh', overflowY: 'auto', borderRadius: '24px',
            padding: '40px', position: 'relative', boxShadow: '0 30px 80px rgba(0,0,0,0.1)',
            border: '1px solid var(--border)'
          }} onClick={e => e.stopPropagation()}>
            
            <button 
              onClick={onClose}
              style={{
                position: 'absolute', top: '24px', right: '24px', background: 'var(--bg-secondary)',
                border: 'none', width: '40px', height: '40px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-secondary)'
              }}
            >
              <X size={20} />
            </button>

            <div className="changelog-header" style={{marginBottom: '40px', textAlign: 'center'}}>
              <h2 style={{fontSize: '32px', fontWeight: 800}}>What's New</h2>
              <p style={{color: 'var(--text-secondary)'}}>See what changed in each release</p>
            </div>
            
            <div className="changelog-list">
              {loading ? (
                <div className="loading">Loading changelogs...</div>
              ) : (
                changelogs.map((log, idx) => (
                  <div className={`changelog-item ${openItems[idx] ? 'open' : ''}`} key={log.version}>
                    <button className="changelog-toggle" onClick={() => toggleItem(idx)}>
                      <div className="version-label">
                        <span className="ver">v{log.version}</span>
                        <span className="date">{log.date}</span>
                      </div>
                      <div className="arrow"><ChevronDown size={18} /></div>
                    </button>
                    <div className="changelog-body">
                      <div className="changelog-content">
                        {Object.entries(log.changes).map(([type, items]) => (
                          <div className="change-category" key={type}>
                            <span className={`change-category-title ${getTypeClass(type)}`}>{type}</span>
                            <ul className="change-list">
                              {items.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
          </div>
        </div>
        </div>
  );
};

export default Changelog;
