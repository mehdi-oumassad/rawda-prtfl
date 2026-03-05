import React, { useState, useEffect } from 'react';
import GrainOverlay from '../components/GrainOverlay';
import Navbar from '../components/Navbar'; // Assure-toi que le chemin est correct

// ----------------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------------
const AUTOPLAY_INTERVAL = 5000;
const TRANSITION_DURATION = 400;

const allImages = [
  { order: 1,  fileName: "optimized-DSC04525-1.webp",   title: "DSC04525" },
  { order: 2,  fileName: "optimized-DSC07340-2.webp",   title: "DSC07340" },
  { order: 3,  fileName: "optimized-DSC09417-3.webp",   title: "DSC09417" },
  { order: 4,  fileName: "optimized-DSC09961-4.webp",   title: "DSC09961" },
  { order: 5,  fileName: "optimized-DSC04581-5.webp",   title: "DSC04581" },
  { order: 6,  fileName: "optimized-DSC08271-6.webp",   title: "DSC08271" },
  { order: 7,  fileName: "optimized-DSC00873-7.webp",   title: "DSC00873" },
  { order: 8,  fileName: "optimized-DSC08447-8.webp",   title: "DSC08447" },
  { order: 9,  fileName: "optimized-DSC08020-9.webp",   title: "DSC08020" },
  { order: 10, fileName: "optimized-DSC08533-10.webp",  title: "DSC08533" },
  { order: 11, fileName: "optimized-DSC09861-11.webp",  title: "DSC09861" },
  { order: 12, fileName: "optimized-DSC04563-12.webp",  title: "DSC04563" },
  { order: 13, fileName: "optimized-DSC_0168-13.webp",  title: "DSC_0168" },
  { order: 14, fileName: "optimized-DSC09076-3.webp",   title: "DSC09076" },
  { order: 15, fileName: "optimized-IMG_6368-15.webp",  title: "IMG_6368" },
  { order: 16, fileName: "optimized-IMG_6366-16.webp",  title: "IMG_6366" },
  { order: 17, fileName: "optimized-DSC04587-17.webp",  title: "DSC04587" },
  { order: 18, fileName: "optimized-DSC07083-18.webp",  title: "DSC07083" },
  { order: 19, fileName: "optimized-Heritage-19.webp",  title: "Heritage" },
  { order: 20, fileName: "optimized-DSC_0019-20.webp",  title: "DSC_0019" },
  { order: 21, fileName: "optimized-DSC06114-21.webp",  title: "DSC06114" },
  { order: 22, fileName: "optimized-DSC04584-22.webp",  title: "DSC04584" },
  { order: 23, fileName: "optimized-Solitude-23.webp",  title: "Solitude" },
  { order: 24, fileName: "optimized-DSC_0056-24.webp",  title: "DSC_0056" },
  { order: 25, fileName: "optimized-DSC08921-25.webp",  title: "DSC08921" },
  { order: 26, fileName: "optimized-DSC09470-26.webp",  title: "DSC09470" },
];

const projects = allImages.map(item => ({
  title: item.title,
  url: `/images/${item.fileName}`
}));

const SelectedWork: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  
  // État pour la Navbar adaptative
  const [isCompact, setIsCompact] = useState(false);

  // Préchargement et détection de résolution
  useEffect(() => {
    let isMounted = true;

    const loadImage = (index: number) => {
      const img = new Image();
      img.src = projects[index].url;
      img.onload = () => {
        if (!isMounted) return;
        setLoadedImages(prev => new Set(prev).add(index));
        if (index === 0) setFirstImageLoaded(true);
        
        // Si c'est l'image actuelle, on vérifie si elle est portrait
        if (index === currentIndex) {
          setIsCompact(img.naturalHeight > img.naturalWidth);
        }
      };
    };

    projects.forEach((_, i) => loadImage(i));
    return () => { isMounted = false; };
  }, [currentIndex]);

  const changeImage = (direction: "next" | "prev") => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prev => 
        direction === "next" ? (prev + 1) % projects.length : (prev - 1 + projects.length) % projects.length
      );
      setTimeout(() => setIsTransitioning(false), 50);
    }, TRANSITION_DURATION);
  };

  // Navigation clavier
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") changeImage("prev");
      else if (e.key === "ArrowRight") changeImage("next");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isTransitioning]);

  // Autoplay
  useEffect(() => {
    if (!firstImageLoaded || isPaused || isTransitioning) return;
    const interval = setInterval(() => changeImage("next"), AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [firstImageLoaded, isPaused, isTransitioning, currentIndex]);

  const current = projects[currentIndex];

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
      
      {/* Navbar avec l'état compact dynamique */}
      <Navbar isCompact={isCompact} />

      {/* Navigation Areas */}
      <div onClick={() => changeImage("prev")} className="absolute top-0 left-0 w-1/4 h-full z-40 cursor-pointer group flex items-center pl-6 md:pl-10">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity p-4 bg-white/10 rounded-full backdrop-blur-sm">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5"><path d="M15 19L8 12L15 5" /></svg>
        </div>
      </div>
      <div onClick={() => changeImage("next")} className="absolute top-0 right-0 w-1/4 h-full z-40 cursor-pointer group flex items-center justify-end pr-6 md:pr-10">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity p-4 bg-white/10 rounded-full backdrop-blur-sm">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5"><path d="M9 5L16 12L9 19" /></svg>
        </div>
      </div>

      {/* Main Image Viewport - NO CROP HERE */}
      <div 
        className="relative z-20 w-full h-full flex items-center justify-center p-6 md:p-20"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={`relative max-w-full max-h-full transition-opacity duration-${TRANSITION_DURATION} ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
          <img
            key={current.url}
            src={current.url}
            alt={current.title}
            className="w-auto h-auto max-w-[90vw] max-h-[75vh] md:max-h-[80vh] shadow-2xl object-contain transition-all duration-700"
          />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <GrainOverlay />
          </div>
        </div>
      </div>

      {/* Title / Counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-center">
      </div>

      {/* Loading Screen */}
      {!firstImageLoaded && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-white">
          <div className="w-10 h-10 border-2 border-gray-100 border-t-black rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default SelectedWork;