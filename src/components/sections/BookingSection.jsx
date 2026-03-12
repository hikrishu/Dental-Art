import React, { useState } from 'react';
import Button from '../ui/Button';

const BookingSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.date) newErrors.date = 'Please select a date';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('loading');

    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Map frontend field names to what the backend model expects
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          preferredDate: formData.date,
          preferredTime: formData.time || 'Any Time',
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
      } else {
        console.error('Submission failed:', data.error);
        setStatus('error');
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (error) {
      console.error('Network error:', error);
      setStatus('error');
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-300";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-2";

  return (
    <section className="py-16 md:py-24 bg-teal-900 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-800 rounded-full blur-3xl opacity-50 transform translate-x-1/3 -translate-y-1/3"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          <div className="p-8 md:p-12 lg:p-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Book Your Appointment
              </h2>
              <p className="text-slate-600 text-lg">
                Schedule a visit with our expert dental team. We'll get back to you promptly to confirm.
              </p>
            </div>

            {status === 'success' ? (
              <div className="text-center py-12 bg-teal-50 rounded-2xl border border-teal-100">
                <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
                <p className="text-slate-600 max-w-md mx-auto mb-8">
                  Thank you, {formData.fullName}. We have received your appointment request and our team will contact you shortly to confirm the exact time.
                </p>
                <Button 
                  onClick={() => {
                    setStatus('idle');
                    setFormData({ fullName: '', phone: '', email: '', service: '', date: '', time: '', message: '' });
                    setErrors({});
                  }}
                  variant="outline"
                >
                  Book Another Appointment
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {status === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="font-medium text-sm">Something went wrong. Please try submitting the form again.</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className={labelClasses}>Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`${inputClasses} ${errors.fullName ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                      disabled={status === 'loading'}
                    />
                    {errors.fullName && <p className="mt-2 text-sm text-red-500">{errors.fullName}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      className={`${inputClasses} ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                      disabled={status === 'loading'}
                    />
                    {errors.phone && <p className="mt-2 text-sm text-red-500">{errors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelClasses}>Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`${inputClasses} ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                      disabled={status === 'loading'}
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  {/* Service */}
                  <div>
                    <label htmlFor="service" className={labelClasses}>Service Needed</label>
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={`${inputClasses} appearance-none ${errors.service ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                        disabled={status === 'loading'}
                      >
                        <option value="">Select a service...</option>
                        <option value="routine_checkup">Routine Checkup & Cleaning</option>
                        <option value="whitening">Teeth Whitening</option>
                        <option value="implants">Dental Implants</option>
                        <option value="root_canal">Root Canal Treatment</option>
                        <option value="orthodontics">Orthodontic Treatment</option>
                        <option value="cosmetic">Cosmetic Dentistry</option>
                        <option value="other">Other / Not Sure</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                    {errors.service && <p className="mt-2 text-sm text-red-500">{errors.service}</p>}
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="date" className={labelClasses}>Preferred Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`${inputClasses} ${errors.preferredDate || errors.date ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                      disabled={status === 'loading'}
                    />
                    {(errors.preferredDate || errors.date) && <p className="mt-2 text-sm text-red-500">{errors.preferredDate || errors.date}</p>}
                  </div>

                  {/* Time */}
                  <div>
                    <label htmlFor="time" className={labelClasses}>Preferred Time</label>
                    <div className="relative">
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={`${inputClasses} appearance-none`}
                        disabled={status === 'loading'}
                      >
                        <option value="">Any Time</option>
                        <option value="morning">Morning (8AM - 11AM)</option>
                        <option value="mid_day">Mid-day (11AM - 2PM)</option>
                        <option value="afternoon">Afternoon (2PM - 5PM)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelClasses}>Additional Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about any specific concerns or pain..."
                    className={`${inputClasses} resize-none`}
                    disabled={status === 'loading'}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto min-w-[200px] h-14"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Request...
                      </span>
                    ) : (
                      "Confirm Appointment"
                    )}
                  </Button>
                  <p className="mt-4 text-xs text-slate-500 text-center sm:text-left">
                    By submitting this form, you agree to our privacy policy. Your information is secure.
                  </p>
                </div>

              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
