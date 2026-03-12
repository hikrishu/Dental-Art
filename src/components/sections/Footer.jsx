import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Brief Summary */}
          <div className="lg:col-span-1">
            <a href="#home" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <span className="block font-extrabold text-xl text-white tracking-tight leading-none transition-colors group-hover:text-teal-400">
                  Dental Art
                </span>
                <span className="block text-[0.6rem] uppercase tracking-widest text-slate-400 font-bold leading-none mt-1">
                  Multispeciality Clinic
                </span>
              </div>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Experience state-of-the-art dental care with a personal touch. We combine modern technology with a gentle approach for your perfect smile.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {/* Facebook */}
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54v-2.2c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z" />
                </svg>
              </a>
              {/* X (Twitter) */}
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1" aria-label="X">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1" aria-label="TikTok">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31 0 2.57.51 3.51 1.44.24.24.45.5.64.77 1.25-.13 2.44-.63 3.42-1.42l.06-.05.15.54c.32 1.15.3 2.37-.05 3.5-.32 1.05-.9 2.01-1.69 2.76-.02.02-.02.03-.02.05-.01.14-.01.27-.01.41 0 5.17-2.61 9.92-6.84 12.83-2.27 1.56-4.99 2.38-7.75 2.38-1.55 0-3.08-.26-4.54-.78l-.13-.05.21-.43c.42-.87.95-1.67 1.57-2.39.26-.3.54-.58.85-.84l.03-.02.03-.01c.2-.07.41-.12.63-.15h.01c.24-.04.49-.06.74-.06.76 0 1.5.17 2.18.5.15.07.29.15.42.24.01.01.02.02.03.02.13.08.27.08.41.01.1-.05.17-.14.21-.24.03-.08.04-.17.04-.26 0-.09-.01-.18-.04-.26-.04-.1-.11-.19-.21-.24l-.19-.11c-.5-.28-1.07-.42-1.65-.42-.51 0-1 .11-1.45.32-.4.18-.75.44-1.04.77-.04.05-.09.11-.13.16l-.08.11c-.5-.87-.8-1.84-.87-2.85v-.43c.05-.97.28-1.92.68-2.8.4-.87.97-1.63 1.67-2.22l.14-.12-.1-.16c-.22-.36-.31-.77-.28-1.19.03-.41.2-.8.47-1.12.23-.27.53-.47.87-.58l.18-.05-.13-.13c-.3-.3-.54-.64-.73-1.01C3.12 7.05 3 6.09 3.03 5.14c.04-.95.27-1.89.68-2.75.4-.86.97-1.61 1.67-2.2l.14-.12-.13-.13C5.09.28 4.79.22 4.49.23 4.19.24 3.9.33 3.65.5l-.18.13c-.56-.56-1.24-.98-1.98-1.24-.74-.26-1.53-.35-2.32-.26L-.43-1l.31.29c.77.72 1.34 1.64 1.64 2.65.2.66.3 1.35.3 2.04 0 .42-.04.83-.12 1.24-.12.59-.36 1.15-.71 1.65-.35.5-.8 1.15-1.08 1.64-1.58-.29-2.07-1.16-2.07-1.16.27 1.08.82 2.06 1.58 2.85l.13.14-.19.01c-.65.03-1.29-.11-1.88-.42l-.17-.09.02.2c.11 1.1.58 2.14 1.34 2.97.76.83 1.76 1.41 2.87 1.66l.2.04-.19.06c-.34.11-.7.16-1.06.16-.25 0-.5-.03-.74-.08l-.2-.04.06.19c.45 1.41 1.38 2.63 2.63 3.45 1.25.82 2.72 1.25 4.22 1.25.26 0 .52-.01.78-.04l.11-.01c1.33.64 1.54 1.2 1.54 1.2zm-.12 1.61c.42 0 .8.27.94.67.14.4.03.84-.28 1.13-.3.3-.73.41-1.13.28-.4-.14-.67-.52-.67-.94 0-.63.51-1.14 1.14-1.14z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-slate-200 font-bold mb-6 text-sm uppercase tracking-widest">Quick Links</h6>
            <ul className="space-y-4 text-[0.95rem] text-slate-400">
              <li><a href="#about" className="hover:text-teal-400 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-teal-500 scale-0 group-hover:scale-100 transition-transform"></span>About Our Clinic</a></li>
              <li><a href="#services" className="hover:text-teal-400 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-teal-500 scale-0 group-hover:scale-100 transition-transform"></span>Our Services</a></li>
              <li><a href="#stories" className="hover:text-teal-400 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-teal-500 scale-0 group-hover:scale-100 transition-transform"></span>Patient Stories</a></li>
              <li><a href="#appointment" className="hover:text-teal-400 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-teal-500 scale-0 group-hover:scale-100 transition-transform"></span>Book Appointment</a></li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h6 className="text-slate-200 font-bold mb-6 text-sm uppercase tracking-widest">Our Services</h6>
            <ul className="space-y-4 text-[0.95rem] text-slate-400">
              <li><a href="#services" className="hover:text-teal-400 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-teal-500 scale-0 group-hover:scale-100 transition-transform"></span>General Dentistry</a></li>
              <li><a href="#services" className="hover:text-teal-400 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-teal-500 scale-0 group-hover:scale-100 transition-transform"></span>Cosmetic Treatments</a></li>
              <li><a href="#services" className="hover:text-teal-400 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-teal-500 scale-0 group-hover:scale-100 transition-transform"></span>Orthodontics</a></li>
              <li><a href="#services" className="hover:text-teal-400 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-teal-500 scale-0 group-hover:scale-100 transition-transform"></span>Dental Implants</a></li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div>
            <h6 className="text-slate-200 font-bold mb-6 text-sm uppercase tracking-widest">Connect</h6>
            <ul className="space-y-5 text-[0.95rem] text-slate-400">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-slate-800 text-teal-500 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <span>123 Smile Boulevard, Suite 400<br/>Cityville, ST 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-slate-800 text-teal-500 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                (555) 123-4567
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-slate-800 text-teal-500 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                hello@dentalclinic.com
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright & Legal */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>&copy; {currentYear} Dental Art Clinic. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-teal-400 transition-colors uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="hover:text-teal-400 transition-colors uppercase tracking-widest">Terms</a>
            <a href="#" className="hover:text-teal-400 transition-colors uppercase tracking-widest">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
