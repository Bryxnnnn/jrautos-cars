import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('home') },
    { path: '/inventory', label: t('inventory') },
    { path: '/services', label: t('services') },
    { path: '/about', label: t('about') },
    { path: '/contact', label: t('contact') },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      data-testid="navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            data-testid="logo-link"
            className="flex items-center"
          >
            <img 
              src="https://customer-assets.emergentagent.com/job_carmex-queretary/artifacts/qi322g9c_Screenshot%202026-01-30%20192319.png" 
              alt="JR Autos"
              className="w-32 md:w-40 h-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-${link.path.replace('/', '') || 'home'}`}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  isActive(link.path) 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              data-testid="language-toggle"
              className="flex items-center space-x-2 px-3 py-2 rounded-full border border-white/20 text-sm text-gray-300 hover:text-white hover:border-white/40 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Call Now Button */}
            <a
              href="tel:+524481085706"
              data-testid="call-now-btn"
              className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <Phone className="w-4 h-4" />
              <span>{t('callNow')}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            data-testid="mobile-menu-btn"
            className="md:hidden p-2 text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  data-testid={`mobile-nav-${link.path.replace('/', '') || 'home'}`}
                  className={`block py-3 text-lg font-medium ${
                    isActive(link.path) ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-4 flex items-center space-x-4">
                <button
                  onClick={toggleLanguage}
                  data-testid="mobile-language-toggle"
                  className="flex items-center space-x-2 px-4 py-2 rounded-full border border-white/20 text-sm text-gray-300"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language.toUpperCase()}</span>
                </button>
                
                <a
                  href="tel:+524481085706"
                  data-testid="mobile-call-btn"
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t('callNow')}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
