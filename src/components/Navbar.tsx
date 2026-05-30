import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Terminal, ChevronDown } from 'lucide-react';
import type { Product } from '../App';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
  products?: Product[];
  setSelectedProductId?: (id: string) => void;
}

export default function Navbar({ theme, toggleTheme, products = [], setSelectedProductId }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.hash.replace('#', '') || '/home';

  const getTabClass = (path: string) => {
    if (currentPath === path) {
      return "text-sm px-4 py-1.5 rounded-full bg-white dark:bg-white/10 font-medium text-gray-800 dark:text-white/90 shadow-sm transition-all";
    }
    return "text-gray-500 dark:text-gray-400 text-sm px-4 py-1.5 rounded-full hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-white/5 font-medium transition-all cursor-pointer";
  };

  const handleProductSelect = (id: string) => {
    if (setSelectedProductId) {
      setSelectedProductId(id);
    }
    navigate('/downloads');
  };

  return (
    <header className="bg-white dark:bg-[#0B0F19] border-b dark:border-gray-800 border-gray-100 sticky top-0 z-50 py-2 lg:py-4 transition-colors duration-300">
      <div className="px-4 sm:px-6 lg:px-7 max-w-[120rem] mx-auto">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center">
            <a 
              className="flex items-center gap-2 cursor-pointer group" 
              onClick={() => navigate('/home')}
            >
              <div className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                <Terminal size={18} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
                AmorSoftLabs
              </span>
            </a>
          </div>

          {/* Nav Links (Pill shape) */}
          <nav className="hidden lg:flex items-center bg-[#F9FAFB] dark:bg-white/5 rounded-full p-1 max-h-fit border border-gray-200 dark:border-transparent">
            <button onClick={() => navigate('/home')} className={getTabClass('/home')}>
              Home
            </button>
            <button onClick={() => navigate('/projects')} className={getTabClass('/projects')}>
              Projects
            </button>
            
            {/* Downloads Dropdown */}
            <div className="relative group/dropdown">
              <button onClick={() => navigate('/downloads')} className={`${getTabClass('/downloads')} flex items-center gap-1`}>
                Downloads
                <ChevronDown size={14} className="opacity-50 group-hover/dropdown:rotate-180 transition-transform duration-200" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 min-w-[240px]">
                <div className="glass-card rounded-2xl p-2 shadow-xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-xl">
                  {products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductSelect(product.id)}
                      className="flex items-center w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-primary-500 transition-colors"
                    >
                      {product.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={() => navigate('/about')} className={getTabClass('/about')}>
              About
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#F2F4F7] dark:bg-white/5 text-[#667085] dark:text-white/60 hover:text-gray-800 dark:hover:text-white/90 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <a 
              href="https://www.instagram.com/magical_world_i_see/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-sm font-bold rounded-full hover:opacity-90 transition-opacity h-11 shadow-md shadow-pink-500/20"
            >
              Instagram Profile
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
