import React, { useState } from 'react';
import Button from '../ui/Button';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear field-specific error when user types
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrors({});

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-100" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-wider text-teal-600 uppercase mb-3">Get in Touch</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            We're Here for Your Smile
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Left Side: Contact Details & Map */}
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              {/* Contact Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                {/* Phone & Email */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1.01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-slate-900 text-lg">Call Us</h4>
                    </div>
                    <p className="text-slate-600 pl-13">(555) 123-4567</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-slate-900 text-lg">Email Us</h4>
                    </div>
                    <p className="text-slate-600 pl-13">hello@dentalclinic.com</p>
                  </div>
                </div>

                {/* Address & Hours */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-slate-900 text-lg">Location</h4>
                    </div>
                    <p className="text-slate-600 pl-13 leading-relaxed">
                      123 Smile Boulevard<br />
                      Suite 400<br />
                      Cityville, ST 12345
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Part - Replaces Emergency CTA */}
              <div className="w-full h-[250px] rounded-2xl overflow-hidden border border-slate-100 grayscale hover:grayscale-0 transition-all duration-500">
                <iframe 
                  title="Our Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.5657354013143!2d-81.65061618485038!3d30.3284709817757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5b71948796119%3A0x63345d070b4f8d97!2sDowntown%20Jacksonville%2C%20Jacksonville%2C%20FL!5e0!3m2!1sen!2sus!4v1654321098765!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact / Consultation Form */}
          <div className="h-full w-full bg-slate-50 rounded-2xl border border-slate-200 p-8 shadow-inner">
            <h4 className="font-bold text-slate-900 mb-6 text-xl">Ask a Question / Consult</h4>
            
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h5 className="text-lg font-bold text-slate-900 mb-2">Message Sent!</h5>
                <p className="text-slate-600 text-sm mb-6">Thank you. We will reply to your email shortly.</p>
                <Button onClick={() => setStatus('idle')} variant="outline" className="w-full">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === 'error' && !Object.keys(errors).length && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm mb-4">
                    Failed to send message. Please try again.
                  </div>
                )}
                
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border ${errors.name ? 'border-red-300 focus:ring-red-500/20' : 'border-slate-200 focus:ring-teal-500/20'} focus:bg-white focus:outline-none focus:ring-2 focus:border-teal-500 transition-all`}
                    placeholder="John Doe"
                    disabled={status === 'loading'}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500 font-medium">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">Email (Gmail)</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border ${errors.email ? 'border-red-300 focus:ring-red-500/20' : 'border-slate-200 focus:ring-teal-500/20'} focus:bg-white focus:outline-none focus:ring-2 focus:border-teal-500 transition-all`}
                    placeholder="john@gmail.com"
                    disabled={status === 'loading'}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1">Consultation / Question</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border ${errors.message ? 'border-red-300 focus:ring-red-500/20' : 'border-slate-200 focus:ring-teal-500/20'} focus:bg-white focus:outline-none focus:ring-2 focus:border-teal-500 transition-all resize-none`}
                    placeholder="How can we help you today?"
                    disabled={status === 'loading'}
                  ></textarea>
                  {errors.message && <p className="mt-1 text-xs text-red-500 font-medium">{errors.message}</p>}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full mt-2"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending...' : 'Contact Us'}
                </Button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
