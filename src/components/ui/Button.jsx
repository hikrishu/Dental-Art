import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  href,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 ease-in-out";
  
  const variants = {
    primary: "bg-teal-600 text-white hover:bg-teal-700 hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-white text-teal-800 border-2 border-teal-100 hover:border-teal-600 hover:text-teal-900",
    outline: "border-2 border-slate-200 text-slate-700 hover:border-slate-800 hover:text-slate-900",
  };

  return href ? (
    <a 
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  ) : (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
