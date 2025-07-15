import { useEffect, useRef, useState } from "react";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  isFinishing: boolean;
}

const SplashScreen = ({ isFinishing }: SplashScreenProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [progress, setProgress] = useState(0);

  // Video loading logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setVideoLoaded(true);
      if (!isFinishing) {
        video.play().catch((error) => {
          console.error("Error playing video:", error);
          setVideoError(true);
          setShowFallback(true);
        });
      }
    };

    const handleError = (event: Event) => {
      console.error("Error loading video:", event);
      console.error("Video src:", video.src);
      setVideoError(true);
      setShowFallback(true);
    };

    const handleCanPlay = () => {
      if (!isFinishing && videoLoaded) {
        video.play().catch((error) => {
          console.error("Error playing video:", error);
          setVideoError(true);
          setShowFallback(true);
        });
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);
    video.addEventListener("canplay", handleCanPlay);

    // Set a timeout to show fallback if video doesn't load within 3 seconds
    const fallbackTimeout = setTimeout(() => {
      if (!videoLoaded) {
        console.log("Video taking too long to load, showing fallback");
        setVideoError(true);
        setShowFallback(true);
      }
    }, 3000);

    // Preload the video
    video.load();

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
      video.removeEventListener("canplay", handleCanPlay);
      clearTimeout(fallbackTimeout);
    };
  }, [isFinishing, videoLoaded]);

  // Progress bar logic for fallback
  useEffect(() => {
    if (!isFinishing && showFallback) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) return prev + 1;
          clearInterval(interval);
          return 100;
        });
      }, 30); // Adjust time here to control the speed of the loader

      return () => clearInterval(interval); // Cleanup the interval on unmount
    }
  }, [isFinishing, showFallback]);

  // Don't render if finishing
  if (isFinishing) return null;

  return (
    <div className="fixed inset-0 z-[9999] w-full h-full bg-black flex items-center justify-center">
      {/* Video Splash Screen */}
      {!showFallback && (
        <>
          {/* Loading spinner while video loads */}
          {!videoLoaded && !videoError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
            </div>
          )}

          {/* Video element with multiple sources for better compatibility */}
          <video
            ref={videoRef}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => {
              setVideoError(true);
              setShowFallback(true);
            }}
          >
            <source src="/arlintro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </>
      )}

      {/* Fallback Image Splash Screen */}
      {showFallback && (
        <AnimatePresence>
          <motion.div
            className={cn(
              "fixed inset-0 z-[9999] flex items-center justify-center bg-black"
            )}
            initial={{ opacity: 0 }} // Start with opacity 0 for fade-in
            animate={{ opacity: 1 }} // Fade in to full opacity
            exit={{ opacity: 0 }} // Fade out when exiting
            transition={{ duration: 1 }} // Transition time for fade-in/out
          >
            <motion.div
              initial={{ opacity: 0 }} // Start with opacity 0 for fade-in
              animate={{ opacity: 1 }} // Fade in to full opacity
              exit={{ opacity: 0 }} // Fade out when exiting
              transition={{
                duration: 0.8,
                ease: "easeInOut", // Smooth ease-in-out transition
              }}
              className="flex flex-col items-center gap-4 sm:gap-4 lg:gap-4"
            >
              <div className="flex flex-row items-center gap-4">
                {/* Coin Image with Simple Fade-in */}
                <motion.div
                  className="w-[220px] sm:w-[250px] h-[220px] sm:h-[250px]"
                  initial={{ opacity: 0 }} // Start with opacity 0 for fade-in
                  animate={{ opacity: 1 }} // Fade in to full opacity
                  exit={{ opacity: 0 }} // Fade out when exiting
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut", // Smooth ease-in-out transition
                  }}
                >
                  <Image
                    src="/coin/coin.avif"
                    alt="Splash Coin"
                    width={250}
                    height={250}
                    priority
                  />
                </motion.div>

                {/* Text Image with Simple Fade-in */}
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0 }} // Start with opacity 0 for fade-in
                  animate={{ opacity: 1 }} // Fade in to full opacity
                  exit={{ opacity: 0 }} // Fade out when exiting
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut", // Smooth ease-in-out transition
                  }}
                >
                  <Image
                    src="/coin/text.avif"
                    alt="Splash Text"
                    width={500}
                    height={250}
                    priority
                  />
                </motion.div>
              </div>

              {/* Main Heading with Simple Fade-in */}
              <motion.div
                className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mt-4 px-2 text-center leading-tight"
                initial={{ opacity: 0 }} // Start with opacity 0 for fade-in
                animate={{ opacity: 1 }} // Fade in to full opacity
                exit={{ opacity: 0 }} // Fade out when exiting
                transition={{
                  duration: 0.8,
                  ease: "easeInOut", // Smooth ease-in-out transition
                }}
              >
                <h1>Access Real Assets. Anytime. Anywhere</h1>
              </motion.div>

              {/* Subheading with Simple Fade-in */}
              <motion.div
                className="text-gray-100 text-lg sm:text-xl md:text-2xl mt-2 px-8 text-center"
                initial={{ opacity: 0 }} // Start with opacity 0 for fade-in
                animate={{ opacity: 1 }} // Fade in to full opacity
                exit={{ opacity: 0 }} // Fade out when exiting
                transition={{
                  duration: 0.8,
                  ease: "easeInOut", // Smooth ease-in-out transition
                }}
              >
                {/* <p>We're building something amazing, just for you.</p> */}
              </motion.div>

              {/* Percentage Bar Loader at the Bottom */}
              <motion.div
                className="w-full mt-4 h-1 bg-[#F4B448]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                exit={{ width: "0%" }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut", // Smooth ease-in-out transition for progress
                }}
              ></motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default SplashScreen;
