import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="flex-grow w-full min-h-screen pt-32 pb-12 px-6 md:px-12 lg:px-24 flex flex-col items-start justify-between text-left bg-white">
      
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
            Rabat, Morocco
          </address>
        </div>
      </div>
      
    </div>
  );
};

export default Contact;