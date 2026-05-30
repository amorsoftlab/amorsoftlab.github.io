import React, { useState } from 'react';
import { Rocket, Award, Globe, Cpu, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function About() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const coreValues = [
    { icon: <Rocket size={24} />, title: 'Performance First', desc: 'Every application we craft is optimized for resource usage, startups, and lightning-fast render speeds.' },
    { icon: <Award size={24} />, title: 'Premium Aesthetics', desc: 'We believe functional software should also be visually striking. We design interfaces that inspire and delight users.' },
    { icon: <Globe size={24} />, title: 'Open Source', desc: 'We are committed to public development, providing developer tools, desktop extensions, and core utilities for all.' }
  ];

  const technologies = [
    { name: 'TypeScript', desc: 'Type Safety' },
    { name: 'React', desc: 'UI Core' },
    { name: 'Electron', desc: 'Desktop Apps' },
    { name: 'Node.js', desc: 'Backends' },
    { name: 'Go', desc: 'Microservices' },
    { name: 'Flutter', desc: 'Mobile Apps' }
  ];

  return (
    <div className="w-full bg-gray-50 dark:bg-[#0B0F19] min-h-screen pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About AmorSoftLabs</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Innovating digital solutions with clean architectures and gorgeous user interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Info */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="glass-card rounded-3xl p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Who We Are</h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4 text-lg">
                AmorSoftLabs is a development studio dedicated to crafting state-of-the-art tools,
                utilities, and core libraries. We specialize in cross-platform desktop engineering,
                hybrid mobile application pipelines, and performant web microservices.
              </p>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">
                All our products are developed open-source. We prioritize clean architectures, 
                high speed, zero bloated code bases, and premium design language.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreValues.map((value, idx) => (
                <div key={idx} className="glass-card rounded-3xl p-6 md:col-span-2 lg:col-span-1 flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-primary-500/10 text-primary-500 flex items-center justify-center flex-shrink-0">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{value.title}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card rounded-3xl p-8 sm:p-10 mt-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Technology Matrix</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {technologies.map(tech => (
                  <div key={tech.name} className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 text-center transition-transform hover:-translate-y-1">
                    <Cpu size={24} className="text-primary-500 mb-2" />
                    <span className="font-bold text-sm text-gray-900 dark:text-white mb-1">{tech.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{tech.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-3xl p-8 sm:p-10 sticky top-24">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Get In Touch</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                Have questions about our software or looking for custom collaborations? Shoot us a message.
              </p>

              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-500/10 text-green-600 dark:text-green-400 rounded-2xl border border-green-500/20 flex items-center gap-3 font-medium">
                  <CheckCircle2 size={20} />
                  Message sent successfully!
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Email</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 disabled:opacity-70 disabled:hover:bg-primary-500 text-white font-medium py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-primary-500/25"
                >
                  {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
