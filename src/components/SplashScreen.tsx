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
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Track window dimensions for responsive video sizing
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("orientationchange", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("orientationchange", updateDimensions);
    };
  }, []);

  // Determine if we're in portrait mode or small screen
  const isPortrait = dimensions.height > dimensions.width;
  const isSmallScreen = dimensions.width < 768;
  const isMobile = dimensions.width < 640;

  // Video loading logic with enhanced mobile support
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setVideoLoaded(true);
      if (!isFinishing) {
        // Add a small delay for mobile devices
        setTimeout(
          () => {
            video.play().catch((error) => {
              console.error("Error playing video:", error);
              setVideoError(true);
              setShowFallback(true);
            });
          },
          isMobile ? 300 : 100
        );
      }
    };

    const handleError = (event: Event) => {
      console.error("Error loading video:", event);
      console.error("Video src:", video.src);
      setVideoError(true);
      setShowFallback(true);
    };

    const handleCanPlay = () => {
      if (!isFinishing && videoLoaded && !videoPlaying) {
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

    const handleLoadedMetadata = () => {
      // Ensure video is properly sized after metadata loads
      if (video.videoWidth && video.videoHeight) {
        console.log(
          `Video dimensions: ${video.videoWidth}x${video.videoHeight}`
        );
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("error", handleError);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    // Reduced timeout for mobile devices
    const fallbackTimeout = setTimeout(
      () => {
        if (!videoLoaded) {
          console.log("Video taking too long to load, showing fallback");
          setVideoError(true);
          setShowFallback(true);
        }
      },
      isMobile ? 2000 : 3000
    );

    // Preload the video
    video.load();

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("error", handleError);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      clearTimeout(fallbackTimeout);
    };
  }, [isFinishing, videoLoaded, videoPlaying, isMobile]);

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
          }, 200);

          return 100;
        });
      }, 30);

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
      ref={containerRef}
      className="fixed inset-0 z-[9999] w-full h-full bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: isFinishing ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "100dvh",
        height: "100dvh",
      }}
    >
      {/* Video Splash Screen */}
      {!showFallback && (
        <>
          {/* Loading spinner while video loads */}
          {!videoLoaded && !videoError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 border-t-2 border-b-2 border-white"></div>
            </div>
          )}

          {/* Video Container with Responsive Aspect Ratio */}
          <div
            className="relative w-full h-full flex items-center justify-center bg-black"
            style={{
              minHeight: "100dvh",
            }}
          >
            <video
              ref={videoRef}
              className={cn(
                "transition-opacity duration-500",
                videoLoaded ? "opacity-100" : "opacity-0",
                // Responsive video sizing based on screen size and orientation
                isMobile
                  ? isPortrait
                    ? "w-full h-auto max-h-full object-contain" // Portrait mobile: fit width, maintain aspect ratio
                    : "w-auto h-full max-w-full object-contain" // Landscape mobile: fit height, maintain aspect ratio
                  : isPortrait
                  ? "w-full h-auto max-h-full object-contain" // Portrait tablet/desktop
                  : "w-full h-full object-cover" // Landscape tablet/desktop: fill screen
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
              x5-video-orientation="portraint" // Prevent forced landscape on some Android devices
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => {
                setVideoError(true);
                setShowFallback(true);
              }}
              onPlay={() => setVideoPlaying(true)}
              onPause={() => setVideoPlaying(false)}
              style={{
                // Dynamic object positioning for different orientations
                objectPosition: isPortrait ? "center center" : "center center",
                // Ensure video never exceeds viewport
                maxWidth: "100vw",
                maxHeight: "100dvh",
                // Prevent video from being too small on any device
                minWidth: isMobile && isPortrait ? "100%" : "auto",
                minHeight: isMobile && !isPortrait ? "100%" : "auto",
              }}
            >
              <source src="/arlintro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Black bars/background to fill remaining space when video doesn't fill screen */}
            {(isMobile || isPortrait) && (
              <div className="absolute inset-0 -z-10 bg-black" />
            )}
          </div>
        </>
      )}

      {/* Fallback Image Splash Screen with enhanced mobile responsiveness */}
      {showFallback && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black px-3 sm:px-4 md:px-6 lg:px-8 py-4"
            style={{
              minHeight: "100dvh",
            }}
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
              className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full max-w-6xl mx-auto"
            >
              {/* Logo and Text Container - Enhanced Mobile Layout */}
              <div
                className={cn(
                  "flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full justify-center",
                  isMobile && isPortrait ? "flex-col" : "flex-col sm:flex-row"
                )}
              >
                {/* Coin Image - More Responsive Sizing */}
                <motion.div
                  className={cn(
                    "flex-shrink-0",
                    isMobile
                      ? "w-24 h-24 xs:w-28 xs:h-28"
                      : "w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56"
                  )}
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
                    width={224}
                    height={224}
                    priority
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                {/* Text Image - More Responsive Sizing */}
                <motion.div
                  className="flex items-center justify-center w-full sm:w-auto"
                  initial={{
                    opacity: 0,
                    x: isMobile ? 0 : 20,
                    y: isMobile ? 10 : 0,
                  }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{
                    opacity: 0,
                    x: isMobile ? 0 : 20,
                    y: isMobile ? 10 : 0,
                  }}
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
                    className={cn(
                      "w-full h-auto object-contain",
                      isMobile
                        ? "max-w-[280px] xs:max-w-xs"
                        : "max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
                    )}
                  />
                </motion.div>
              </div>

              {/* Main Heading - Better Mobile Typography */}
              <motion.div
                className={cn(
                  "text-white font-extrabold text-center leading-tight max-w-4xl px-2",
                  isMobile
                    ? "text-lg xs:text-xl mt-1"
                    : "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2 sm:mt-4"
                )}
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
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};
export default SplashScreen;
