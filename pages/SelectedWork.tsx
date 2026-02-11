import React, { useState, useEffect } from 'react';
import GrainOverlay from '../components/GrainOverlay';

// ----------------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------------

const USE_LOCAL_IMAGES = true;
const AUTOPLAY_INTERVAL = 5000; // 5 secondes
const TRANSITION_DURATION = 400; // Transition rapide : 400ms

// ----------------------------------------------------------------------
// TOUTES LES 7 IMAGES DANS L'ORDRE
// ----------------------------------------------------------------------

const allImages = [
  { order: 1, fileName: "DSC04525-1.png", title: "DSC04525" },
  { order: 2, fileName: "DSC07340-2.jpg", title: "DSC07340" },
  { order: 3, fileName: "DSC09417-3.jpg", title: "DSC09417" },
  { order: 4, fileName: "DSC09961-4.jpg", title: "DSC09961" },
  { order: 5, fileName: "DSC04581-5.jpg", title: "DSC04581" },
  { order: 6, fileName: "DSC08271-6.jpg", title: "DSC08271" },
  { order: 7, fileName: "DSC00873-7.jpg", title: "DSC00873" },
  { order: 8, fileName: "DSC08447-8.jpg", title: "DSC08447" },
  { order: 9, fileName: "DSC08020-9.jpg", title: "DSC08020" },
  { order: 10, fileName: "DSC08533-10.jpg", title: "DSC08533" },
  { order: 11, fileName: "DSC09861-11.jpg", title: "DSC09861" },
  { order: 12, fileName: "DSC04563-12.jpg", title: "DSC04563" },
  { order: 13, fileName: "DSC_0168-13.jpg", title: "DSC0168" },
  { order: 14, fileName: "DSC06864-14.jpg", title: "DSC06864" },
  { order: 15, fileName: "IMG_6368-15.jpg", title: "IMG6368" },
  { order: 16, fileName: "IMG_6366-16.jpg", title: "IMG6366" },
  { order: 17, fileName: "DSC04587-17.jpg", title: "DSC04587" },
  { order: 18, fileName: "DSC07083-18.jpg", title: "DSC07083" },
  { order: 19, fileName: "Heritage-19.jpg", title: "Heritage" },
  { order: 20, fileName: "DSC_0019-20.jpg", title: "DSC0019" },
  { order: 21, fileName: "DSC06114-21.jpg", title: "DSC06114" },
  { order: 22, fileName: "DSC04584-22.jpg", title: "DSC04584" },
  { order: 23, fileName: "Solitude-23.jpg", title: "Solitude" },
  { order: 24, fileName: "DSC_0056-24.jpg", title: "DSC0056" },
  { order: 25, fileName: "DSC08921-25.jpg", title: "DSC08921" },
  { order: 26, fileName: "DSC09470-26.jpg", title: "DSC09470" }
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
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // Preload images
  useEffect(() => {
    let isMounted = true;
    const errors = new Set<number>();

    const preload = async () => {
      const promises = projects.map((project, index) => 
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = project.url;
          img.onload = () => {
            console.log(`✅ Loaded: ${project.fileName}`);
            resolve();
          };
          img.onerror = () => {
            console.error(`❌ Failed: ${project.fileName}`);
            errors.add(index);
            resolve();
          };
        })
      );
      
      await Promise.all(promises);
      
      if (isMounted) {
        setImageErrors(errors);
        setImagesLoaded(true);
        console.log(`📸 Total images: ${projects.length}, Loaded successfully: ${projects.length - errors.size}`);
      }
    };

    preload();

    const timeout = setTimeout(() => {
      if (isMounted) setImagesLoaded(true);
    }, 3000);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, []);

  // Autoplay
  useEffect(() => {
    if (!imagesLoaded || isPaused || isTransitioning) return;

    const interval = setInterval(() => {
      changeImage("next");
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [imagesLoaded, isPaused, isTransitioning, currentIndex]);

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

    // Fade out rapide
    setTimeout(() => {
      setCurrentIndex(prev => 
        direction === "next" 
          ? (prev + 1) % projects.length
          : (prev - 1 + projects.length) % projects.length
      );
      
      // Fade in rapide
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, TRANSITION_DURATION);
  };

  const current = projects[currentIndex];

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-white overflow-hidden">
      
      {/* Loading State */}
      {!imagesLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-gray-600 font-light tracking-wide">Loading images...</p>
          </div>
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
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black" />
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
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black" />
          </svg>
        </div>
      </div>

      {/* Image Container - NO DUPLICATION */}
      <div
        className="relative z-20 w-auto h-auto max-w-[85%] max-h-[75vh] md:max-w-[70%] md:max-h-[80vh] aspect-[3/4] bg-gray-100 overflow-hidden shadow-lg"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Single Image with Fast Transition */}
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
            loading="eager"
            onError={(e) => {
              console.error(`Image load error: ${current.fileName}`);
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Grain Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <GrainOverlay />
        </div>

        {/* Error Fallback - only shown if image fails */}
        {imageErrors.has(currentIndex) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs text-gray-400">{current.fileName}</p>
            <p className="text-xs text-gray-300 mt-1">Image not found</p>
          </div>
        )}
      </div>

      {/* Debug Info - Remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-20 left-4 bg-black/80 text-white text-xs p-2 rounded z-50">
          <p>Image: {currentIndex + 1} / {projects.length}</p>
          <p>Current: {current.fileName}</p>
          <p>Loaded: {imagesLoaded ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default SelectedWork;