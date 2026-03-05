import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  isCompact?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isCompact = false }) => {
  const [isOpen, setIsOpen] = useState(false); // État pour le menu mobile
  const location = useLocation();
  const isSelectedWork = location.pathname === '/';

  const navLinks = [
    { name: 'Selected Work', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 
      ${isSelectedWork && !isOpen ? 'bg-transparent' : 'bg-white shadow-sm'}`}
    >
      <div className={`w-full flex justify-between items-center px-6 md:px-10 transition-all duration-500 ${isCompact ? 'py-3' : 'py-6'}`}>
        
        {/* LOGO */}
        <div className="z-[110]">
          <Link to="/">
            <img 
              src="/images/optimized-MEDIGRAPHY_LOGO-removebg-preview.webp" 
              alt="Logo" 
              className={`w-auto transition-all ${isCompact ? 'h-10' : 'h-14'}`}
              style={{ mixBlendMode: isSelectedWork && !isOpen ? 'difference' : 'normal' }}
            />
          </Link>
        </div>

        {/* DESKTOP NAV (Cachée sur mobile) */}
        <nav className="hidden md:flex space-x-10 text-[10px] tracking-[0.3em] uppercase">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className="hover:opacity-50 transition-opacity"
              style={{ mixBlendMode: isSelectedWork ? 'difference' : 'normal' }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* MOBILE BUTTON (Les 3 points) */}
        <button 
  onClick={() => setIsOpen(!isOpen)}
  className="md:hidden z-[120] p-2 relative" // Augmentation du z-index
  style={{ 
    // On force la couleur blanche pour que le 'difference' les rende noirs sur fond blanc
    color: 'white', 
    mixBlendMode: 'difference',
    display: 'block' // Force l'affichage si un parent le cachait
  }}
>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="2.5"/>
    <circle cx="12" cy="12" r="2.5"/>
    <circle cx="12" cy="19" r="2.5"/>
  </svg>
</button>

        {/* MOBILE MENU OVERLAY (S'affiche quand isOpen est vrai) */}
        <div className={`fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center transition-transform duration-500 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <nav className="flex flex-col space-y-8 text-center">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsOpen(false)} // Ferme le menu après clic
                className="text-black text-lg tracking-[0.4em] uppercase font-light"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

      </div>
    </header>
  );
};

export default Navbar;