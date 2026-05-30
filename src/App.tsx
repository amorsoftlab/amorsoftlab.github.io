import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
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

function AppLayout() {
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
        theme={theme}
        toggleTheme={toggleTheme}
        products={products}
        setSelectedProductId={setSelectedProductId}
      />

      <main className="flex-1 w-full pt-20">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/projects" element={
            <Projects
              products={products}
              setSelectedProductId={setSelectedProductId}
            />
          } />
          <Route path="/downloads" element={<Navigate to={`/${products[0]?.id || 'home'}`} replace />} />
          <Route path="/about" element={<About />} />
          {/* Product-specific routes e.g. /#/music-club */}
          <Route path="/:productId" element={
            <Downloads
              products={products}
              selectedProductId={selectedProductId}
              setSelectedProductId={setSelectedProductId}
            />
          } />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AppLayout />
    </HashRouter>
  );
}

export default App;
