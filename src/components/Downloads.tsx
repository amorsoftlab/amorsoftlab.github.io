import { useState, useEffect } from 'react';
import { Download, Calendar, FileArchive, Laptop, HelpCircle, ChevronRight, BarChart, ExternalLink } from 'lucide-react';
import type { Product } from './Projects';
import { GithubIcon } from './icons';

interface DownloadsProps {
  products: Product[];
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
}

// Helper to parse repo path (owner/name) from GitHub URL
function getRepoPath(githubUrl: string): string {
  if (!githubUrl) return '';
  let clean = githubUrl.trim().replace(/\/+$/, '');
  
  // Strip .git extension if present at the end
  if (clean.toLowerCase().endsWith('.git')) {
    clean = clean.slice(0, -4);
  }

  if (clean.includes('github.com')) {
    try {
      const url = new URL(clean);
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts.length >= 2) {
        return `${parts[0]}/${parts[1]}`;
      }
    } catch {
      // fallback
    }
  }
  return clean;
}

interface GitHubAsset {
  id: number;
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
}

interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  html_url: string;
  prerelease: boolean;
  assets: GitHubAsset[];
}

// Helper to format file sizes
function formatBytes(bytes: number, decimals = 1) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Helper to format date
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Helper to identify platform/file-type from asset name
function getAssetType(filename: string) {
  const lower = filename.toLowerCase();
  if (lower.endsWith('.exe')) return { label: 'Windows', type: 'win' };
  if (lower.endsWith('.dmg') || lower.endsWith('.pkg')) return { label: 'macOS', type: 'mac' };
  if (lower.endsWith('.deb') || lower.endsWith('.rpm') || lower.endsWith('.appimage')) return { label: 'Linux', type: 'linux' };
  if (lower.endsWith('.zip') || lower.endsWith('.tar.gz') || lower.endsWith('.tgz') || lower.endsWith('.rar')) return { label: 'Archive', type: 'zip' };
  return { label: 'Build File', type: 'file' };
}

export default function Downloads({ products, selectedProductId, setSelectedProductId }: DownloadsProps) {
  const [allReleases, setAllReleases] = useState<Record<string, GitHubRelease[]> | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const activeProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const repo = getRepoPath(activeProduct?.githubUrl || '');

  useEffect(() => {
    let isMounted = true;

    const fetchAllReleases = async () => {
      setLoading(true);
      setGlobalError(null);
      try {
        const response = await fetch('/releases.json');
        if (!response.ok) {
          throw new Error('Failed to load release data.');
        }
        const data = await response.json();
        if (isMounted) {
          setAllReleases(data);
        }
      } catch (err) {
        if (isMounted) {
          // If we fail to fetch releases.json, we can fallback to live API or just show error
          console.error(err);
          setGlobalError('Failed to load release information. Please check GitHub directly.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (!allReleases) {
      fetchAllReleases();
    }

    return () => {
      isMounted = false;
    };
  }, [allReleases]);

  const releases = allReleases?.[repo] || [];
  const error = globalError;

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Software Downloads</h2>
          <p>Retrieve installers, binary packages, and updates direct from our GitHub build pipelines</p>
        </div>

        <div className="downloads-layout">
          {/* Sidebar */}
          <aside className="downloads-sidebar">
            <div className="downloads-sidebar-header">Select Product</div>
            <div className="product-selector-list">
              {products.map((product) => (
                <button
                  key={product.id}
                  className={`selector-item ${selectedProductId === product.id ? 'active' : ''}`}
                  onClick={() => setSelectedProductId(product.id)}
                >
                  <Laptop size={16} className="selector-icon" />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.95rem' }}>{product.title}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>
                      {product.category}
                    </span>
                  </div>
                  <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                </button>
              ))}
            </div>
          </aside>

          {/* Main content area */}
          <main className="downloads-content">
            <div className="glass-card" style={{ padding: '20px 28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{activeProduct?.title}</h3>
                  <a
                    href={activeProduct?.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.85rem', color: 'var(--accent-light)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <GithubIcon size={12} /> {repo}
                  </a>
                </div>
                <span className="badge">{activeProduct?.status}</span>
              </div>
            </div>

            {loading && (
              <div className="releases-loading glass-card">
                <div className="spinner"></div>
                <p>Loading releases and installer files from GitHub...</p>
              </div>
            )}

            {error && (
              <div className="glass-card" style={{ padding: '32px', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <p style={{ color: '#ef4444', fontWeight: 600, marginBottom: '16px' }}>{error}</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  You can browse all releases and source codes directly on the GitHub releases page for this product.
                </p>
                <a
                  href={`${activeProduct?.githubUrl}/releases`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink size={16} /> Open GitHub Releases
                </a>
              </div>
            )}

            {!loading && !error && (
              <>
                {releases.length === 0 ? (
                  <div className="releases-empty glass-card">
                    <HelpCircle size={48} />
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>No releases available yet</h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 20px' }}>
                      This repository does not have any tags or published release assets yet.
                    </p>
                    <a
                      href={activeProduct?.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      <GithubIcon size={16} /> Visit Project Repository
                    </a>
                  </div>
                ) : (
                  releases.map((release, index) => (
                    <div key={release.id} className="release-card">
                      <div className="release-header">
                        <div className="release-title-info">
                          <h3>{release.name || release.tag_name}</h3>
                          {index === 0 && <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>Latest</span>}
                          {release.prerelease && <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>Pre-release</span>}
                        </div>
                        <div className="release-date">
                          <Calendar size={14} /> {formatDate(release.published_at)}
                        </div>
                      </div>

                      {release.body && (
                        <div className="release-body">
                          <h4>Release Changelog</h4>
                          <pre className="release-notes-content">
                            {release.body}
                          </pre>
                        </div>
                      )}

                      <div className="assets-container">
                        <h4>
                          <Download size={16} style={{ color: 'var(--accent)' }} /> Available Files & Installers
                        </h4>

                        {release.assets.length === 0 ? (
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            No compiled binaries found. Download the source files directly on GitHub.
                          </p>
                        ) : (
                          <div className="assets-grid">
                            {release.assets.map((asset) => {
                              const meta = getAssetType(asset.name);
                              return (
                                <div key={asset.id} className="asset-card">
                                  <div className="asset-info">
                                    <div className="asset-icon-box">
                                      <FileArchive size={20} />
                                    </div>
                                    <div className="asset-details">
                                      <span className="asset-name" title={asset.name}>
                                        {asset.name}
                                      </span>
                                      <div className="asset-stats">
                                        <span className="badge" style={{ padding: '2px 8px', fontSize: '0.65rem' }}>{meta.label}</span>
                                        <span>{formatBytes(asset.size)}</span>
                                        <span>
                                          <BarChart size={11} /> {asset.download_count} downloads
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <a
                                    href={asset.browser_download_url}
                                    className="asset-download-btn"
                                    title={`Download ${asset.name}`}
                                  >
                                    <Download size={14} />
                                  </a>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
