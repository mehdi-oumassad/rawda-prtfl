import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  isCompact?: boolean; // True for portrait images, false for landscape
}

const Navbar: React.FC<NavbarProps> = ({ isCompact = false }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const isSelectedWork = location.pathname === '/';

  return (
    <header 
      className={`
        fixed top-0 left-0 w-full z-50 
        transition-all duration-[400ms] ease-in-out
        ${isSelectedWork ? 'bg-transparent' : 'bg-white/90 backdrop-blur-sm'}
      `}
      style={{
        // Mix blend mode for Selected Work page only
        mixBlendMode: isSelectedWork ? 'normal' : 'normal'
      }}
    >
      <div 
        className={`
          w-full flex justify-between items-center px-6 md:px-10
          transition-all duration-[400ms] ease-in-out
          ${isCompact ? 'py-2' : 'py-4'}
        `}
      >
        
        {/* Logo Section */}
        <div className="z-50">
          <Link 
            to="/" 
            className="flex items-center transition-all duration-300 hover:opacity-80"
          >
            <img 
              src="/images/MEDIGRAPHY_LOGO-removebg-preview.png" 
              alt="Medigraphy - Magical Vision" 
              className={`
                w-auto transition-all duration-[400ms] ease-in-out
                ${isCompact ? 'h-12 md:h-14' : 'h-16 md:h-16'}
              `}
              style={{ 
                objectFit: 'contain',
                maxWidth: '200px',
                // Mix blend mode for Selected Work page
                mixBlendMode: isSelectedWork ? 'difference' : 'normal',
                filter: isSelectedWork ? 'invert(0)' : 'none'
              }}
            />
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex space-x-12 text-[10px] font-medium tracking-[0.25em] uppercase">
          <Link 
            to="/" 
            className={`
              transition-all duration-300
              ${isActive('/') 
                ? 'text-black border-b border-black pb-1' 
                : 'text-gray-400 hover:text-black'
              }
            `}
            style={{
              mixBlendMode: isSelectedWork ? 'difference' : 'normal'
            }}
          >
            Selected Work
          </Link>
          <Link 
            to="/contact" 
            className={`
              transition-all duration-300
              ${isActive('/contact') 
                ? 'text-black border-b border-black pb-1' 
                : 'text-gray-400 hover:text-black'
              }
            `}
            style={{
              mixBlendMode: isSelectedWork ? 'difference' : 'normal'
            }}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Icon */}
        <button 
          className={`
            md:hidden flex items-center justify-center p-2 
            transition-opacity duration-300 hover:opacity-60
            text-black
          `}
        >
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