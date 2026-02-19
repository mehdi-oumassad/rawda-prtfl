import React, { useState, useEffect } from 'react';
import GrainOverlay from '../components/GrainOverlay';
import Navbar from '../components/Navbar';

const USE_LOCAL_IMAGES = true;
const AUTOPLAY_INTERVAL = 5000;
const TRANSITION_DURATION = 400;

const allImages = [
  { order: 1,  fileName: "DSC04525-1.png",   title: "DSC04525" },
  { order: 2,  fileName: "DSC07340-2.jpg",   title: "DSC07340" },
  { order: 3,  fileName: "DSC09417-3.jpg",   title: "DSC09417" },
  { order: 4,  fileName: "DSC09961-4.jpg",   title: "DSC09961" },
  { order: 5,  fileName: "DSC04581-5.jpg",   title: "DSC04581" },
  { order: 6,  fileName: "DSC08271-6.jpg",   title: "DSC08271" },
  { order: 7,  fileName: "DSC00873-7.jpg",   title: "DSC00873" },
];

const projects = allImages.map(item => ({
  title: item.title,
  fileName: item.fileName,
  url: `/images/${item.fileName}`
}));

const SelectedWork: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  
  // NEW: Track image ratio for navbar adaptation
  const [imageRatio, setImageRatio] = useState<number>(0.75); // Default 3:4 portrait
  const isPortrait = imageRatio < 1; // Portrait if height > width

  // Load first image priority
  useEffect(() => {
    let isMounted = true;

    const loadFirstImage = () => {
      const firstImg = new Image();
      firstImg.src = projects[0].url;
      
      firstImg.onload = () => {
        if (isMounted) {
          setFirstImageLoaded(true);
          setLoadedImages(prev => new Set(prev).add(0));
          // Calculate ratio
          setImageRatio(firstImg.width / firstImg.height);
          console.log('✅ First image loaded');
        }
      };
      
      firstImg.onerror = () => {
        if (isMounted) {
          console.error('❌ First image failed');
          setFirstImageLoaded(true);
        }
      };
    };

    const loadRemainingImages = () => {
      projects.slice(1).forEach((project, index) => {
        const img = new Image();
        img.src = project.url;
        
        img.onload = () => {
          if (isMounted) {
            setLoadedImages(prev => new Set(prev).add(index + 1));
          }
        };
        
        img.onerror = () => {
          console.warn(`⚠️ Failed: ${project.fileName}`);
        };
      });
    };

    loadFirstImage();
    const backgroundLoadTimer = setTimeout(loadRemainingImages, 100);

    return () => {
      isMounted = false;
      clearTimeout(backgroundLoadTimer);
    };
  }, []);

  // Detect current image ratio on change
  useEffect(() => {
    const img = new Image();
    img.src = projects[currentIndex].url;
    
    img.onload = () => {
      const ratio = img.width / img.height;
      setImageRatio(ratio);
      console.log(`📐 Image ratio: ${ratio.toFixed(2)} (${ratio < 1 ? 'Portrait' : 'Landscape'})`);
    };
  }, [currentIndex]);

  // Autoplay
  useEffect(() => {
    if (!firstImageLoaded || isPaused || isTransitioning) return;
    const interval = setInterval(() => changeImage("next"), AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [firstImageLoaded, isPaused, isTransitioning, currentIndex]);

  // Keyboard
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
      setTimeout(() => setIsTransitioning(false), 50);
    }, TRANSITION_DURATION);
  };

  const current = projects[currentIndex];
  const isCurrentImageLoaded = loadedImages.has(currentIndex);

  return (
    <>
      {/* Dynamic Navbar - compact for portrait images */}
      <Navbar isCompact={isPortrait} />

      <div className="relative w-full h-screen flex items-center justify-center bg-white overflow-hidden">
        
        {/* Loading State */}
        {!firstImageLoaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <div className="relative mb-8">
              <div className="w-16 h-16 border-2 border-gray-200 rounded-full"></div>
              <div className="absolute inset-0 w-16 h-16 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600 text-sm font-light tracking-[0.3em] uppercase animate-pulse">
              Loading
            </p>
            <div className="mt-6 w-48 h-0.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-black transition-all duration-300"
                style={{ width: `${(loadedImages.size / projects.length) * 100}%` }}
              ></div>
            </div>
            <p className="mt-3 text-gray-400 text-xs">
              {loadedImages.size} / {projects.length}
            </p>
          </div>
        )}

        {/* Left Nav */}
        <div
          onClick={() => changeImage("prev")}
          className="absolute top-0 left-0 w-1/2 h-full z-40 cursor-pointer group flex items-center justify-start pl-6 md:pl-10"
        >
          <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 p-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M15 19L8 12L15 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Right Nav */}
        <div
          onClick={() => changeImage("next")}
          className="absolute top-0 right-0 w-1/2 h-full z-40 cursor-pointer group flex items-center justify-end pr-6 md:pr-10"
        >
          <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 p-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M9 5L16 12L9 19" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Image Container */}
        <div
          className="relative z-20 w-auto h-auto max-w-[85%] max-h-[75vh] md:max-w-[70%] md:max-h-[80vh] aspect-[3/4] bg-gray-100 overflow-hidden shadow-lg"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
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
            />
          </div>

          {!isCurrentImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
          )}

          <div className="absolute inset-0 pointer-events-none">
            <GrainOverlay />
          </div>
        </div>

        {/* Debug Info */}
        <div className="absolute bottom-4 left-4 text-gray-400 text-xs z-30">
          {isPortrait ? '📱 Portrait' : '🖼️ Landscape'} • Ratio: {imageRatio.toFixed(2)}
        </div>
      </div>
    </>
  );
};

export default SelectedWork;
