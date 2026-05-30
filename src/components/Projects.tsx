import { useState, useMemo } from 'react';
import { Search, Download, ArrowRight } from 'lucide-react';
import { GithubIcon } from './icons';

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

interface ProjectsProps {
  products: Product[];
  setActiveTab: (tab: string) => void;
  setSelectedProductId: (id: string) => void;
}

export default function Projects({ products, setActiveTab, setSelectedProductId }: ProjectsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const list = new Set(products.map((p) => p.category));
    return ['All', ...Array.from(list)];
  }, [products]);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleDownloadClick = (productId: string) => {
    setSelectedProductId(productId);
    setActiveTab('downloads');
  };

  return (
    <section className="section">
      <div className="container">
        <div className="hero">
          <div className="hero-badge">
            <span className="badge">AmorSoftLabs Suite</span>
          </div>
          <h1>
            Crafting Premium <br />
            <span className="gradient-text">Open Source Solutions</span>
          </h1>
          <p className="hero-subtitle">
            Explore our curated catalog of desktop applications, web systems, and utilities. Built
            for speed, elegance, and extreme developer experience.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => handleDownloadClick(products[0]?.id || '')}>
              Get Started <ArrowRight size={18} />
            </button>
            <button className="btn-secondary" onClick={() => setActiveTab('about')}>
              Learn About Us
            </button>
          </div>
        </div>

        <div className="section-header">
          <h2>Product Catalog</h2>
          <p>Search and filter our projects to find what you need</p>
        </div>

        <div className="search-filter-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search by name, tag, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="categories-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '48px' }}>
            <p style={{ color: 'var(--text-secondary)' }}>No projects found matching your query.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="glass-card project-card">
                <div className="project-header">
                  <div className="project-meta">
                    <span className="project-category">{product.category}</span>
                    <h3>{product.title}</h3>
                  </div>
                  <span className={`badge ${product.status === 'Active' ? '' : 'badge-beta'}`} 
                        style={product.status !== 'Active' ? { background: 'rgba(245,158,11,0.15)', color: '#f59e0b' } : {}}>
                    {product.status}
                  </span>
                </div>

                <p className="project-description">{product.description}</p>

                <div className="project-tags">
                  {product.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-actions">
                  <button className="btn-primary" onClick={() => handleDownloadClick(product.id)}>
                    <Download size={16} /> Downloads
                  </button>
                  <a
                    href={product.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <GithubIcon size={16} /> Repository
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
