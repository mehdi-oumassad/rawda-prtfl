import React from 'react';

const Shop: React.FC = () => {
  // 20 PORTRAIT IMAGES (3:4 ratio) - All JPGs with good portrait orientation
  const galleryImages = [
    "/images/DSC_0056.jpg",
    "/images/DSC00873.jpg",
    "/images/DSC04563.jpg",
    "/images/DSC04581.jpg",
    "/images/DSC04587.jpg",
    "/images/DSC06114.jpg",
    "/images/DSC06864.jpg",
    "/images/DSC07083.jpg",
    "/images/DSC07340.jpg",
    "/images/DSC07341.jpg",
    "/images/DSC07345.jpg",
    "/images/DSC08271.jpg",
    "/images/DSC08447.jpg",
    "/images/DSC09417.jpg",
    "/images/DSC09470.jpg",
    "/images/DSC09861.jpg",
    "/images/DSC09961.jpg",
    "/images/Heritage.jpg",
    "/images/IMG_6366.jpg",
    "/images/IMG_6368.jpg",
  ];

  // Fallback demo images (same order)
  const demoImages = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529139574466-a302d2753cd4?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523108115144-633331628551?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1472396961693-64296b8c9466?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1485230984741-08709756643b?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513205845289-37f3d0d80db2?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-35d2fe61e37d?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1485975412316-3e17e8c3df3c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1495562569060-2e1d2f7de4d3?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520333789090-1dfc82db536d?q=80&w=1200&auto=format&fit=crop",
  ];

  return (
    <div className="flex-grow w-full min-h-screen pt-32 pb-20 px-4 flex flex-col items-center">
      <div className="w-full max-w-[85%] lg:max-w-[75%]">
        
        {/* Section 1: Hero (Book Presentation) */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-32 items-start">
          
          {/* Left Column: Book Cover Image */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] w-full">
              <img 
                src="/images/Heritage.jpg" 
                alt="From The Great River Book Cover" 
                className="w-full h-full object-cover shadow-xl"
                onError={(e) => {
                  // Fallback to demo image
                  if (e.currentTarget.src !== "https://images.unsplash.com/photo-1485975412316-3e17e8c3df3c?q=80&w=1200&auto=format&fit=crop") {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1485975412316-3e17e8c3df3c?q=80&w=1200&auto=format&fit=crop";
                  }
                }}
              />
            </div>
          </div>

          {/* Right Column: Book Details */}
          <div className="w-full md:w-1/2 flex flex-col justify-start pt-4">
            <h1 className="font-serif text-4xl md:text-5xl text-black mb-8 leading-tight font-light">
              From The<br />Great River
            </h1>
            
            <div className="font-sans text-xs md:text-sm tracking-wide text-gray-500 space-y-3 mb-12 w-full max-w-sm">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span>First Edition</span>
                <span className="text-black font-medium">Limited to 500</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span>Pages</span>
                <span className="text-black font-medium">240 Pages</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span>Dimensions</span>
                <span className="text-black font-medium">24 x 30 cm</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span>Price</span>
                <span className="text-black font-medium">€65.00</span>
              </div>
            </div>

            {/* Purchase Button */}
            <button className="w-full max-w-sm bg-black text-white font-sans text-xs font-bold uppercase tracking-[0.2em] py-5 px-8 hover:bg-gray-900 transition-colors duration-300">
              Purchase
            </button>
            
            <p className="mt-6 text-[10px] text-gray-400 uppercase tracking-wider">
              Free shipping worldwide
            </p>
          </div>
        </div>

        {/* Section 2: Gallery Grid - 20 Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {galleryImages.map((src, index) => (
            <div key={index} className="w-full aspect-[3/4] bg-gray-100 overflow-hidden group">
              <img 
                src={src} 
                alt={`Book Excerpt ${index + 1}`} 
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                onError={(e) => {
                  // Fallback to demo image if local fails
                  if (e.currentTarget.src !== demoImages[index]) {
                    console.warn(`⚠️ Local image failed, using demo: ${src}`);
                    e.currentTarget.src = demoImages[index];
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;