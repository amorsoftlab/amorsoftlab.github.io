import { Sun, Moon, Terminal } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: string;
  toggleTheme: () => void;
}

export default function Navbar({ activeTab, setActiveTab, theme, toggleTheme }: NavbarProps) {
  return (
    <header className="header">
      <div className="container nav-container">
        <div className="logo" onClick={() => setActiveTab('projects')}>
          <div className="logo-icon">
            <Terminal size={18} strokeWidth={3} />
          </div>
          <span>AmorSoftLabs</span>
        </div>

        <nav className="nav-menu">
          <button
            className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            className={`nav-item ${activeTab === 'downloads' ? 'active' : ''}`}
            onClick={() => setActiveTab('downloads')}
          >
            Downloads
          </button>
          <button
            className={`nav-item ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
        </nav>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
