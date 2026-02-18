import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="flex-grow w-full min-h-screen pt-32 pb-12 px-6 md:px-12 lg:px-24 bg-white">
      
      {/* Main Container with Two Columns */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start justify-between">
        
        {/* Left Column - Text Content */}
        <div className="w-full lg:w-3/5 flex flex-col justify-between min-h-[calc(100vh-12rem)]">
          
          {/* Top Section */}
          <div className="w-full max-w-3xl">
            {/* Introduction */}
            <p className="font-serif text-xl md:text-2xl leading-relaxed mb-16 text-black">
              Medigraphy is a Moroccan fashion photographer and art director who tells stories through images. His work grows from everyday Moroccan culture, architecture, and landscapes, where fashion meets emotion and atmosphere. Drawn to minimalism, quiet luxury, and avant-garde expression, he creates visuals that feel calm, intentional, and deeply present, images meant to be felt, not just seen.
            </p>
            
            {/* Client List - Compact Block */}
            <div className="mb-24">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-6 text-black">
                Selected Clients
              </h3>
              <p className="font-sans text-xs md:text-sm leading-6 md:leading-7 text-gray-600 text-justify">
                ALKARA-LUNE DE JOUR-DREAM WEAVE-KAMTIS-KIFESH STORE-HOUSE OF DMANA-CLAQUE-KADE.
              </p>
            </div>
          </div>
          
          {/* Footer / Contact Details */}
          <div className="w-full max-w-3xl mt-auto pt-12">
            <div className="flex flex-col space-y-2">
              <a 
                href="mailto:medigraphyone@gmail.com" 
                className="font-sans text-sm text-gray-400 hover:text-black transition-colors duration-300 w-max"
              >
                medigraphyone@gmail.com
              </a>
              
              <address className="font-sans text-sm text-gray-300 not-italic leading-relaxed">
                <br/>
                Morocco
              </address>
              
              {/* COPYRIGHT EN BAS DE PAGE */}
              <footer className="w-full py-10 mt-auto">
                <div className="text-center lg:text-left">
                  <p className="text-[8px] md:text-[10px] tracking-[0.3em] text-gray-400 uppercase">
                    © {new Date().getFullYear()} Medigraphy. All Rights Reserved.
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </div>

        {/* Right Column - Photographer Photo */}
        <div className="w-full lg:w-2/5 flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden shadow-lg">
            <img 
              src="/images/DSC09431.jpg" 
              alt="Medigraphy - Photographer" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
              onError={(e) => {
                console.error('Photo du photographe non trouvée');
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Contact;