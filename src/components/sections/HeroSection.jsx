import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
    },
  };

  return (
    <section className="relative bg-[#F8FAFC] overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-36" id="home">
      {/* Background Decor */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-50 blur-3xl border pointer-events-none"
      ></motion.div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.15]">
              Expert, Compassionate Dental Care for Your Family
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
              Experience modern, pain-free dentistry in a relaxing environment. We use the latest technology to ensure your smile is bright, healthy, and confident.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button href="#appointment" variant="primary" className="text-lg">
                Book Appointment
              </Button>
              <Button href="#services" variant="secondary" className="text-lg">
                View Services
              </Button>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-10 flex items-center gap-4 text-sm text-slate-500 font-medium">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center overflow-hidden shadow-sm text-slate-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                ))}
              </div>
              <p>Trusted by over 2,000+ local patients</p>
            </motion.div>
          </motion.div>

          {/* Visual Area */}
          <motion.div 
            initial="hidden"
            animate="visible"
            className="relative mt-8 lg:mt-0 lg:ml-8"
          >
            {/* Background Blob/Shape for vibrancy */}
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4] 
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute -inset-4 md:-inset-8 bg-teal-100/40 rounded-full blur-3xl pointer-events-none"
            ></motion.div>
            
            <motion.div 
              variants={imageVariants}
              className="relative rounded-3xl overflow-hidden shadow-2xl bg-white aspect-[4/3] lg:aspect-[4/5] flex items-center justify-center border border-slate-100/50 group"
            >
              {/* Actual Image */}
              <img 
                src="/images/hero_dentist.png" 
                alt="Expert Dentist" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Premium Overlay Filter */}
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent pointer-events-none"></div>

              {/* Sparkle Effect - Dentist Vibes */}
              <motion.div
                animate={{ 
                  scale: [0, 1.2, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.5, 1] }}
                className="absolute top-1/4 right-1/4 text-white pointer-events-none"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </motion.div>
            </motion.div>
            
            {/* Floating Badge (Trust Element) */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-6 -left-6 md:bottom-12 md:-left-12 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-50 cursor-pointer"
            >
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 shrink-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-slate-800 leading-tight">4.9/5 Rating</p>
                <p className="text-[0.65rem] text-slate-500 font-bold uppercase tracking-wider mt-0.5">500+ Reviews</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
