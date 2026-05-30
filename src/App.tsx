import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import type { Product } from './components/Projects';
import Downloads from './components/Downloads';
import About from './components/About';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('projects');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Fetch products database
  useEffect(() => {
    const fetchProducts = async () => {
      const urls = [
        'https://raw.githubusercontent.com/amorsoftlab/product_list/main/products.json',
        'https://raw.githubusercontent.com/amorsoftlab/product_list/master/products.json',
        './products.json'
      ];

      for (const url of urls) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
              setProducts(data);
              setSelectedProductId(data[0].id);
              console.log(`Successfully loaded products list from ${url}`);
              return;
            }
          }
        } catch (error) {
          console.warn(`Failed to fetch products from ${url}:`, error);
        }
      }
      console.error('All products database sources failed.');
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
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

      <Footer setActiveTab={setActiveTab} />
    </>
  );
}
