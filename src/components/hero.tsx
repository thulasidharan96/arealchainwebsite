import { Button } from "@/src/components/ui/button";
import dynamic from "next/dynamic";
import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Lazy load SplineViewer for better initial page load
const SplineViewer = dynamic(() => import("./SplineViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-800/20 rounded-xl animate-pulse flex items-center justify-center">
      <div className="text-gray-400">Loading 3D Model...</div>
    </div>
  ),
});

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  // Refs for animation targets
  const heroRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const videoSectionRef = useRef(null);
  const blobsRef = useRef(null);

  // Timeline refs for cleanup
  const tlRefs = useRef([]);

  // Optimized button click handlers
  const handleCreateWealthClick = useCallback(() => {
    window.location.href = "/contact";
  }, []);

  const handleRoadmapClick = useCallback(() => {
    window.location.href = "/roadmap";
  }, []);

  const handleYouTubeClick = useCallback(() => {
    window.open(
      "https://www.youtube.com/@ArealChain",
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  useEffect(() => {
    // Set initial states for all animated elements
    gsap.set(
      [
        leftContentRef.current?.children || [],
        rightContentRef.current,
        videoSectionRef.current?.children || [],
      ],
      {
        opacity: 0,
        y: 50,
        force3D: true,
      }
    );

    // Set initial state for background blobs
    gsap.set(blobsRef.current?.children || [], {
      opacity: 0,
      scale: 0.8,
      force3D: true,
    });

    // Create main hero timeline
    const heroTl = gsap.timeline({
      delay: 0.2, // Small delay for smoother entry
    });

    // Animate background blobs first
    heroTl
      .to(blobsRef.current?.children || [], {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out",
        force3D: true,
      })
      // Animate left content
      .to(
        leftContentRef.current?.children || [],
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          force3D: true,
        },
        0.3
      )
      // Animate right content (3D viewer)
      .to(
        rightContentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          force3D: true,
        },
        0.6
      );

    tlRefs.current.push(heroTl);

    // Video section scroll animation
    const videoScrollTrigger = ScrollTrigger.create({
      trigger: videoSectionRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const videoTl = gsap.timeline();

        videoTl.to(videoSectionRef.current?.children || [], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          force3D: true,
        });

        tlRefs.current.push(videoTl);
      },
    });

    // Floating animation for background blobs
    const floatingTl = gsap.timeline({ repeat: -1, yoyo: true });
    floatingTl.to(blobsRef.current?.children || [], {
      y: "+=20",
      rotation: "+=5",
      duration: 4,
      stagger: 0.5,
      ease: "sine.inOut",
      force3D: true,
    });

    tlRefs.current.push(floatingTl);

    // Gradient animation for the AREAL text
    const gradientTl = gsap.timeline({ repeat: -1 });
    gradientTl.to(".animate-gradient", {
      backgroundPosition: "200% center",
      duration: 3,
      ease: "none",
    });

    tlRefs.current.push(gradientTl);

    // Enhanced cleanup
    return () => {
      // Kill ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Kill all timelines
      tlRefs.current.forEach((tl) => {
        if (tl && tl.kill) {
          tl.kill();
        }
      });
      tlRefs.current = [];

      // Clear any remaining tweens
      gsap.killTweensOf("*");
    };
  }, []);

  // Optimized hover handlers for buttons
  const handleButtonHover = useCallback((e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
    });
  }, []);

  const handleButtonLeave = useCallback((e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
    });
  }, []);

  return (
    <div
      ref={heroRef}
      className="hero-section relative min-h-screen w-full bg-transparent overflow-hidden mt-20 md:mt-16 lg:mt-16"
    >
      {/* Background blobs with optimized animations */}
      <div ref={blobsRef} className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F4B448]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-[80vh] px-4 sm:px-8 md:px-12 max-w-7xl mx-auto gap-10">
        {/* Left content */}
        <div ref={leftContentRef} className="w-full lg:w-1/2 text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 leading-tight">
            Transforming the World's <br /> Assets with{" "}
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            <span className="text-transparent bg-clip-text animate-gradient bg-gradient-to-r from-yellow-400 via-[#F4B448] to-yellow-400 bg-[length:200%_200%]">
              AREAL
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 max-w-xl">
            AREAL is a Layer-1 Blockchain that makes it easy to buy and sell
            real-world assets in a click. It's built for an open, permissionless
            financial system where anyone can participate.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black font-semibold px-8 transition-all duration-300"
              onClick={handleCreateWealthClick}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              Create your Wealth with Areal →
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 transition-all duration-300"
              onClick={handleRoadmapClick}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              View our Roadmap
            </Button>
          </div>
        </div>

        {/* Right: Spline Viewer */}
        <div
          ref={rightContentRef}
          className="w-full lg:w-1/2 flex justify-center items-center"
        >
          <SplineViewer />
        </div>
      </div>

      {/* Video Section with optimized loading */}
      <div
        ref={videoSectionRef}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 pb-12 pt-8"
      >
        <h2
          className="text-3xl sm:text-4xl md:text-4xl font-bold text-white mb-6 text-center cursor-pointer transition-colors duration-300 hover:text-[#F4B448]"
          onClick={handleYouTubeClick}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
        >
          See What's Happening at AREAL
        </h2>

        <div className="aspect-video rounded-xl overflow-hidden border-2 border-[#F4B448]/30 shadow-[0_0_25px_#F4B44833] transition-all duration-300 hover:shadow-[0_0_35px_#F4B44850]">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/uywf3RlK5aE?autoplay=1&mute=1&loop=1&playlist=uywf3RlK5aE&controls=0&modestbranding=1&showinfo=0&rel=0&preload=metadata"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            title="AREAL Blockchain Introduction Video"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
