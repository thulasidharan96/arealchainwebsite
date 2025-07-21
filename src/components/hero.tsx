"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/src/components/ui/button";

const SplineViewer = dynamic(() => import("./SplineViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-800/20 rounded-xl animate-pulse flex items-center justify-center">
      <div className="text-gray-400">Loading 3D Model...</div>
    </div>
  ),
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const leftContentRef = useRef<HTMLDivElement | null>(null);
  const rightContentRef = useRef<HTMLDivElement | null>(null);
  const videoSectionRef = useRef<HTMLDivElement | null>(null);
  const blobsRef = useRef<HTMLDivElement | null>(null);
  const tlRefs = useRef<gsap.core.Timeline[]>([]);

  const handleCreateWealthClick = () => (window.location.href = "/contact");
  const handleRoadmapClick = () => (window.location.href = "/roadmap");
  const handleYouTubeClick = () =>
    window.open(
      "https://www.youtube.com/@ArealChain",
      "_blank",
      "noopener,noreferrer"
    );

  const handleButtonHover = (e: React.MouseEvent<HTMLElement>) =>
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
    });

  const handleButtonLeave = (e: React.MouseEvent<HTMLElement>) =>
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
    });

  useEffect(() => {
    requestIdleCallback(() => {
      const leftChildren = leftContentRef.current?.children || [];
      const right = rightContentRef.current;
      const videoChildren = videoSectionRef.current?.children || [];
      const blobs = blobsRef.current?.children || [];

      gsap.set([...leftChildren, right, ...videoChildren], {
        opacity: 0,
        y: 50,
      });
      gsap.set(blobs, { opacity: 0, scale: 0.8 });

      const heroTl = gsap.timeline({ delay: 0.2 });
      heroTl
        .to(blobs, {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "power2.out",
        })
        .to(
          leftChildren,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          0.3
        )
        .to(
          right,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          0.6
        );

      tlRefs.current.push(heroTl);

      ScrollTrigger.create({
        trigger: videoSectionRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const videoTl = gsap.timeline();
          videoTl.to(videoChildren, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
          });
          tlRefs.current.push(videoTl);
        },
      });

      const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
      floatTl.to(blobs, {
        y: "+=20",
        rotation: "+=5",
        duration: 4,
        stagger: 0.5,
        ease: "sine.inOut",
      });
      tlRefs.current.push(floatTl);

      const gradientTl = gsap.timeline({ repeat: -1 });
      gradientTl.to(".animate-gradient", {
        backgroundPosition: "200% center",
        duration: 3,
        ease: "none",
      });
      tlRefs.current.push(gradientTl);
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tlRefs.current.forEach((tl) => tl.kill());
      tlRefs.current = [];
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="hero-section relative min-h-screen w-full bg-transparent overflow-hidden mt-20 md:mt-16 lg:mt-16"
    >
      {/* Blobs */}
      <div ref={blobsRef} className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F4B448]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-[80vh] px-4 sm:px-8 md:px-12 max-w-7xl mx-auto gap-10">
        <div ref={leftContentRef} className="w-full lg:w-1/2 text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 leading-tight">
            Transforming the World's <br /> Assets with
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            <span className="text-transparent bg-clip-text animate-gradient bg-gradient-to-r from-yellow-400 via-[#F4B448] to-yellow-400 bg-[length:200%_200%]">
              AREAL
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 max-w-xl">
            AREAL is a Layer-1 Blockchain that makes it easy to buy and sell
            real-world assets in a click. Built for an open, permissionless
            financial system.
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

        <div
          ref={rightContentRef}
          className="w-full lg:w-1/2 flex justify-center items-center"
        >
          <SplineViewer />
        </div>
      </div>

      {/* Video Section */}
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
            src="https://www.youtube.com/embed/uywf3RlK5aE?autoplay=1&mute=1&loop=1&playlist=uywf3RlK5aE&controls=0&modestbranding=1&showinfo=0&rel=0"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title="AREAL Blockchain Introduction Video"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
