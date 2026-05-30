import { GithubIcon } from './icons';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div>
          <div className="footer-logo">AmorSoftLabs</div>
          <p className="footer-text">© {currentYear} AmorSoftLabs. All rights reserved.</p>
        </div>

        <div className="footer-links">
          <button onClick={() => setActiveTab('projects')} className="footer-link">
            Projects
          </button>
          <button onClick={() => setActiveTab('downloads')} className="footer-link">
            Downloads
          </button>
          <button onClick={() => setActiveTab('about')} className="footer-link">
            About
          </button>
          <a
            href="https://github.com/amorsoftlab"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <GithubIcon size={14} /> GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
