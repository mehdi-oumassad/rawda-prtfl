import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="flex-grow w-full min-h-screen pt-32 pb-12 px-6 md:px-12 lg:px-24 bg-white">
      
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start justify-between">
        
        {/* Colonne de Gauche - Contenu Textuel */}
        <div className="w-full lg:w-3/5 flex flex-col justify-between order-1">
          
          {/* Section Introduction */}
          <div className="w-full max-w-3xl">
            <p className="font-serif text-xl md:text-2xl leading-relaxed mb-12 text-black">
              Medigraphy is a Moroccan fashion photographer and art director who tells stories through images. His work grows from everyday Moroccan culture, architecture, and landscapes, where fashion meets emotion and atmosphere. Drawn to minimalism, quiet luxury, and avant-garde expression, he creates visuals that feel calm, intentional, and deeply present, images meant to be felt, not just seen.
            </p>
          </div>

          {/* PHOTO - Affichée ici uniquement sur Mobile (order-2) */}
          <div className="w-full lg:hidden mb-16 order-2">
            <div className="relative w-full aspect-[3/4] overflow-hidden shadow-lg">
              <img 
                src="/images/DSC09431.jpg" 
                alt="Medigraphy - Photographer" 
                className="w-full h-full object-cover grayscale transition-all duration-700 ease-out"
              />
            </div>
          </div>
          
          {/* Section Clients & Contact - (order-3 sur mobile) */}
          <div className="w-full max-w-3xl order-3">
            {/* Client List */}
            <div className="mb-16 lg:mb-24">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-6 text-black">
                Selected Clients
              </h3>
              <p>
                HOUSE OF DMANA — DREAM WEAVE — LUNE DE JOUR — KAMTIS — KIFESH STORE — ALKARA  — CLAQUE-KADE              </p>
            </div>

            {/* Footer / Contact Details */}
            <div className="flex flex-col space-y-2 pt-12 border-t border-gray-100 lg:border-none">
              <a 
                href="mailto:medigraphyone@gmail.com" 
                className="font-sans text-sm text-gray-400 hover:text-black transition-colors duration-300 w-max"
              >
                medigraphyone@gmail.com
              </a>
              
              <address className="font-sans text-sm text-gray-300 not-italic leading-relaxed">
                Morocco
              </address>
              
              <footer className="w-full py-10">
                <div className="text-left">
                  <p className="text-[8px] md:text-[10px] tracking-[0.3em] text-gray-400 uppercase">
                    © {new Date().getFullYear()} Medigraphy. All Rights Reserved.
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </div>

        {/* Colonne de Droite - Photo pour Desktop uniquement (hidden sur mobile) */}
        <div className="hidden lg:flex lg:w-2/5 items-center justify-end order-2">
          <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden shadow-lg">
            <img 
              src="/images/DSC09431.jpg" 
              alt="Medigraphy - Photographer" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;