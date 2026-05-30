import { useNavigate } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import type { Product } from '../App';

interface ProjectsProps {
  products: Product[];
  setSelectedProductId: (id: string) => void;
}

export default function Projects({ products, setSelectedProductId }: ProjectsProps) {
  const navigate = useNavigate();
  const handleDownloadClick = (id: string) => {
    setSelectedProductId(id);
    navigate(`/${id}`);
  };

  return (
    <div className="w-full">
      {/* Projects Grid Section */}
      <section className="py-20 bg-gray-50 dark:bg-[#0B0F19] border-t border-gray-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Core Projects</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Discover the advanced tools transforming your workflow with unmatched precision and intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="glass-card rounded-[24px] p-8 sm:p-10 transition-all hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/50 group flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary-500/10 text-primary-500 flex items-center justify-center">
                    <Terminal size={28} />
                  </div>
                  {product.featured && (
                    <span className="px-3 py-1 bg-gradient-bg text-gray-900 dark:text-white text-xs font-bold rounded-full shadow-sm">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors">
                  {product.title}
                </h3>
                
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 flex-1">
                  {product.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full border border-gray-200 dark:border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-100 dark:border-white/10">
                  <button
                    onClick={() => handleDownloadClick(product.id)}
                    className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium h-11 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                  >
                    Downloads
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
