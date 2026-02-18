import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm transition-all duration-300"
    >
      <div className="w-full flex justify-between items-center py-4 px-6 md:px-10">
        
        {/* Logo Section */}
        <div className="z-50">
          <Link 
            to="/" 
            className="flex items-center transition-all duration-300 hover:opacity-60"
          >
            <img 
              src="/images/MEDIGRAPHY_LOGO-removebg-preview.png" 
              alt="Medigraphy - Magical Vision" 
              className="h-16 md:h-16 w-auto"
              style={{ 
                objectFit: 'contain',
                maxWidth: '200px',
                paddingLeft: '0px'
              }}
            />
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex space-x-12 text-[10px] font-medium tracking-[0.25em] uppercase">
          <Link 
            to="/" 
            className={`transition-all duration-300 ${
              isActive('/') 
                ? 'text-black border-b border-black pb-1' 
                : 'text-gray-400 hover:text-black'
            }`}
          >
            Selected Work
          </Link>
          <Link 
            to="/contact" 
            className={`transition-all duration-300 ${
              isActive('/contact') 
                ? 'text-black border-b border-black pb-1' 
                : 'text-gray-400 hover:text-black'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Icon */}
        <button className="md:hidden flex items-center justify-center p-2 text-black hover:opacity-60 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="4" r="2" fill="currentColor"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
            <circle cx="12" cy="20" r="2" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;