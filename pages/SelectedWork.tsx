import React, { useState, useEffect } from 'react';
import GrainOverlay from '../components/GrainOverlay';

// ----------------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------------

const USE_LOCAL_IMAGES = true;
const AUTOPLAY_INTERVAL = 5000;

// ----------------------------------------------------------------------
// ALL IMAGES SORTED BY ORDER NUMBER (the number after the dash)
// Example: DSC04525-1.jpg → order 1 (first)
// ----------------------------------------------------------------------

const allImages = [
  { order: 1,  fileName: "DSC04525-1.png",   title: "DSC04525" },
  { order: 2,  fileName: "DSC07340-2.jpg",   title: "DSC07340" },
  { order: 3,  fileName: "DSC09417-3.jpg",   title: "DSC09417" },
  { order: 4,  fileName: "DSC09961-4.jpg",   title: "DSC09961" },
  { order: 5,  fileName: "DSC04581-5.jpg",   title: "DSC04581" },
  { order: 6,  fileName: "DSC08271-6.jpg",   title: "DSC08271" },
  { order: 7,  fileName: "DSC00873-7.jpg",   title: "DSC00873" },
  { order: 8,  fileName: "DSC08447-8.jpg",   title: "DSC08447" },
  { order: 9,  fileName: "DSC08020-9.jpg",   title: "DSC08020" },
  { order: 10, fileName: "DSC08533-10.jpg",  title: "DSC08533" },
  { order: 11, fileName: "DSC09861-11.jpg",  title: "DSC09861" },
  { order: 12, fileName: "DSC04563-12.jpg",  title: "DSC04563" },
  { order: 13, fileName: "DSC_0168-13.png",  title: "DSC_0168" },
  { order: 14, fileName: "DSC06864-14.jpg",  title: "DSC06864" },
  { order: 15, fileName: "IMG_6368-15.jpg",  title: "IMG_6368" },
  { order: 16, fileName: "IMG_6366-16.jpg",  title: "IMG_6366" },
  { order: 17, fileName: "DSC04587-17.jpg",  title: "DSC04587" },
  { order: 18, fileName: "DSC07083-18.jpg",  title: "DSC07083" },
  { order: 19, fileName: "Heritage-19.jpg",  title: "Heritage" },
  { order: 20, fileName: "DSC_0019-20.png",  title: "DSC_0019" },
  { order: 21, fileName: "DSC06114-21.jpg",  title: "DSC06114" },
  { order: 22, fileName: "DSC04584-22.png",  title: "DSC04584" },
  { order: 23, fileName: "Solitude-23.png",  title: "Solitude" },
  { order: 24, fileName: "DSC_0056-24.jpg",  title: "DSC_0056" },
  { order: 25, fileName: "DSC08921-25.png",  title: "DSC08921" },
  { order: 26, fileName: "DSC09470-26.jpg",  title: "DSC09470" },
];

// SELECTED WORK = first 7 images in order
const selectedWorkImages = allImages.slice(0, 7).map(item => ({
  title: item.title,
  fileName: item.fileName,
  url: USE_LOCAL_IMAGES ? `/images/${item.fileName}` : ""
}));

// ----------------------------------------------------------------------
// COMPONENT
// ----------------------------------------------------------------------

const SelectedWork: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const projects = selectedWorkImages;

  // Preload
  useEffect(() => {
    let isMounted = true;

    const preload = async () => {
      await Promise.all(
        projects.map(
          (p) =>
            new Promise<void>((resolve) => {
              const img = new Image();
              img.src = p.url;
              img.onload = () => resolve();
              img.onerror = () => resolve();
            })
        )
      );
      if (isMounted) setImagesLoaded(true);
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
    if (!imagesLoaded || isPaused || isAnimating) return;

    const interval = setInterval(() => changeImage("next"), AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [imagesLoaded, isPaused, isAnimating, currentIndex]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") changeImage("prev");
      else if (e.key === "ArrowRight") changeImage("next");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isAnimating]);

  const changeImage = (direction: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (direction === "next") return (prev + 1) % projects.length;
        return (prev - 1 + projects.length) % projects.length;
      });
      setTimeout(() => setIsAnimating(false), 50);
    }, 500);
  };

  const current = projects[currentIndex];

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Loading */}
      {!imagesLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-gray-600 font-light tracking-wide">Loading...</p>
          </div>
        </div>
      )}

      {/* Left Nav */}
      <div
        onClick={() => changeImage("prev")}
        className="absolute top-0 left-0 w-1/2 h-full z-40 cursor-pointer group flex items-center justify-start pl-6 md:pl-10"
      >
        <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 p-4">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black" />
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
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black" />
          </svg>
        </div>
      </div>

      {/* Image - Pause on Hover */}
      <div
        className={`
          relative z-20 w-auto h-auto
          max-w-[85%] max-h-[75vh]
          md:max-w-[70%] md:max-h-[80vh]
          aspect-[3/4] bg-gray-100 overflow-hidden shadow-lg
          transition-opacity duration-500 ease-in-out
          ${isAnimating || !imagesLoaded ? "opacity-0" : "opacity-100"}
        `}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <img
          src={current.url}
          alt={current.title}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        {/* Title on hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-sm font-light tracking-wide">{current.title}</p>
        </div>

        {/* Error fallback */}
        <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center text-center p-8 bg-gray-50">
          <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-xs text-gray-400">{current.fileName}</p>
          <p className="text-xs text-gray-300 mt-1">Image not available</p>
        </div>

        <GrainOverlay />
      </div>
    </div>
  );
};

export default SelectedWork;