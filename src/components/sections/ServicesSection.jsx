import React from 'react';

const ServicesSection = () => {
  const services = [
    {
      title: "Dental Implants",
      description: "Permanent replacement for missing teeth using advanced titanium technology that restores 100% natural chewing function.",
      badge: "High-Tech",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: "Root Canal Treatment",
      description: "Specialized, microscope-assisted endodontics to save natural teeth and eliminate persistent infection comfortably.",
      badge: "Precision",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Teeth Whitening",
      description: "Laser-activated clinical whitening for dramatic results in a single session. Safe, painless, and highly effective.",
      badge: "Fast Results",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: "Orthodontics",
      description: "From traditional braces to clear aligners — we align your bite for long-term health and perfect aesthetics.",
      badge: "Aesthetics",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Cosmetic Dentistry",
      description: "Porcelain veneers and digital smile design to transform your look with minimal intervention.",
      badge: "Expert Design",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Preventive Care",
      description: "Digital diagnostics and high-frequency ultrasonic cleaning to catch issues before they require complex treatment.",
      badge: "Sterilized",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden" id="services">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-teal-50/50 rounded-full blur-3xl -mr-16 -mt-16"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 px-4">
          <h2 className="text-sm font-bold tracking-wider text-teal-600 uppercase mb-3">Professional Services</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Painless Dentistry, Perfect Smile
          </h3>
          <p className="text-lg text-slate-600">
            Utilizing Swiss-engineered technology and a gentle approach for long-term oral health.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:border-teal-100 transition-all duration-500 relative"
            >
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500 transform group-hover:rotate-6 shadow-sm">
                {service.icon}
              </div>
              
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {service.title}
                </h4>
                <span className="text-[0.6rem] font-black uppercase tracking-tighter text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100/50">
                  {service.badge}
                </span>
              </div>
              
              <p className="text-slate-600 leading-relaxed text-[0.95rem]">
                {service.description}
              </p>

              <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-bold text-teal-600 uppercase tracking-widest cursor-pointer">Explore Service</span>
                <svg className="w-4 h-4 text-teal-500 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
