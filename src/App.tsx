import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Projects from './components/Projects';
import Downloads from './components/Downloads';
import About from './components/About';
import Footer from './components/Footer';

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  featured: boolean;
  status: string;
  githubUrl: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  // Dynamic products state
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from GitHub
  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/amorsoftlab/product_list/main/products.json');
        if (!response.ok) {
          throw new Error('Failed to fetch products configuration');
        }
        const data = await response.json();
        if (isMounted) {
          setProducts(data);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'An error occurred while loading products';
          setError(errorMessage);
          console.error('Error fetching products:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();
    return () => { isMounted = false; };
  }, []);

  // Apply theme to document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F19] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium tracking-wide">Loading AmorSoftLabs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F19] flex items-center justify-center p-6 text-center">
        <div className="glass-card rounded-2xl p-8 max-w-lg w-full border-red-500/30">
          <div className="text-red-500 mb-4 text-5xl">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Failed to Load Data</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-6 rounded-full transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="isolate flex flex-col min-h-screen bg-gray-50 dark:bg-[#0B0F19] text-gray-800 dark:text-gray-200">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
        products={products}
        setSelectedProductId={setSelectedProductId}
      />

      <main className="flex-1 w-full pt-20">
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
        {activeTab === 'projects' && (
          <Projects
            products={products}
            setActiveTab={setActiveTab}
            setSelectedProductId={setSelectedProductId}
          />
        )}
        {activeTab === 'downloads' && (
          <Downloads
            products={products}
            selectedProductId={selectedProductId}
            setSelectedProductId={setSelectedProductId}
          />
        )}
        {activeTab === 'about' && <About />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
