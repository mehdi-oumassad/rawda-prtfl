import React, { useState, useEffect } from 'react';
import GrainOverlay from '../components/GrainOverlay';

// ----------------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------------

const USE_LOCAL_IMAGES = true;
const AUTOPLAY_INTERVAL = 5000;
const TRANSITION_DURATION = 400;

// ----------------------------------------------------------------------
// ALL 26 IMAGES - CORRECTED EXTENSIONS & FILENAMES
// Vérifié : .png pour ceux qui ont des fonds transparents, .jpg pour le reste
// ----------------------------------------------------------------------

const allImages = [
  // Order 1-10
  { order: 1,  fileName: "DSC04525-1.png",   title: "DSC04525" },  // PNG (transparent bg)
  { order: 2,  fileName: "DSC07340-2.jpg",   title: "DSC07340" },
  { order: 3,  fileName: "DSC09417-3.jpg",   title: "DSC09417" },
  { order: 4,  fileName: "DSC09961-4.jpg",   title: "DSC09961" },
  { order: 5,  fileName: "DSC04581-5.jpg",   title: "DSC04581" },
  { order: 6,  fileName: "DSC08271-6.jpg",   title: "DSC08271" },
  { order: 7,  fileName: "DSC00873-7.jpg",   title: "DSC00873" },
  { order: 8,  fileName: "DSC08447-8.jpg",   title: "DSC08447" },
  { order: 9,  fileName: "DSC08020-9.jpg",   title: "DSC08020" },
  { order: 10, fileName: "DSC08533-10.jpg",  title: "DSC08533" },
  
  // Order 11-20
  { order: 11, fileName: "DSC09861-11.jpg",  title: "DSC09861" },
  { order: 12, fileName: "DSC04563-12.jpg",  title: "DSC04563" },
  { order: 13, fileName: "DSC_0168-13.png",  title: "DSC_0168" },  // Underscore correct
  { order: 14, fileName: "DSC06864-14.jpg",  title: "DSC06864" },
  { order: 15, fileName: "IMG_6368-15.jpg",  title: "IMG_6368" },  // Underscore correct
  { order: 16, fileName: "IMG_6366-16.jpg",  title: "IMG_6366" },  // Underscore correct
  { order: 17, fileName: "DSC04587-17.jpg",  title: "DSC04587" },
  { order: 18, fileName: "DSC07083-18.jpg",  title: "DSC07083" },
  { order: 19, fileName: "Heritage-19.jpg",  title: "Heritage" },
  { order: 20, fileName: "DSC_0019-20.png",  title: "DSC_0019" },  // Underscore correct
  
  // Order 21-26
  { order: 21, fileName: "DSC06114-21.jpg",  title: "DSC06114" },
  { order: 22, fileName: "DSC04584-22.png",  title: "DSC04584" },  // PNG
  { order: 23, fileName: "Solitude-23.png",  title: "Solitude" },  // PNG
  { order: 24, fileName: "DSC_0056-24.jpg",  title: "DSC_0056" },  // Underscore correct
  { order: 25, fileName: "DSC08921-25.png",  title: "DSC08921" },  // PNG
  { order: 26, fileName: "DSC09470-26.jpg",  title: "DSC09470" },
];

const projects = allImages.map(item => ({
  title: item.title,
  fileName: item.fileName,
  url: `/images/${item.fileName}`
}));

// ----------------------------------------------------------------------
// COMPONENT
// ----------------------------------------------------------------------

