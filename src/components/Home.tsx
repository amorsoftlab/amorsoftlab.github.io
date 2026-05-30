import { useState, useEffect } from 'react';
import { Code, Cpu, Globe, X, Heart } from 'lucide-react';

export default function Home({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [showDonateModal, setShowDonateModal] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showDonateModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showDonateModal]);

  return (
    <div className="w-full relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 flex items-center justify-center min-h-[80vh]">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-primary-500/20 dark:bg-primary-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Innovating the Future</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-blue-500">
              AmorSoftLabs
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            We are a creative laboratory dedicated to building beautiful, state-of-the-art open-source software. From modern web applications to powerful desktop utilities, we craft digital experiences that empower developers and creators worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
            <button 
              onClick={() => setActiveTab('projects')}
              className="bg-primary-500 hover:bg-primary-600 transition-colors h-14 px-8 rounded-full text-white text-base font-semibold shadow-xl shadow-primary-500/25 w-full sm:w-auto"
            >
              Explore Our Projects
            </button>
            <button 
              onClick={() => setActiveTab('about')}
              className="h-14 px-8 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-colors text-base font-semibold w-full sm:w-auto"
            >
              Learn More About Us
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-card p-8 rounded-3xl text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 mx-auto bg-primary-50 dark:bg-primary-500/10 rounded-2xl flex items-center justify-center text-primary-500 mb-6 group-hover:scale-110 transition-transform">
              <Code size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Open Source First</h3>
            <p className="text-gray-500 dark:text-gray-400">
              We believe in the power of community. Our tools are built in the open, allowing everyone to contribute, learn, and grow together.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 mx-auto bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
              <Cpu size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Modern Technology</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Leveraging the latest frameworks and architectures to ensure our software is fast, secure, and incredibly efficient.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 mx-auto bg-green-50 dark:bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition-transform">
              <Globe size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Global Reach</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Designing digital experiences that transcend borders, making technology accessible and intuitive for users everywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Developer Support Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="relative glass-card rounded-3xl p-8 md:p-12 text-center overflow-hidden border border-primary-500/20 shadow-2xl shadow-primary-500/5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent pointer-events-none" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 relative z-10">
            Support the Development ☕
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed relative z-10 max-w-2xl mx-auto">
            Building and maintaining free, high-quality open-source software takes countless hours of coding, debugging, and late nights. If these tools have made your life easier, consider supporting the development to keep the servers running and new features coming!
          </p>
          <button
            onClick={() => setShowDonateModal(true)}
            className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25 relative z-10 hover:scale-105 duration-200"
          >
            Donate to Developer
          </button>
        </div>
      </div>

      {/* Donate Modal Overlay */}
      {showDonateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setShowDonateModal(false)} />
          
          <div className="relative bg-white dark:bg-[#0F172A] w-full max-w-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Heart size={20} className="text-pink-500 fill-pink-500" />
                Support Developer
              </h3>
              <button onClick={() => setShowDonateModal(false)} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 flex flex-col items-center justify-center text-center custom-scrollbar">
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
          </div>
        </div>
      )}
    </div>
  );
}
