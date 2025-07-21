"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/src/lib/utils";
import Image from "next/image";

interface SplashScreenProps {
  isFinishing: boolean;
  onComplete?: () => void;
}

export default function SplashScreen({
  isFinishing,
  onComplete,
}: SplashScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);

  // Prevent body scroll
  useEffect(() => {
    if (!isFinishing) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isFinishing]);

  // Video setup and fallback logic
  useEffect(() => {
    if (isFinishing) return;

    const video = videoRef.current;
    if (!video) {
      setShowFallback(true);
      return;
    }

    const handleComplete = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      setTimeout(() => onComplete?.(), 300);
    };

    const handleVideoEnd = () => handleComplete();

    const handleVideoError = () => {
      console.log("Video failed, showing fallback");
      setShowFallback(true);
    };

    // Fallback timeout for slow loading
    const fallbackTimer = setTimeout(() => {
      if (!video.readyState || video.readyState < 2) {
        console.log("Video loading timeout, showing fallback");
        setShowFallback(true);
      }
    }, 3000);

    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("error", handleVideoError);

    return () => {
      clearTimeout(fallbackTimer);
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("error", handleVideoError);
    };
  }, [isFinishing, onComplete]);

  // Fallback progress bar
  useEffect(() => {
    if (showFallback && !isFinishing && !completedRef.current) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            if (!completedRef.current) {
              completedRef.current = true;
              setTimeout(() => onComplete?.(), 200);
            }
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [showFallback, isFinishing, onComplete]);

  if (isFinishing) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      {!showFallback ? (
        // Video splash
        <video
          ref={videoRef}
          className={cn(
            "w-full h-full object-cover",
            isMobile && "object-contain"
          )}
          autoPlay
          muted
          playsInline
          preload="auto"
          onError={() => setShowFallback(true)}
          style={{ maxHeight: "100dvh", maxWidth: "100dvw" }}
        >
          <source src="/arlintro.mp4" type="video/mp4" />
          <source src="/arlintro.webm" type="video/webm" />
        </video>
      ) : (
        // Fallback splash
        <div className="flex flex-col items-center justify-center gap-6 px-4 text-center">
          <div
            className={cn(
              "flex items-center gap-6",
              isMobile && "flex-col gap-4"
            )}
          >
            <Image
              src="/coin/coin.avif"
              alt="Logo"
              width={isMobile ? 80 : 120}
              height={isMobile ? 80 : 120}
              priority
              className="object-contain"
            />
            <Image
              src="/coin/text.avif"
              alt="Text"
              width={isMobile ? 200 : 320}
              height={isMobile ? 100 : 160}
              priority
              className="object-contain"
            />
          </div>

          <h1
            className={cn(
              "text-white font-bold leading-tight",
              isMobile ? "text-lg" : "text-2xl md:text-3xl"
            )}
          >
            Access Real Assets. Anytime. Anywhere
          </h1>

          {/* Simple progress bar */}
          <div className="w-64 max-w-full bg-gray-800 rounded-full h-1">
            <div
              className="h-full bg-white rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
