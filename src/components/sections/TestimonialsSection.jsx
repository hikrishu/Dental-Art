import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      treatment: "Cosmetic Dentistry",
      quote: "I've always been terrified of the dentist, but this clinic completely changed my perspective. The staff is unbelievably kind, and the space feels more like a calm spa than a clinic. I couldn't be happier with my new smile.",
      initial: "S"
    },
    {
      name: "Michael Thompson",
      treatment: "Dental Implants",
      quote: "The transition from losing a tooth to getting a permanent implant was seamless. They treated me like a person, not just a patient. My confidence is finally back, and I can't stop smiling!",
      initial: "M"
    },
    {
      name: "Emily Rodriguez",
      treatment: "Orthodontic Treatment",
      quote: "The level of care my family receives here is unmatched. From the front desk to the dental chair, everyone makes you feel valued. My daughter actually looks forward to her visits now.",
      initial: "E"
    },
    {
      name: "David Chen",
      treatment: "Routine Care & Whitening",
      quote: "Professional, efficient, and genuinely caring. They took the time to explain every step of my treatment plainly. Honestly the best cleaning I've ever had in years.",
      initial: "D"
    },
    {
      name: "Sofia Martinez",
      treatment: "Emergency Care",
      quote: "I was dreading the root canal, but it was practically painless. The technology they use is amazing, and the environment is so relaxing. Truly the gold standard of care.",
      initial: "S"
    },
    {
      name: "James Wilson",
      treatment: "General Dentistry",
      quote: "Very thorough but gentle. The staff shared tips for my oral health without sounding preachy. Found my forever dental clinic! Highly recommended to anyone looking for a change.",
      initial: "J"
    }
  ];

  // Double the list to create the infinite scroll effect
  const scrollingTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden" id="stories">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-slate-50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 px-4">
          <h2 className="text-sm font-bold tracking-wider text-teal-600 uppercase mb-3">Patient Stories</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Smiles that Speak for Themselves
          </h3>
          <p className="text-lg text-slate-600">
            Hear what our patients have to say about their experience with our dedicated, caring team.
          </p>
        </div>

        {/* Testimonials Infinite Scroll Container */}
        <div className="relative w-full">
          {/* Faded edges effect */}
          <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-20 pointer-events-none hidden md:block"></div>
          <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-20 pointer-events-none hidden md:block"></div>

          <div className="flex overflow-hidden group">
            <div className="flex animate-infinite-scroll group-hover:pause-animation gap-6 py-4">
              {scrollingTestimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="w-[350px] md:w-[450px] flex-shrink-0 bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-500 hover:border-teal-100 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] relative"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="text-slate-700 leading-relaxed mb-8 italic font-serif text-lg">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-inner">
                      {testimonial.initial}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{testimonial.name}</div>
                      <div className="text-sm font-medium text-teal-600 mt-0.5 uppercase tracking-wide text-[0.7rem]">{testimonial.treatment}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
        .pause-animation {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
};

export default TestimonialsSection;
