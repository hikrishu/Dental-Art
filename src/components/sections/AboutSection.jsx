import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  const keyPoints = [
    "Commitment to the highest standards of clinical hygiene",
    "Tailored treatment plans for every individual",
    "A calm, welcoming, and anxiety-free environment",
    "Transparent pricing and clear communication"
  ];

  const fadeInRight = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Side */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInRight}
            className="relative order-2 lg:order-1 group"
          >
            <div className="absolute inset-0 bg-teal-50 rounded-[2rem] transform -rotate-3 scale-105 z-0 group-hover:rotate-0 transition-transform duration-700"></div>
            <div className="relative z-10 bg-white rounded-[2rem] overflow-hidden aspect-square md:aspect-[4/3] border border-slate-200/50 shadow-sm shadow-teal-900/5">
              <img 
                src="/images/about_clinic.png" 
                alt="Modern Dental Clinic" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Hygiene Badge - Dentist Vibes */}
              <motion.div 
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-teal-100 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                <span className="text-[0.7rem] font-bold text-slate-800 uppercase tracking-widest">100% Sterilized & Safe</span>
              </motion.div>
            </div>
            
            {/* Experience Badge */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1.1, opacity: 1 }}
              whileHover={{ scale: 1.2 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute top-8 -right-4 md:-right-8 bg-white p-5 rounded-2xl shadow-xl z-20 hidden sm:block border border-slate-50"
            >
              <div className="text-3xl font-extrabold text-teal-600 mb-1">15+</div>
              <p className="text-sm font-medium text-slate-600">Years of<br/>Excellence</p>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInLeft}
            className="order-1 lg:order-2"
          >
            <h2 className="text-sm font-bold tracking-wider text-teal-600 uppercase mb-3">About Our Clinic</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              Redefining the Dental Experience
            </h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We believe that a visit to the dentist shouldn't feel like a chore. Our mission is to combine state-of-the-art clinical expertise with a warm, human touch, ensuring that every patient leaves our clinic with a healthier, brighter smile and complete peace of mind.
            </p>

            <ul className="space-y-4">
              {keyPoints.map((point, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  className="flex items-start gap-3 text-slate-700"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="font-medium text-[1.05rem]">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
