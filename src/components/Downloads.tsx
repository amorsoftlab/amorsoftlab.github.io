import { useState, useEffect } from 'react';
import { Download, Calendar, HelpCircle, FileText, X, ChevronDown, ChevronUp, Image as ImageIcon, Heart } from 'lucide-react';
import type { Product } from '../App';

interface ReleaseAsset {
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
}

interface GithubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  prerelease: boolean;
  assets: ReleaseAsset[];
}

interface DownloadsProps {
  products: Product[];
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
}

export default function Downloads({ products, selectedProductId, setSelectedProductId }: DownloadsProps) {
  const [releases, setReleases] = useState<GithubRelease[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Modal state
  const [activeModal, setActiveModal] = useState<'downloads' | 'changelogs' | 'donate' | null>(null);
  
  // Accordion state for Old Versions
  const [showOldVersions, setShowOldVersions] = useState(false);
  const [expandedOldVersionId, setExpandedOldVersionId] = useState<number | null>(null);
  
  // OS Detection
  const [userOS] = useState<'windows' | 'mac' | 'linux' | 'android' | 'other'>(() => {
    if (typeof window === 'undefined') return 'other';
    const platform = window.navigator.platform.toLowerCase();
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (platform.includes('win')) return 'windows';
    if (platform.includes('mac')) return 'mac';
    if (platform.includes('linux')) return 'linux';
    if (userAgent.includes('android')) return 'android';
    return 'other';
  });

  const selectedProduct = products.find(p => p.id === (selectedProductId || products[0]?.id));

  useEffect(() => {
    let isMounted = true;
    
    if (selectedProduct) {
      const fetchReleases = async () => {
        await Promise.resolve(); // Defer to avoid synchronous setState in effect
        if (!isMounted) return;
        setLoading(true);
        setError(null);
        setReleases([]);
        
        let githubRepoPath = selectedProduct.githubUrl.split('github.com/')[1];
        if (githubRepoPath?.endsWith('.git')) {
          githubRepoPath = githubRepoPath.slice(0, -4);
        }
        if (githubRepoPath?.endsWith('/')) {
          githubRepoPath = githubRepoPath.slice(0, -1);
        }
        
        if (!githubRepoPath) {
          if (isMounted) setError('Invalid GitHub URL');
          if (isMounted) setLoading(false);
          return;
        }

        const apiEndpoint = `https://api.github.com/repos/${githubRepoPath}/releases`;

        try {
          const res = await fetch(apiEndpoint);
          if (!res.ok) throw new Error('Failed to fetch releases. Repository might be private or rate limited.');
          const data = await res.json();
          if (isMounted) setReleases(data);
        } catch (err: unknown) {
          if (isMounted) setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
          if (isMounted) setLoading(false);
        }
      };

      fetchReleases();
    }

    return () => { isMounted = false; };
  }, [selectedProduct]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeModal]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAssetMetadata = (assetName: string) => {
    const name = assetName.toLowerCase();
    if (name.endsWith('.exe')) return { type: 'windows', icon: '⊞', label: 'Windows Installer' };
    if (name.endsWith('.msi')) return { type: 'windows', icon: '⊞', label: 'Windows MSI' };
    if (name.endsWith('.dmg')) return { type: 'mac', icon: '🍎', label: 'macOS DMG' };
    if (name.endsWith('.appimage')) return { type: 'linux', icon: '🐧', label: 'Linux AppImage' };
    if (name.endsWith('.deb')) return { type: 'linux', icon: '🐧', label: 'Debian/Ubuntu' };
    if (name.endsWith('.apk')) return { type: 'android', icon: '🤖', label: 'Android APK' };
    if (name.endsWith('.zip') || name.endsWith('.tar.gz')) return { type: 'archive', icon: '📦', label: 'Archive/Source' };
    return { type: 'other', icon: '📄', label: 'File' };
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  if (!selectedProduct) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product not found</h2>
        <button onClick={() => setSelectedProductId(products[0]?.id)} className="mt-4 text-primary-500 hover:underline">
          Go back
        </button>
      </div>
    );
  }

  const latestRelease = releases[0];
  const oldReleases = releases.slice(1);

  return (
    <div className="w-full bg-gray-50 dark:bg-[#0B0F19] min-h-screen relative pb-32">
      
      {/* Split Layout Header */}
      <div className="bg-white dark:bg-[#0F172A] border-b border-gray-200 dark:border-white/5 py-12 lg:py-20 transition-colors duration-300">
        <div className="px-4 sm:px-6 max-w-[80rem] mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            
            {/* Left Side: Photo */}
            <div className="w-full md:w-1/3 shrink-0">
              <div className="aspect-square rounded-3xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex flex-col items-center justify-center shadow-xl shadow-gray-200/50 dark:shadow-none overflow-hidden relative group">
                <ImageIcon size={64} className="text-gray-300 dark:text-gray-700 mb-4 group-hover:scale-110 transition-transform duration-500" />
                <span className="text-gray-400 dark:text-gray-600 font-medium text-sm">Product Image</span>
                {/* Fallback gradient if no image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-blue-500/5 mix-blend-overlay" />
              </div>
            </div>

            {/* Right Side: Info & Buttons */}
            <div className="w-full md:w-2/3 flex flex-col justify-center text-center md:text-left">
              <div className="inline-flex items-center justify-center md:justify-start px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold rounded-full mb-6 uppercase tracking-wider w-max md:mx-0 mx-auto">
                {selectedProduct.category}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {selectedProduct.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 leading-relaxed max-w-2xl">
                {selectedProduct.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => latestRelease ? setActiveModal('downloads') : null}
                  disabled={!latestRelease || loading}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold transition-colors shadow-lg shadow-primary-500/25"
                >
                  <Download size={20} />
                  Download
                </button>
                <button 
                  onClick={() => latestRelease ? setActiveModal('changelogs') : null}
                  disabled={!latestRelease || loading}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10 disabled:opacity-50 font-semibold transition-colors"
                >
                  <FileText size={20} />
                  Change Log
                </button>
                <button 
                  onClick={() => setActiveModal('donate')}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25 hover:scale-105 duration-200"
                >
                  <Heart size={20} className="fill-white/20" />
                  Donate
                </button>
              </div>
              
              {loading && <p className="text-sm text-primary-500 mt-4 animate-pulse">Checking for latest version...</p>}
            </div>

          </div>
        </div>
      </div>

      {/* Old Versions Section */}
      {!loading && !error && oldReleases.length > 0 && (
        <div className="px-4 sm:px-6 max-w-4xl mx-auto mt-16">
          <div className="flex flex-col items-center">
            <button
              onClick={() => setShowOldVersions(!showOldVersions)}
              className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium px-6 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              {showOldVersions ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              {showOldVersions ? 'Hide Old Versions' : 'View Old Versions'}
            </button>

            {showOldVersions && (
              <div className="w-full mt-8 space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                {oldReleases.map((release) => (
                  <div key={release.id} className="glass-card rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden">
                    <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                            {release.name || release.tag_name}
                          </h4>
                          {release.prerelease && <span className="px-2 py-0.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-bold rounded-full uppercase">Pre-release</span>}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                          <Calendar size={14} /> {formatDate(release.published_at)}
                        </p>
                      </div>
                      <button
                        onClick={() => setExpandedOldVersionId(expandedOldVersionId === release.id ? null : release.id)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 font-medium text-sm transition-colors text-gray-700 dark:text-gray-200"
                      >
                        <Download size={16} />
                        Download
                        <ChevronDown size={16} className={`transition-transform duration-300 ${expandedOldVersionId === release.id ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {/* Expandable Asset List */}
                    {expandedOldVersionId === release.id && (
                      <div className="bg-gray-50 dark:bg-black/20 p-4 sm:p-6 border-t border-gray-100 dark:border-white/5">
                        {release.assets.length === 0 ? (
                          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No download files available for this version.</p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {release.assets.map(asset => {
                              const meta = getAssetMetadata(asset.name);
                              return (
                                <a
                                  key={asset.name}
                                  href={asset.browser_download_url}
                                  className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-white/5 hover:border-primary-500/50 border border-transparent hover:shadow-sm transition-all group/asset"
                                >
                                  <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center text-xl shrink-0 group-hover/asset:bg-primary-50 dark:group-hover/asset:bg-primary-500/10 transition-colors">
                                    {meta.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm truncate group-hover/asset:text-primary-500 transition-colors">
                                      {asset.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                      {meta.label} • {formatBytes(asset.size)}
                                    </p>
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Overlay for Latest Release & Donate */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={closeModal} />
          
          <div className="relative bg-white dark:bg-[#0F172A] w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 shrink-0">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  {activeModal === 'downloads' && <Download size={20} className="text-primary-500" />}
                  {activeModal === 'changelogs' && <FileText size={20} className="text-primary-500" />}
                  {activeModal === 'donate' && <Heart size={20} className="text-pink-500 fill-pink-500" />}
                  {activeModal === 'downloads' ? 'Latest Download Assets' : activeModal === 'changelogs' ? 'Latest Change Logs' : 'Support Developer'}
                </h3>
                {latestRelease && activeModal !== 'donate' && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Version {latestRelease.tag_name} • {formatDate(latestRelease.published_at)}
                  </p>
                )}
              </div>
              <button onClick={closeModal} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
              
              {activeModal === 'donate' && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Scan to Donate</h4>
                  <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
                    Thank you for your support! Scan the QR code below using any UPI app (PhonePe, GPay, Paytm) to donate.
                  </p>
                  <div className="bg-white p-4 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-transparent inline-block">
                    <img 
                      src="/donate-qr.png" 
                      alt="UPI QR Code" 
                      className="w-64 h-auto object-contain rounded-xl"
                    />
                  </div>
                </div>
              )}

              {activeModal === 'changelogs' && latestRelease && (
                <div>
                  {latestRelease.body ? (
                    <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 dark:text-gray-300">
                      {latestRelease.body}
                    </pre>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">No change logs provided for this release.</p>
                  )}
                </div>
              )}

              {activeModal === 'downloads' && (
                <div>
                  {latestRelease.assets.length === 0 ? (
                    <div className="text-center py-12">
                      <HelpCircle size={32} className="mx-auto text-gray-400 mb-3 opacity-50" />
                      <p className="text-gray-500 dark:text-gray-400">No compiled binaries found for this release.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      
                      {/* OS Recommended Section */}
                      {latestRelease.assets.filter(a => getAssetMetadata(a.name).type === userOS).length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-green-500 mb-3 ml-1">
                            Recommended for your OS
                          </h4>
                          <div className="grid grid-cols-1 gap-3 mb-6">
                            {latestRelease.assets
                              .filter(a => getAssetMetadata(a.name).type === userOS)
                              .map(asset => {
                                const meta = getAssetMetadata(asset.name);
                                return (
                                  <a
                                    key={asset.name}
                                    href={asset.browser_download_url}
                                    className="flex items-center gap-4 p-4 rounded-xl border-2 border-green-500/30 bg-green-50/50 dark:bg-green-500/5 hover:border-green-500/60 hover:shadow-md transition-all group/asset"
                                  >
                                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center text-2xl shrink-0 text-green-600 dark:text-green-400 shadow-sm">
                                      {meta.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="font-bold text-gray-900 dark:text-white text-sm truncate group-hover/asset:text-green-600 dark:group-hover/asset:text-green-400 transition-colors">
                                        {asset.name}
                                      </p>
                                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                        {meta.label} • {formatBytes(asset.size)}
                                      </p>
                                    </div>
                                    <div className="bg-green-500 text-white p-2 rounded-full shadow-sm group-hover/asset:scale-110 transition-transform">
                                      <Download size={18} />
                                    </div>
                                  </a>
                                );
                            })}
                          </div>
                        </div>
                      )}

                      {/* All other files */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 ml-1">
                          All Files
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {latestRelease.assets
                            .filter(a => getAssetMetadata(a.name).type !== userOS)
                            .map(asset => {
                              const meta = getAssetMetadata(asset.name);
                              return (
                                <a
                                  key={asset.name}
                                  href={asset.browser_download_url}
                                  className="flex items-center gap-4 p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-primary-500/50 hover:shadow-md transition-all group/asset"
                                >
                                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-xl shrink-0 group-hover/asset:bg-primary-50 dark:group-hover/asset:bg-primary-500/10 transition-colors">
                                    {meta.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm truncate group-hover/asset:text-primary-500 transition-colors">
                                      {asset.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                      {meta.label} • {formatBytes(asset.size)}
                                    </p>
                                  </div>
                                </a>
                              );
                          })}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