const SelectedWork: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Progressive loading states
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // ============================================================
  // OPTIMIZED PRELOAD - Priority on first image, rest in background
  // ============================================================
  useEffect(() => {
    let isMounted = true;

    // PRIORITY: Load first image immediately
    const loadFirstImage = () => {
      const firstImg = new Image();
      firstImg.src = projects[0].url;
      
      firstImg.onload = () => {
        if (isMounted) {
          setFirstImageLoaded(true);
          setLoadedImages(prev => new Set(prev).add(0));
          console.log('✅ First image loaded - Gallery ready!');
        }
      };
      
      firstImg.onerror = () => {
        if (isMounted) {
          console.error('❌ First image failed:', projects[0].fileName);
          setFirstImageLoaded(true); // Show UI anyway
        }
      };
    };

    // BACKGROUND: Load remaining images progressively
    const loadRemainingImages = () => {
      projects.slice(1).forEach((project, index) => {
        const img = new Image();
        img.src = project.url;
        
        img.onload = () => {
          if (isMounted) {
            setLoadedImages(prev => new Set(prev).add(index + 1));
            console.log(`✅ Loaded ${index + 2}/${projects.length}: ${project.fileName}`);
          }
        };
        
        img.onerror = () => {
          console.warn(`⚠️ Failed to load: ${project.fileName}`);
        };
      });
    };

    // Execute: First image, then rest
    loadFirstImage();
    
    // Delay background loading slightly to prioritize first image
    const backgroundLoadTimer = setTimeout(loadRemainingImages, 100);

    return () => {
      isMounted = false;
      clearTimeout(backgroundLoadTimer);
    };
  }, []);

  // Autoplay
  useEffect(() => {
    if (!firstImageLoaded || isPaused || isTransitioning) return;

    const interval = setInterval(() => {
      changeImage("next");
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [firstImageLoaded, isPaused, isTransitioning, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") changeImage("prev");
      else if (e.key === "ArrowRight") changeImage("next");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isTransitioning]);

  const changeImage = (direction: "next" | "prev") => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentIndex(prev => 
        direction === "next" 
          ? (prev + 1) % projects.length
          : (prev - 1 + projects.length) % projects.length
      );
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, TRANSITION_DURATION);
  };

  const current = projects[currentIndex];
  const isCurrentImageLoaded = loadedImages.has(currentIndex);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-white overflow-hidden">
      
      {/* ============================================================ */}
      {/* ELEGANT LOADING STATE - Only until first image loads */}
      {/* ============================================================ */}
      {!firstImageLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white">
          {/* Minimal elegant loader */}
          <div className="relative mb-8">
            <div className="w-16 h-16 border-2 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 w-16 h-16 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          {/* Loading text */}
          <p className="text-gray-600 text-sm font-light tracking-[0.3em] uppercase animate-pulse">
            Loading
          </p>
          
          {/* Progress indicator */}
          <div className="mt-6 w-48 h-0.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-black transition-all duration-300 ease-out"
              style={{ width: `${(loadedImages.size / projects.length) * 100}%` }}
            ></div>
          </div>
          
          <p className="mt-3 text-gray-400 text-xs">
            {loadedImages.size} / {projects.length}
          </p>
        </div>
      )}

      {/* Left Navigation */}
      <div
        onClick={() => changeImage("prev")}
        className="absolute top-0 left-0 w-1/2 h-full z-40 cursor-pointer group flex items-center justify-start pl-6 md:pl-10"
        aria-label="Previous"
      >
        <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 p-4">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M15 19L8 12L15 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Right Navigation */}
      <div
        onClick={() => changeImage("next")}
        className="absolute top-0 right-0 w-1/2 h-full z-40 cursor-pointer group flex items-center justify-end pr-6 md:pr-10"
        aria-label="Next"
      >
        <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 p-4">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M9 5L16 12L9 19" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* ============================================================ */}
      {/* IMAGE CONTAINER - Shows immediately when first image ready */}
      {/* ============================================================ */}
      <div
        className="relative z-20 w-auto h-auto max-w-[85%] max-h-[75vh] md:max-w-[70%] md:max-h-[80vh] aspect-[3/4] bg-gray-900 overflow-hidden shadow-2xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Main Image with smooth transition */}
        <div
          className={`w-full h-full transition-opacity ease-in-out ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
          style={{ transitionDuration: `${TRANSITION_DURATION}ms` }}
        >
          <img
            key={currentIndex}
            src={current.url}
            alt={current.title}
            className="w-full h-full object-cover object-center"
            loading={currentIndex < 3 ? "eager" : "lazy"}
            onError={(e) => {
              console.error(`❌ Image failed: ${current.fileName}`);
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Image not loaded yet - show placeholder */}
        {!isCurrentImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        )}

        {/* Grain Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <GrainOverlay />
        </div>

        {/* Image title on hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-sm font-light tracking-wide">
            {current.title}
          </p>
          <p className="text-white/60 text-xs mt-1">
            {currentIndex + 1} / {projects.length}
          </p>
        </div>
      </div>

      {/* Loading progress indicator (bottom corner) */}
      {loadedImages.size < projects.length && (
        <div className="absolute bottom-4 left-4 text-gray-400 text-xs z-30">
          Loading images: {loadedImages.size}/{projects.length}
        </div>
      )}
    </div>
  );
};

export default SelectedWork;