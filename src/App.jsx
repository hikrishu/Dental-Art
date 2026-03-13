import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Lenis from 'lenis';

// Layout & Components
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import TrustSection from './components/sections/TrustSection';
import AboutSection from './components/sections/AboutSection';
import ServicesSection from './components/sections/ServicesSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import BookingSection from './components/sections/BookingSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/sections/Footer';

// Admin Pages & Auth
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

// --- Protected Route Wrapper ---
const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-10 h-10 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin"></div>
    </div>
  );
  
  if (!token) return <Navigate to="/login" replace />;
  
  return children;
};

// --- Main Website Landing Page ---
const Home = () => {
  useEffect(() => {
    // Scroll Reset for SPA context
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Anchor smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) lenis.scrollTo(target);
        }
      });
    });

    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <div id="home">
        <HeroSection />
        <TrustSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="stories">
        <TestimonialsSection />
      </div>
      <div id="appointment">
        <BookingSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Website */}
          <Route path="/" element={<Home />} />
          
          {/* Admin Auth */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Dashboard */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

