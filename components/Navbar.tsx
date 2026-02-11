import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-white/90 backdrop-blur-md border-b border-gray-50 transition-all duration-300">
      <div className="w-full h-20 md:h-24 flex justify-between items-center px-6 md:px-10">
        
        {/* Logo */}
        <div className="z-[110]">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img 
              src="/images/MEDIGRAPHY_LOGO-removebg-preview.png" 
              alt="Medigraphy" 
              className="h-12 md:h-16 w-auto transition-transform duration-500 hover:scale-105"
            />
          </Link>
        </div>
        
        {/* Nav Desktop */}
        <nav className="hidden md:flex space-x-12 text-[10px] font-medium tracking-[0.25em] uppercase">
          <Link to="/" className={`hover:text-black transition-colors ${isActive('/') ? 'text-black font-bold' : 'text-gray-400'}`}>
            Selected Work
          </Link>
          <Link to="/contact" className={`hover:text-black transition-colors ${isActive('/contact') ? 'text-black font-bold' : 'text-gray-400'}`}>
            Contact
          </Link>
        </nav>

        {/* Mobile Button (Les 3 points) */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-[110] p-2 text-black outline-none flex flex-col gap-1.5 items-center justify-center"
        >
          <span className={`w-1 h-1 bg-black rounded-full transition-all ${isMenuOpen ? 'scale-150 bg-red-500' : ''}`}></span>
          <span className={`w-1 h-1 bg-black rounded-full transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-1 h-1 bg-black rounded-full transition-all ${isMenuOpen ? 'scale-150 bg-red-500' : ''}`}></span>
        </button>

        {/* Fullscreen Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          
          {/* Liens du Menu */}
          <div className="flex flex-col items-center space-y-10 text-[14px] tracking-[0.4em] uppercase">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:scale-110 transition-transform">
              Selected Work
            </Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:scale-110 transition-transform">
              Contact
            </Link>
          </div>
        
          
        </div> 

      </div>
    </header>
  );
};

export default Navbar;