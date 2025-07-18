import { useEffect, useRef, useState } from "react";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  isFinishing: boolean;
  onComplete?: () => void;
}

const SplashScreen = ({ isFinishing, onComplete }: SplashScreenProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  // Video loading logic (simplified and restored to original approach)
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

    const handlePlay = () => {
      setVideoPlaying(true);
    };

    const handlePause = () => {
      setVideoPlaying(false);
    };

    const handleEnded = () => {
      setVideoPlaying(false);
      setVideoEnded(true);
      console.log("Video ended");

      // Delay the completion callback to allow for smooth transition
      setTimeout(() => {
        onComplete?.();
      }, 500);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

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
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      clearTimeout(fallbackTimeout);
    };
  }, [isFinishing, videoLoaded]);

  // Progress bar logic for fallback with completion callback
  useEffect(() => {
    if (!isFinishing && showFallback) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) return prev + 1;
          clearInterval(interval);

          // Call completion callback when progress reaches 100%
          setTimeout(() => {
            onComplete?.();
          }, 200); // Reduced delay for quicker transition

          return 100;
        });
      }, 30); // Adjust time here to control the speed of the loader

      return () => clearInterval(interval);
    }
  }, [isFinishing, showFallback, onComplete]);

  // Handle finishing state
  useEffect(() => {
    if (isFinishing) {
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
  }, [isFinishing]);

  // Don't render if finishing
  if (isFinishing) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] w-full h-full bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: isFinishing ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Video Splash Screen */}
      {!showFallback && (
        <>
          {/* Loading spinner while video loads */}
          {!videoLoaded && !videoError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-white"></div>
            </div>
          )}

          {/* Video element with enhanced mobile support */}
          <video
            ref={videoRef}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-500",
              videoLoaded ? "opacity-100" : "opacity-0"
            )}
            autoPlay
            muted
            playsInline
            preload="auto"
            loop={false}
            controls={false}
            webkit-playsinline="true"
            x5-playsinline="true"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="false"
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => {
              setVideoError(true);
              setShowFallback(true);
            }}
            onPlay={() => setVideoPlaying(true)}
            onPause={() => setVideoPlaying(false)}
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          >
            <source src="/arlintro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Manual play button for cases where autoplay fails */}
          {/* {videoLoaded && !videoPlaying && (
            <button
              onClick={async () => {
                const video = videoRef.current;
                if (video) {
                  try {
                    await video.play();
                    setVideoPlaying(true);
                  } catch (error) {
                    console.error("Manual play failed:", error);
                    setVideoError(true);
                    setShowFallback(true);
                  }
                }
              }}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-sm sm:text-base">Tap to play</p>
              </div>
            </button>
          )} */}
        </>
      )}

      {/* Fallback Image Splash Screen with responsive design */}
      {showFallback && (
        <AnimatePresence>
          <motion.div
            className={cn(
              "fixed inset-0 z-[9999] flex items-center justify-center bg-black px-4 sm:px-6 lg:px-8"
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 w-full max-w-4xl mx-auto"
            >
              {/* Logo and Text Container - Responsive Layout */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8 w-full justify-center">
                {/* Coin Image - Responsive Sizing */}
                <motion.div
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 flex-shrink-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/coin/coin.avif"
                    alt="Splash Coin"
                    width={256}
                    height={256}
                    priority
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                {/* Text Image - Responsive Sizing */}
                <motion.div
                  className="flex items-center justify-center w-full sm:w-auto"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                >
                  <Image
                    src="/coin/text.avif"
                    alt="Splash Text"
                    width={400}
                    height={200}
                    priority
                    className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl object-contain"
                  />
                </motion.div>
              </div>

              {/* Main Heading - Responsive Typography */}
              <motion.div
                className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold mt-2 sm:mt-4 px-2 text-center leading-tight max-w-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
              >
                <h1>Access Real Assets. Anytime. Anywhere</h1>
              </motion.div>

              {/* Subheading - Responsive Typography */}
              <motion.div
                className="text-gray-100 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-1 sm:mt-2 px-4 sm:px-8 text-center max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
              >
                <p>We're building something amazing, just for you.</p>
              </motion.div>

              {/* Progress Bar - Responsive Width */}
              <motion.div
                className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mt-4 sm:mt-6 lg:mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
              >
                <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#F4B448] to-[#F4B448] rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <div className="flex justify-center mt-2">
                  <span className="text-white text-xs sm:text-sm font-medium">
                    {progress}%
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default SplashScreen;