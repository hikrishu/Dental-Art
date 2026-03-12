import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Navigation Links array for easy maintenance
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Stories', href: '#stories' },
    { name: 'Contact', href: '#contact' },
  ];

  // Logic to handle scroll behaviors
  useEffect(() => {
    const handleScroll = () => {
      // 1. Sticky Navbar background logic
      // Become solid background with blur and shadow when scrolled down
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Active Section detection logic
      const sections = ['home', 'about', 'services', 'stories', 'contact', 'appointment'];
      let current = 'home';
      
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Check if section is currently active within a specific viewport threshold
          // (Top is above middle of screen, bottom is below middle of screen)
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click
  const handleScrollTo = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' 
          : 'bg-transparent py-6 lg:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* 1. Logo / Clinic Name */}
          <a 
            href="#home" 
            onClick={handleScrollTo}
            className="flex items-center gap-3 group cursor-pointer focus:outline-none"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 relative ${
              isScrolled ? 'bg-teal-50 text-teal-600' : 'bg-teal-100/50 text-teal-700'
            }`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              {/* Logo Sparkle */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-1 -right-1"
              >
                <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </motion.div>
            </div>
            <div>
              <span className="block font-extrabold text-lg text-slate-900 tracking-tight leading-none group-hover:text-teal-700 transition-colors">
                Dental Art
              </span>
              <span className="block text-[0.65rem] uppercase tracking-widest text-slate-500 font-bold leading-none mt-1">
                Multispeciality Clinic
              </span>
            </div>
          </a>

          {/* 2 & 5. Desktop Navigation Links with Hover Effects */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={handleScrollTo}
                      className={`relative font-semibold text-[0.95rem] transition-colors duration-300 hover:text-teal-600 ${
                        isActive ? 'text-teal-600' : 'text-slate-600'
                      }`}
                    >
                      {link.name}
                      {/* Subdued active line indicator */}
                      <span 
                        className={`absolute -bottom-1 left-0 w-full h-[2px] bg-teal-600 rounded-full transition-all duration-300 origin-left ${
                          isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                        }`}
                      ></span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* CTA Button */}
            <Button 
              href="#appointment"
              onClick={handleScrollTo}
              className={`px-6 py-2.5 text-[0.95rem] ${
                activeSection === 'appointment' ? 'ring-2 ring-teal-500/50 ring-offset-2' : ''
              }`}
            >
              Book Appointment
            </Button>
          </div>

          {/* 7. Mobile Menu Toggle Icon */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 -mr-2 transition-colors focus:outline-none rounded-lg ${
                isScrolled ? 'text-slate-600 hover:text-teal-600 hover:bg-slate-50' : 'text-slate-700 hover:text-teal-700'
              }`}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 7. Mobile Navigation Dropdown */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100 overflow-hidden transition-all duration-300 ease-in-out origin-top ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-4">
          <ul className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={handleScrollTo}
                    className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${
                      isActive 
                        ? 'bg-teal-50 text-teal-700' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-teal-600'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="px-4 pt-2">
            <Button 
              href="#appointment"
              onClick={handleScrollTo}
              className="w-full justify-center py-3"
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
