import React, { useState } from 'react'; // Ajout de useState
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour le menu
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm transition-all duration-300">
      <div className="w-full flex justify-between items-center py-2 px-6 md:px-10">
        
        {/* Logo Section */}
        <div className="z-50 flex items-center">
          <Link 
            to="/" 
            className="flex items-center hover:opacity-60 transition-opacity duration-300"
          >
            <img 
              src="/images/MEDIGRAPHY_LOGO-removebg-preview.png" 
              alt="Medigraphy" 
              className="h-16 md:h-20 w-auto"
              style={{ objectFit: 'contain', maxWidth: '250px' }}
            />
          </Link>
        </div>
        
        {/* Navigation Desktop */}
        <nav className="hidden md:flex space-x-12 text-[10px] font-medium tracking-[0.25em] uppercase items-center">
          <Link to="/" className={`transition-all duration-300 ${isActive('/') ? 'text-black border-b border-black pb-1' : 'text-gray-400 hover:text-black'}`}>
            Selected Work
          </Link>
          <Link to="/contact" className={`transition-all duration-300 ${isActive('/contact') ? 'text-black border-b border-black pb-1' : 'text-gray-400 hover:text-black'}`}>
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button (3 Dots) - CORRIGÉ */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Déclenche l'ouverture
          className="md:hidden flex items-center justify-center p-2 text-black hover:opacity-60 transition-opacity z-50 relative"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="4" r="2" fill="currentColor"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
            <circle cx="12" cy="20" r="2" fill="currentColor"/>
          </svg>
        </button>

        {/* Menu Mobile - AJOUTÉ */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 text-[12px] font-medium tracking-[0.3em] uppercase transition-transform duration-500 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <Link 
            to="/" 
            onClick={() => setIsMenuOpen(false)} // Ferme le menu après clic
            className={isActive('/') ? 'text-black' : 'text-gray-400'}
          >
            Selected Work
          </Link>
          <Link 
            to="/contact" 
            onClick={() => setIsMenuOpen(false)}
            className={isActive('/contact') ? 'text-black' : 'text-gray-400'}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;