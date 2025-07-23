"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
// Uncomment if you have GSAP license
// import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

interface SvgMorphSplashProps {
  isFinishing: boolean;
  onComplete?: () => void;
}

const SvgMorphSplash = ({ isFinishing, onComplete }: SvgMorphSplashProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [progress, setProgress] = useState(0);
  const timelineRef = useRef<gsap.core.Timeline>();

  useEffect(() => {
    // Uncomment if you have GSAP license
    // gsap.registerPlugin(MorphSVGPlugin);

    if (!containerRef.current || !svgRef.current || isFinishing) return;

    const tl = gsap.timeline({
      onUpdate: () => {
        const progressValue = Math.round(tl.progress() * 100);
        setProgress(progressValue);
      },
      onComplete: () => {
        setTimeout(() => {
          onComplete?.();
        }, 500);
      },
    });

    timelineRef.current = tl;

    // Initial setup - hide everything
    gsap.set(".building-group", {
      opacity: 0,
      x: -100,
      transformOrigin: "center bottom",
    });
    gsap.set(".detail-group", {
      opacity: 0,
      scale: 0,
      transformOrigin: "center",
    });
    gsap.set(".reveal-mask", {
      attr: { width: 0 },
    });

    // Animation sequence
    tl
      // Initial fade in
      .to(svgRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      })

      // Reveal mask animation (left to right)
      .to(
        ".reveal-mask",
        {
          attr: { width: "100%" },
          duration: 2.5,
          ease: "power2.inOut",
        },
        0.5
      )

      // Background details fade in first
      .to(
        ".detail-back",
        {
          opacity: 0.3,
          duration: 0.8,
          ease: "power2.out",
        },
        0.8
      )

      // Buildings appear in sequence from left to right
      .to(
        ".building-1",
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "back.out(1.7)",
          stagger: 0.1,
        },
        1.0
      )

      .to(
        ".building-2",
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "back.out(1.7)",
          stagger: 0.1,
        },
        1.3
      )

      .to(
        ".building-3",
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "back.out(1.7)",
          stagger: 0.1,
        },
        1.6
      )

      .to(
        ".building-4",
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "back.out(1.7)",
          stagger: 0.1,
        },
        1.9
      )

      .to(
        ".building-5",
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "back.out(1.7)",
          stagger: 0.1,
        },
        2.2
      )

      // Special architectural elements
      .to(
        ".detail-special",
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "elastic.out(1, 0.6)",
        },
        2.5
      )

      // Final cityscape scale and shimmer effect
      .to(
        ".cityscape-group",
        {
          scale: 1.03,
          duration: 0.4,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        },
        3.8
      )

      // Subtle breathing effect
      .to(
        ".cityscape-group",
        {
          scale: 1.01,
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        },
        4.5
      );

    return () => {
      tl.kill();
    };
  }, [isFinishing, onComplete]);

  // Handle finishing state
  useEffect(() => {
    if (isFinishing && timelineRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [isFinishing]);

  if (isFinishing) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] w-full h-full flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #091212 0%, #0d1b1b 50%, #091212 100%)",
      }}
    >
      {/* Main SVG Container - Responsive sizing */}
      <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
        <svg
          ref={svgRef}
          viewBox="0 0 2963 1520"
          className="w-full h-full opacity-0 max-w-[98vw] max-h-[95vh] sm:max-w-[95vw] sm:max-h-[90vh] md:max-w-[90vw] md:max-h-[85vh] lg:max-w-[85vw] lg:max-h-[80vh] xl:max-w-[80vw] xl:max-h-[75vh] 2xl:max-w-[75vw] 2xl:max-h-[70vh]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFB73D" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F4B448" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="detailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#82632C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#82632C" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFB73D" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFB73D" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFB73D" stopOpacity="0" />
            </linearGradient>
            <clipPath id="revealClip">
              <rect className="reveal-mask" x="0" y="0" width="0" height="1520" />
            </clipPath>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background */}
          <rect width="2963" height="1520" fill="#091212" />

          {/* Main cityscape group with reveal mask */}
          <g className="cityscape-group" clipPath="url(#revealClip)">
            {/* Background detail elements (low opacity) */}
            <g className="detail-group detail-back" opacity="0.3">
              {/* Building window patterns */}
              <g>
                <rect x="739.5" y="1046.1" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="826.8" y="1046.1" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="914.2" y="1046.1" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="739.5" y="1067" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="826.8" y="1067" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="914.2" y="1067" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="739.5" y="1087.9" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="826.8" y="1087.9" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="914.2" y="1087.9" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="739.5" y="1108.7" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="826.8" y="1108.7" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="914.2" y="1108.7" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="739.5" y="1129.6" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="826.8" y="1129.6" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="914.2" y="1129.6" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="739.5" y="1150.5" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="826.8" y="1150.5" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="914.2" y="1150.5" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="739.5" y="1171.4" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="826.8" y="1171.4" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="914.2" y="1171.4" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="739.5" y="1192.2" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="826.8" y="1192.2" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="914.2" y="1192.2" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="739.5" y="1213.1" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="826.8" y="1213.1" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="914.2" y="1213.1" fill="#FFB73D" width="72.8" height="12.7"/>
                <rect x="739.5" y="1234" fill="#FFB73D" width="72.8" height="12.6"/>
                <rect x="826.8" y="1234" fill="#FFB73D" width="72.8" height="12.6"/>
                <rect x="914.2" y="1234" fill="#FFB73D" width="72.8" height="12.6"/>
                <rect x="739.5" y="1254.9" fill="#FFB73D" width="72.8" height="12.6"/>
                <rect x="826.8" y="1254.9" fill="#FFB73D" width="72.8" height="12.6"/>
                <rect x="914.2" y="1254.9" fill="#FFB73D" width="72.8" height="12.6"/>
                <rect x="739.5" y="1275.7" fill="#FFB73D" width="72.8" height="12.6"/>
                <rect x="826.8" y="1275.7" fill="#FFB73D" width="72.8" height="12.6"/>
                <rect x="914.2" y="1275.7" fill="#FFB73D" width="72.8" height="12.6"/>
              </g>
              
              {/* Building outline */}
              <path fill="#FFB73D" d="M809.2,1212v194.8h3.5v-191.3h101.1v191.3h3.5V1212H809.2z"/>
              
              {/* Window grid patterns */}
              <g>
                <rect x="819.3" y="1221.4" fill="#FFB73D" width="7.2" height="26.4"/>
                <rect x="819.3" y="1254.5" fill="#FFB73D" width="7.2" height="26.5"/>
                <rect x="819.3" y="1287.7" fill="#FFB73D" width="7.2" height="26.4"/>
                <rect x="819.3" y="1320.8" fill="#FFB73D" width="7.2" height="26.5"/>
                <rect x="835.4" y="1221.4" fill="#FFB73D" width="7.2" height="26.4"/>
                <rect x="835.4" y="1254.5" fill="#FFB73D" width="7.2" height="26.5"/>
                <rect x="835.4" y="1287.7" fill="#FFB73D" width="7.2" height="26.4"/>
                <rect x="835.4" y="1320.8" fill="#FFB73D" width="7.2" height="26.5"/>
                <rect x="851.6" y="1221.4" fill="#FFB73D" width="7.2" height="26.4"/>
                <rect x="851.6" y="1254.5" fill="#FFB73D" width="7.2" height="26.5"/>
                <rect x="851.6" y="1287.7" fill="#FFB73D" width="7.2" height="26.4"/>
                <rect x="851.6" y="1320.8" fill="#FFB73D" width="7.2" height="26.5"/>
                <rect x="867.7" y="1221.4" fill="#FFB73D" width="7.2" height="26.4"/>
                <rect x="867.7" y="1254.5" fill="#FFB73D" width="7.2" height="26.5"/>
                <rect x="867.7" y="1287.7" fill="#FFB73D" width="7.2" height="26.4"/>
                <rect x="867.7" y="1320.8" fill="#FFB73D" width="7.2" height="26.5"/>
                <rect x="883.9" y="1221.4" fill="#FFB73D" width="7.2" height="26.4"/>
                <rect x="883.9" y="1254.5" fill="#FFB73D" width="7.2" height="26.5"/>
                <rect x="883.9" y="1287.7" fill="#FFB73D" width="7.2" height="26.4"/>
                <rect x="883.9" y="1320.8" fill="#FFB73D" width="7.2" height="26.5"/>
                <rect x="900" y="1221.4" fill="#FFB73D" width="7.2" height="26.4"/>
                <rect x="900" y="1254.5" fill="#FFB73D" width="7.2" height="26.5"/>
                <rect x="900" y="1287.7" fill="#FFB73D" width="7.2" height="26.4"/>
                <rect x="900" y="1320.8" fill="#FFB73D" width="7.2" height="26.5"/>
              </g>
              
              {/* Horizontal line details */}
              <g>
                <rect x="551.3" y="1115.4" fill="#FFB73D" width="196.4" height="3.1"/>
                <rect x="551.3" y="1136.5" fill="#FFB73D" width="196.4" height="3.1"/>
                <rect x="551.3" y="1157.6" fill="#FFB73D" width="196.4" height="3.1"/>
                <rect x="551.3" y="1178.7" fill="#FFB73D" width="196.4" height="3.1"/>
                <rect x="551.3" y="1199.9" fill="#FFB73D" width="196.4" height="3.1"/>
                <rect x="551.3" y="1221" fill="#FFB73D" width="196.4" height="3.1"/>
                <rect x="551.3" y="1242.1" fill="#FFB73D" width="196.4" height="3.1"/>
                <rect x="551.3" y="1263.2" fill="#FFB73D" width="196.4" height="3.1"/>
                <rect x="551.3" y="1284.4" fill="#FFB73D" width="196.4" height="3.1"/>
                <rect x="551.3" y="1305.5" fill="#FFB73D" width="196.4" height="3.1"/>
                <rect x="551.3" y="1326.6" fill="#FFB73D" width="196.4" height="3.1"/>
              </g>
              
              {/* Grid patterns for tall buildings */}
              <g>
                <rect x="1650.1" y="1069.3" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1680.9" y="1069.3" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1711.8" y="1069.3" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1742.6" y="1069.3" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1773.4" y="1069.3" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1804.2" y="1069.3" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1835" y="1069.3" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1650.1" y="1096.1" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1680.9" y="1096.1" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1711.8" y="1096.1" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1742.6" y="1096.1" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1773.4" y="1096.1" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1804.2" y="1096.1" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1835" y="1096.1" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1650.1" y="1122.9" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1680.9" y="1122.9" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1711.8" y="1122.9" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1742.6" y="1122.9" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1773.4" y="1122.9" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1804.2" y="1122.9" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1835" y="1122.9" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1650.1" y="1149.7" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1680.9" y="1149.7" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1711.8" y="1149.7" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1742.6" y="1149.7" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1773.4" y="1149.7" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1804.2" y="1149.7" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1835" y="1149.7" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1650.1" y="1176.5" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1680.9" y="1176.5" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1711.8" y="1176.5" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1742.6" y="1176.5" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1773.4" y="1176.5" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1804.2" y="1176.5" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1835" y="1176.5" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1650.1" y="1203.2" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1680.9" y="1203.2" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1711.8" y="1203.2" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1742.6" y="1203.2" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1773.4" y="1203.2" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1804.2" y="1203.2" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1835" y="1203.2" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1650.1" y="1230" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1680.9" y="1230" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1711.8" y="1230" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1742.6" y="1230" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1773.4" y="1230" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1804.2" y="1230" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1835" y="1230" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1650.1" y="1256.8" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1680.9" y="1256.8" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1711.8" y="1256.8" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1742.6" y="1256.8" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1773.4" y="1256.8" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1804.2" y="1256.8" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1835" y="1256.8" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1650.1" y="1283.6" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1680.9" y="1283.6" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1711.8" y="1283.6" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1742.6" y="1283.6" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1773.4" y="1283.6" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1804.2" y="1283.6" fill="#FFB73D" width="17.6" height="17.6"/>
                <rect x="1835" y="1283.6" fill="#FFB73D" width="17.6" height="17.6"/>
              </g>
              
              {/* Additional detailed windows */}
              <g>
                <rect x="1663.3" y="1012.3" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1678.3" y="1012.3" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1693.4" y="1012.3" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1708.4" y="1012.3" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1723.4" y="1012.3" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1738.5" y="1012.3" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1753.5" y="1012.3" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1768.6" y="1012.3" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1783.6" y="1012.3" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1798.7" y="1012.3" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1813.7" y="1012.3" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1828.7" y="1012.3" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1663.3" y="1034.8" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1678.3" y="1034.8" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1693.4" y="1034.8" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1708.4" y="1034.8" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1723.4" y="1034.8" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1738.5" y="1034.8" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1753.5" y="1034.8" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1768.6" y="1034.8" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1783.6" y="1034.8" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1798.7" y="1034.8" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1813.7" y="1034.8" fill="#FFB73D" width="10.8" height="15.1"/>
                <rect x="1828.7" y="1034.8" fill="#FFB73D" width="10.8" height="15.1"/>
              </g>
              
              {/* Horizontal building details */}
              <g>
                <rect x="1668.4" y="843.8" fill="#FFB73D" width="142" height="4.9"/>
                <rect x="1692.5" y="854.8" fill="#FFB73D" width="142" height="4.9"/>
                <rect x="1668.4" y="865.8" fill="#FFB73D" width="142" height="4.9"/>
                <rect x="1692.5" y="876.8" fill="#FFB73D" width="142" height="4.9"/>
                <rect x="1668.4" y="887.8" fill="#FFB73D" width="142" height="4.9"/>
                <rect x="1692.5" y="898.8" fill="#FFB73D" width="142" height="4.9"/>
                <rect x="1668.4" y="909.8" fill="#FFB73D" width="142" height="4.9"/>
                <rect x="1692.5" y="920.7" fill="#FFB73D" width="142" height="4.9"/>
                <rect x="1668.4" y="931.7" fill="#FFB73D" width="142" height="4.9"/>
                <rect x="1692.5" y="942.7" fill="#FFB73D" width="142" height="4.9"/>
                <rect x="1668.4" y="953.7" fill="#FFB73D" width="142" height="4.9"/>
                <rect x="1692.5" y="964.7" fill="#FFB73D" width="142" height="4.9"/>
                <rect x="1668.4" y="975.7" fill="#FFB73D" width="142" height="4.9"/>
                <rect x="1692.5" y="986.7" fill="#FFB73D" width="142" height="4.9"/>
              </g>
              
              {/* Small vertical details */}
              <g>
                <rect x="1683.2" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1688.3" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1693.3" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1698.4" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1703.4" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1708.4" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1713.5" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1718.5" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1723.6" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1728.6" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1733.7" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1767.5" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1772.5" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1777.5" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1782.5" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1787.4" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1792.4" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1797.4" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1802.4" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1807.3" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1812.3" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
                <rect x="1817.3" y="813.7" fill="#FFB73D" width="1.9" height="13.1"/>
              </g>
              
              {/* Building floor patterns */}
              <g>
                <rect x="1173.7" y="754.5" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="754.5" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="754.5" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="773.7" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="773.7" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="773.7" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="792.8" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="792.8" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="792.8" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="812" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="812" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="812" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="831.1" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="831.1" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="831.1" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="850.2" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="850.2" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="850.2" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="869.4" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="869.4" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="869.4" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="888.5" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="888.5" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="888.5" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="907.7" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="907.7" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="907.7" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="926.8" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="926.8" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="926.8" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="945.9" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="945.9" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="945.9" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="965.1" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="965.1" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="965.1" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="984.2" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="984.2" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="984.2" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="1003.4" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="1003.4" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="1003.4" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="1022.5" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="1022.5" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="1022.5" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="1041.6" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="1041.6" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="1041.6" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="1060.8" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="1060.8" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="1060.8" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="1079.9" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="1079.9" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="1079.9" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="1099.1" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="1099.1" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="1099.1" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="1118.2" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="1118.2" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="1118.2" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="1137.4" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="1137.4" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="1137.4" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="1156.5" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="1156.5" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="1156.5" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="1175.6" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="1175.6" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="1175.6" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="1194.8" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="1194.8" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="1194.8" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="1213.9" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="1213.9" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="1213.9" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="1233.1" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="1233.1" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="1233.1" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="1252.2" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="1252.2" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="1252.2" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="1271.3" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="1271.3" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="1271.3" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="1290.5" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="1290.5" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="1290.5" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="1309.6" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="1309.6" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="1309.6" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="1328.8" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="1328.8" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="1328.8" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1173.7" y="1347.9" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1207.2" y="1347.9" fill="#FFB73D" width="25" height="6.5"/>
                <rect x="1251.3" y="1347.9" fill="#FFB73D" width="25" height="6.5"/>
              </g>
              
              {/* Additional building details */}
              <rect x="1927.3" y="1327.5" fill="#FFB73D" width="54.9" height="79.3"/>
              
              {/* More window patterns */}
              <g>
                <rect x="1869.9" y="1024.2" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1888.2" y="1024.2" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1916.8" y="1024.2" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1935.2" y="1024.2" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1963.8" y="1024.2" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1982.1" y="1024.2" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="2010.7" y="1024.2" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="2029.1" y="1024.2" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1869.9" y="1057.9" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1888.2" y="1057.9" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1916.8" y="1057.9" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1935.2" y="1057.9" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1963.8" y="1057.9" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1982.1" y="1057.9" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="2010.7" y="1057.9" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="2029.1" y="1057.9" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1869.9" y="1091.5" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1888.2" y="1091.5" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1916.8" y="1091.5" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1935.2" y="1091.5" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1963.8" y="1091.5" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1982.1" y="1091.5" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="2010.7" y="1091.5" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="2029.1" y="1091.5" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1869.9" y="1125.1" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1888.2" y="1125.1" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1916.8" y="1125.1" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1935.2" y="1125.1" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1963.8" y="1125.1" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1982.1" y="1125.1" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="2010.7" y="1125.1" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="2029.1" y="1125.1" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1869.9" y="1158.8" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1888.2" y="1158.8" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1916.8" y="1158.8" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1935.2" y="1158.8" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1963.8" y="1158.8" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1982.1" y="1158.8" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="2010.7" y="1158.8" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="2029.1" y="1158.8" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1869.9" y="1192.4" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1888.2" y="1192.4" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1916.8" y="1192.4" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1935.2" y="1192.4" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1963.8" y="1192.4" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1982.1" y="1192.4" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="2010.7" y="1192.4" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="2029.1" y="1192.4" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1869.9" y="1226" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1888.2" y="1226" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1916.8" y="1226" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1935.2" y="1226" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1963.8" y="1226" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1982.1" y="1226" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="2010.7" y="1226" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="2029.1" y="1226" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1869.9" y="1259.7" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1888.2" y="1259.7" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1916.8" y="1259.7" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1935.2" y="1259.7" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1963.8" y="1259.7" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1982.1" y="1259.7" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="2010.7" y="1259.7" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="2029.1" y="1259.7" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1869.9" y="1293.3" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1888.2" y="1293.3" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1916.8" y="1293.3" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1935.2" y="1293.3" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1963.8" y="1293.3" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="1982.1" y="1293.3" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="2010.7" y="1293.3" fill="#FFB73D" width="10.6" height="24.5"/>
                <rect x="2029.1" y="1293.3" fill="#FFB73D" width="10.6" height="24.5"/>
              </g>
              
              {/* Building lines */}
              <g>
                <rect x="1855.8" y="1012.6" fill="#FFB73D" width="197.8" height="5"/>
                <rect x="1855.8" y="1000.6" fill="#FFB73D" width="197.8" height="5"/>
              </g>
              
              {/* Vertical structural elements */}
              <g>
                <rect x="1472.9" y="569.9" fill="#FFB73D" width="1.7" height="836.8"/>
                <rect x="1483.4" y="569.9" fill="#FFB73D" width="1.7" height="836.8"/>
                <rect x="1493.8" y="569.9" fill="#FFB73D" width="1.7" height="836.8"/>
                <rect x="1504.2" y="569.9" fill="#FFB73D" width="1.8" height="836.8"/>
                <rect x="1514.6" y="569.9" fill="#FFB73D" width="1.8" height="836.8"/>
                <rect x="1525" y="569.9" fill="#FFB73D" width="1.8" height="836.8"/>
                <rect x="1535.4" y="569.9" fill="#FFB73D" width="1.8" height="836.8"/>
                <rect x="1545.8" y="569.9" fill="#FFB73D" width="1.8" height="836.8"/>
                <rect x="1556.3" y="569.9" fill="#FFB73D" width="1.7" height="836.8"/>
                <rect x="1566.6" y="569.9" fill="#FFB73D" width="1.7" height="836.8"/>
                <rect x="1577.1" y="569.9" fill="#FFB73D" width="1.8" height="836.8"/>
                <rect x="1587.5" y="569.9" fill="#FFB73D" width="1.8" height="836.8"/>
                <rect x="1597.9" y="569.9" fill="#FFB73D" width="1.8" height="836.8"/>
                <rect x="1608.3" y="569.9" fill="#FFB73D" width="1.8" height="836.8"/>
                <rect x="1618.7" y="569.9" fill="#FFB73D" width="1.7" height="836.8"/>
                <rect x="1629.1" y="569.9" fill="#FFB73D" width="1.8" height="836.8"/>
                <rect x="1639.5" y="569.9" fill="#FFB73D" width="1.8" height="836.8"/>
              </g>
              
              {/* Horizontal structural elements */}
              <g>
                <rect x="1461.2" y="608.4" fill="#FFB73D" width="191.9" height="5"/>
                <rect x="1461.2" y="677.1" fill="#FFB73D" width="191.9" height="5"/>
                <rect x="1461.2" y="745.7" fill="#FFB73D" width="191.9" height="5"/>
                <rect x="1461.2" y="814.3" fill="#FFB73D" width="191.9" height="5"/>
                <rect x="1461.2" y="882.9" fill="#FFB73D" width="191.9" height="5"/>
                <rect x="1461.2" y="951.6" fill="#FFB73D" width="191.9" height="5"/>
                <rect x="1461.2" y="1020.2" fill="#FFB73D" width="191.9" height="5"/>
                <rect x="1461.2" y="1088.8" fill="#FFB73D" width="191.9" height="5"/>
                <rect x="1461.2" y="1157.4" fill="#FFB73D" width="191.9" height="5"/>
                <rect x="1461.2" y="1226" fill="#FFB73D" width="191.9" height="5"/>
                <rect x="1461.2" y="1294.7" fill="#FFB73D" width="191.9" height="5"/>
                <rect x="1461.2" y="1363.3" fill="#FFB73D" width="191.9" height="5"/>
              </g>
              
              {/* Small decorative elements */}
              <g>
                <rect x="999.4" y="867.4" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="1034.6" y="867.4" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="1069.8" y="867.4" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="1105" y="867.4" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="1140.2" y="867.4" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="999.4" y="913.2" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1034.6" y="913.2" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1069.8" y="913.2" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1105" y="913.2" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1140.2" y="913.2" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="999.4" y="958.9" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1034.6" y="958.9" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1069.8" y="958.9" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1105" y="958.9" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1140.2" y="958.9" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="999.4" y="1004.6" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="1034.6" y="1004.6" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="1069.8" y="1004.6" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="1105" y="1004.6" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="1140.2" y="1004.6" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="999.4" y="1050.4" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="1034.6" y="1050.4" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="1069.8" y="1050.4" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="1105" y="1050.4" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="1140.2" y="1050.4" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="999.4" y="1096.1" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="1034.6" y="1096.1" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="1069.8" y="1096.1" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="1105" y="1096.1" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="1140.2" y="1096.1" fill="#FFB73D" width="18.2" height="28.5"/>
                <rect x="999.4" y="1141.9" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1034.6" y="1141.9" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1069.8" y="1141.9" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1105" y="1141.9" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1140.2" y="1141.9" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="999.4" y="1187.6" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1034.6" y="1187.6" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1069.8" y="1187.6" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1105" y="1187.6" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1140.2" y="1187.6" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="999.4" y="1233.4" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1034.6" y="1233.4" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1069.8" y="1233.4" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1105" y="1233.4" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1140.2" y="1233.4" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="999.4" y="1279.1" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1034.6" y="1279.1" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1069.8" y="1279.1" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1105" y="1279.1" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1140.2" y="1279.1" fill="#FFB73D" width="18.2" height="28.4"/>
                <rect x="1046.8" y="1327.8" fill="#FFB73D" width="64.2" height="78.9"/>
              </g>
              
              {/* More vertical structural elements */}
              <g>
                <rect x="2067.8" y="844.6" fill="#FFB73D" width="1.6" height="562.1"/>
                <rect x="2096.7" y="844.6" fill="#FFB73D" width="1.7" height="562.1"/>
                <rect x="2125.6" y="844.6" fill="#FFB73D" width="1.6" height="562.1"/>
                <rect x="2154.5" y="844.6" fill="#FFB73D" width="1.6" height="562.1"/>
                <rect x="2183.4" y="844.6" fill="#FFB73D" width="1.6" height="562.1"/>
              </g>
              
              {/* Horizontal structural elements */}
              <g>
                <rect x="2036.6" y="872.6" fill="#FFB73D" width="179.5" height="1.7"/>
                <rect x="2036.6" y="906.2" fill="#FFB73D" width="179.5" height="1.7"/>
                <rect x="2036.6" y="939.9" fill="#FFB73D" width="179.5" height="1.7"/>
                <rect x="2036.6" y="973.5" fill="#FFB73D" width="179.5" height="1.7"/>
                <rect x="2036.6" y="1007.1" fill="#FFB73D" width="179.5" height="1.7"/>
                <rect x="2036.6" y="1040.8" fill="#FFB73D" width="179.5" height="1.7"/>
                <rect x="2036.6" y="1074.4" fill="#FFB73D" width="179.5" height="1.7"/>
                <rect x="2036.6" y="1108.1" fill="#FFB73D" width="179.5" height="1.7"/>
                <rect x="2036.6" y="1141.7" fill="#FFB73D" width="179.5" height="1.6"/>
                <rect x="2036.6" y="1175.3" fill="#FFB73D" width="179.5" height="1.6"/>
                <rect x="2036.6" y="1209" fill="#FFB73D" width="179.5" height="1.7"/>
                <rect x="2036.6" y="1242.6" fill="#FFB73D" width="179.5" height="1.6"/>
                <rect x="2036.6" y="1276.2" fill="#FFB73D" width="179.5" height="1.6"/>
                <rect x="2036.6" y="1309.9" fill="#FFB73D" width="179.5" height="1.7"/>
                <rect x="2036.6" y="1343.5" fill="#FFB73D" width="179.5" height="1.7"/>
                <rect x="2036.6" y="1377.2" fill="#FFB73D" width="179.5" height="1.6"/>
              </g>
              
              {/* Large building details */}
              <g>
                <rect x="2101.9" y="806.5" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="825.7" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="845" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="864.3" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="883.5" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="902.8" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="922.1" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="941.3" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="960.6" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="979.9" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="999.1" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1018.4" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1037.7" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1056.9" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1076.2" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1095.5" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1114.7" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1134" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1153.3" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1172.5" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1191.8" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1211.1" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1230.3" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1249.6" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1268.9" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1288.1" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1307.4" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1326.7" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1345.9" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1365.2" fill="#FFB73D" width="49" height="8.8"/>
                <rect x="2101.9" y="1384.5" fill="#FFB73D" width="49" height="8.8"/>
              </g>
              
              {/* Small detail elements */}
              <g>
                <rect x="1091" y="1283.4" fill="#FFB73D" width="51.4" height="4.3"/>
                <rect x="1091" y="1296" fill="#FFB73D" width="51.4" height="4.3"/>
                <rect x="1091" y="1308.7" fill="#FFB73D" width="51.4" height="4.3"/>
                <rect x="1091" y="1321.4" fill="#FFB73D" width="51.4" height="4.3"/>
                <rect x="1091" y="1334.1" fill="#FFB73D" width="51.4" height="4.3"/>
                <rect x="1091" y="1346.7" fill="#FFB73D" width="51.4" height="4.3"/>
                <rect x="1091" y="1359.4" fill="#FFB73D" width="51.4" height="4.3"/>
                <rect x="1091" y="1372.1" fill="#FFB73D" width="51.4" height="4.3"/>
                <rect x="1091" y="1384.7" fill="#FFB73D" width="51.4" height="4.3"/>
                <rect x="1091" y="1397.4" fill="#FFB73D" width="51.4" height="4.3"/>
                <rect x="1308.4" y="1283.4" fill="#FFB73D" width="51.4" height="4.3"/>
                <rect x="1308.4" y="1296" fill="#FFB73D" width="51.4" height="4.3"/>
                <rect x="1308.4" y="1308.7" fill="#FFB73D" width="51.4" height="4.3"/>
                <rect x="1308.4" y="1321.4" fill="#FFB73D" width="51.4" height="4.3"/>
                <rect x="1308.4" y="1334.1" fill="#FFB73D" width="51.4" height="4.3"/>
                <rect x="1308.4" y="1346.7" fill="#FFB73D" width="51.4" height="4.3"/>
                <rect x="1308.4" y="1359.4" fill="#FFB73D" width="51.4" height="4.3"/>
                <rect x="1308.4" y="1372.1" fill="#FFB73D" width="51.4" height="4.3"/>
                <rect x="1308.4" y="1384.7" fill="#FFB73D" width="51.4" height="4.3"/>
                <rect x="1308.4" y="1397.4" fill="#FFB73D" width="51.4" height="4.3"/>
              </g>
              
              {/* Vertical details */}
              <g>
                <rect x="1176.3" y="1129.7" fill="#FFB73D" width="1.7" height="221.4"/>
                <rect x="1187" y="1129.7" fill="#FFB73D" width="1.7" height="221.4"/>
                <rect x="1197.7" y="1129.7" fill="#FFB73D" width="1.7" height="221.4"/>
                <rect x="1208.4" y="1129.7" fill="#FFB73D" width="1.7" height="221.4"/>
                <rect x="1219.1" y="1129.7" fill="#FFB73D" width="1.7" height="221.4"/>
                <rect x="1229.9" y="1129.7" fill="#FFB73D" width="1.7" height="221.4"/>
                <rect x="1240.6" y="1129.7" fill="#FFB73D" width="1.7" height="221.4"/>
                <rect x="1251.3" y="1129.7" fill="#FFB73D" width="1.7" height="221.4"/>
                <rect x="1262" y="1129.7" fill="#FFB73D" width="1.7" height="221.4"/>
                <rect x="1272.7" y="1129.7" fill="#FFB73D" width="1.7" height="221.4"/>
              </g>
              
              {/* Building side details */}
              <g>
                <rect x="2243.1" y="1259.7" fill="#FFB73D" width="168.5" height="2.9"/>
                <rect x="2243.1" y="1277.3" fill="#FFB73D" width="168.5" height="2.9"/>
                <rect x="2243.1" y="1294.8" fill="#FFB73D" width="168.5" height="2.9"/>
                <rect x="2243.1" y="1312.4" fill="#FFB73D" width="168.5" height="2.9"/>
                <rect x="2243.1" y="1330" fill="#FFB73D" width="168.5" height="2.9"/>
                <rect x="2243.1" y="1347.5" fill="#FFB73D" width="168.5" height="2.9"/>
                <rect x="2243.1" y="1365.1" fill="#FFB73D" width="168.5" height="2.9"/>
                <rect x="2243.1" y="1382.6" fill="#FFB73D" width="168.5" height="2.9"/>
              </g>
            </g>

            {/* Main building structures */}
            <g className="building-group building-1">
              <rect x="1384.3" y="1229.7" fill="url(#detailGradient)" width="56.9" height="192.7"/>
              <rect x="1351.8" y="1184" fill="url(#detailGradient)" width="56.9" height="146"/>
              <rect x="1328.4" y="1248.9" fill="url(#detailGradient)" width="56.9" height="124.2"/>
              <rect x="1523.2" y="1200.2" fill="url(#detailGradient)" width="56.9" height="221.5"/>
              <rect x="1565.5" y="1132.3" fill="url(#detailGradient)" width="29.2" height="192.7"/>
              <rect x="1428.8" y="1200" fill="url(#detailGradient)" width="43" height="192.7"/>
              <rect x="1565.5" y="1052.9" fill="url(#detailGradient)" width="33" height="101.4"/>
              <rect x="1570.1" y="1045.2" fill="url(#detailGradient)" width="23.9" height="90.5"/>
            </g>

            <g className="building-group building-2">
              <rect x="1830.2" y="1226.4" fill="url(#detailGradient)" width="63.3" height="196.9"/>
              <rect x="1894.7" y="1173.5" fill="url(#detailGradient)" width="34.2" height="248.3"/>
              <rect x="2003.9" y="1211.7" fill="url(#detailGradient)" width="25.7" height="211.1"/>
              <rect x="2026.7" y="1331.2" fill="url(#detailGradient)" width="63.7" height="90"/>
              <rect x="2056.3" y="1294.9" fill="url(#detailGradient)" width="63.7" height="90"/>
              <rect x="2040.9" y="1269.9" fill="url(#detailGradient)" width="63.7" height="140.2"/>
              <rect x="1716.3" y="1241.1" fill="url(#detailGradient)" width="128" height="180.9"/>
              <rect x="1632.3" y="1318.3" fill="url(#detailGradient)" width="97.9" height="101.6"/>
              <g>
                <rect x="1638.1" y="1128.3" fill="url(#detailGradient)" width="42.6" height="273"/>
                <rect x="1640.4" y="1111.7" fill="url(#detailGradient)" width="38.1" height="33.7"/>
                <rect x="1653.7" y="1094.1" fill="url(#detailGradient)" width="11.5" height="33.7"/>
              </g>
              <g>
                <polygon fill="url(#detailGradient)" points="1918.5,1171.2 1951.1,1171.2 1948.4,1155.4 1918.5,1155.4"/>
                <polygon fill="url(#detailGradient)" points="1944.5,1171.2 1911.8,1171.2 1914.6,1155.4 1944.5,1155.4"/>
                <rect x="1911.8" y="1171.2" fill="url(#detailGradient)" width="39.3" height="252.1"/>
              </g>
            </g>

            <g className="building-group building-3">
              <rect x="972.9" y="1186.8" fill="url(#detailGradient)" width="37.9" height="234.1"/>
              <rect x="995.2" y="1163.6" fill="url(#detailGradient)" width="44.1" height="257.3"/>
              <rect x="1039.6" y="1184.4" fill="url(#detailGradient)" width="44.1" height="237.1"/>
              <rect x="1061.8" y="1227.4" fill="url(#detailGradient)" width="44.1" height="194.1"/>
              <rect x="1103.3" y="1266.1" fill="url(#detailGradient)" width="44.1" height="155.4"/>
              <rect x="1170.5" y="1321.8" fill="url(#detailGradient)" width="44.1" height="99.8"/>
              <rect x="1414.1" y="1079.7" fill="url(#detailGradient)" width="44.1" height="136.1"/>
              <rect x="930.7" y="1279.8" fill="url(#detailGradient)" width="64.5" height="141.1"/>
            </g>

            {/* Featured bright buildings */}
            <g className="building-group building-4">
              <rect x="1263.5" y="998.9" fill="url(#buildingGradient)" width="203.3" height="407.9" filter="url(#glow)"/>
              <rect x="1287.1" y="958.3" fill="url(#buildingGradient)" width="156" height="32.9"/>
              <rect x="1310" y="892.8" fill="url(#buildingGradient)" width="20" height="65.3"/>
              <rect x="1358.1" y="905.9" fill="url(#buildingGradient)" width="13.9" height="55"/>
              <rect x="1400.2" y="895.1" fill="url(#buildingGradient)" width="20" height="65.3"/>
            </g>

            <g className="building-group building-5">
              <rect x="1445.1" y="1077.9" fill="url(#buildingGradient)" width="171.6" height="328.9" filter="url(#glow)"/>
              <rect x="1455.4" y="1094.6" fill="url(#buildingGradient)" width="18.6" height="56.8"/>
              <rect x="1483.1" y="1094.6" fill="url(#buildingGradient)" width="18.6" height="56.8"/>
              <rect x="1516.2" y="1094.6" fill="url(#buildingGradient)" width="27.4" height="56.8"/>
              <rect x="1558.2" y="1270.3" fill="url(#buildingGradient)" width="18.6" height="56.8"/>
              <rect x="1585.9" y="1270.3" fill="url(#buildingGradient)" width="18.6" height="56.8"/>
              <rect x="1445.1" y="1333.7" fill="url(#buildingGradient)" width="171.6" height="3.6"/>
              <rect x="1445.1" y="1343.3" fill="url(#buildingGradient)" width="171.6" height="3.6"/>
            </g>

            {/* Special architectural elements */}
            <g className="detail-group detail-special">
              <polygon points="2058.8,1243.3 2058.8,1401.3 1997.2,1401.3 1997.2,1203.7 2017.5,1203.7 2017.5,1196 2038.5,1196 2038.5,1203.7 2058.5,1203.7 2058.5,1243.3" fill="url(#buildingGradient)"/>
              <path d="M1982.1,1152.6v-31.1h-3.8v-6h-4.4c0-0.1,0-0.2,0-0.2c0-9.5-7.3-17.3-16.6-18V1083h-2.9v14.3c-9.3,0.8-16.6,8.5-16.6,18c0,0.1,0,0.2,0,0.2h-4.4v6h-3.8v31.1h-5.7v225.3v3.6v40h16.6v0.5h15.6h15.4v-0.5h16.5v-40v-3.6v-225.3H1982.1z" fill="url(#buildingGradient)"/>
              <path d="M1738.2,1004v-5.4h0v-16.7c0,0-16.2-9.7-16.2-47.2h-11.8c0.8-0.9,1.4-2.1,1.4-3.5c0-2-1.1-3.7-2.7-4.6c0.4-0.6,0.7-1.2,0.7-2c0-1-0.5-1.9-1.2-2.5l0.8-1.2l-2.5-25.9c0-0.4-0.6-0.4-0.6,0l-2.5,25.9l0.9,1.2c-0.8,0.6-1.3,1.5-1.3,2.6c0,0.8,0.3,1.4,0.7,2c-1.6,0.9-2.7,2.6-2.7,4.6c0,1.3,0.5,2.6,1.4,3.5h-11.8c0,37.5-16.2,47.2-16.2,47.2v16.7h0v5.4h0v4.7h0v5.4h0v4.7h0v5.4h0v4.7h0v5.4h0v4.7h0v5.4h0v84.4v9.8v151.4v9.8v121.6v0.2h10v-0.2h43.6v0.2h10v-0.2V1300v-9.8v-151.4v-9.8v-84.4h0v-5.4h0v-4.7h0v-5.4h0v-4.7h0v-5.4h0v-4.7h0v-5.4h0L1738.2,1004L1738.2,1004z" fill="url(#buildingGradient)"/>
              <path d="M1533.3,1258.9v-6.1v-0.1c0,0-0.3-3.5-3.9-5.8c-1.2-0.8-2.7-1.4-4.7-1.7c-0.6-0.1-1.3-0.2-2-0.2h-2.7h-4.7h-0.8v-158.9h0.1v-13.9h-0.1v-30.9c-0.1-0.8-0.8-3.7-3.9-5.7c-1.2-0.8-2.7-1.4-4.7-1.7c-0.5-0.1-1.1-0.2-1.7-0.2h-2.7h-0.3h-4.7v-0.7V852.6h0.3v-13.9h-0.3v-27.9c-0.1-0.6-0.8-4.2-4.7-6.3c-1.2-0.7-2.8-1.2-4.7-1.4V803h-2.8h-1.9V616.7c-0.3-1.2-1.3-4.1-4.7-5.8v-0.4h-3.7v-65h-2.5l-0.1-4.4l-0.1-5.1l-0.2-5.5l-1.2-42.8h-2.1l-1.3,42.8l-0.2,5.5l-0.2,5.1l-0.1,4.4h-2.5v87.3v0c-1.9,0.2-3.4,0.7-4.6,1.3c-0.2,0.1-0.4,0.2-0.6,0.4c-3.4,2.1-4,5.4-4.1,6v112.1c0,0,0,0,0,0c-1.9,0.2-3.5,0.7-4.7,1.4c-4,2.1-4.6,5.7-4.7,6.3v78.5h-0.6v13.9h0.6v130.6h-0.6h-4.2h-2h-2.7v0.1c-1.9,0.2-3.5,0.7-4.7,1.4c-4,2.1-4.6,5.7-4.7,6.3v202.9h-4.7h-4.7h-0.6c-1.6,0-2.9,0.2-4.1,0.4c-2.1,0.5-3.6,1.4-4.7,2.4c-2.5,2.3-2.8,5.1-2.8,5.1v219.5l31.1,0.2v1h61.5h4.7h31.9v-2.1v-161.4L1533.3,1258.9L1533.3,1258.9z" fill="url(#buildingGradient)"/>
              <path d="M942.7,1315.8c-4.5-41.6-15.8-76.6-28.1-103.9l5.3-7.9c7.2-0.1,12.9-1.8,12.9-3.7c0-2.1-6.3-3.7-14-3.7c-4.4,0-8.3,0.5-10.9,1.4c-4.1-8.2-8.2-15.4-12.1-21.8c-17.2-28.3-32.9-44.5-36.5-48.1l-0.2-5.8H851v-48.8l-5.2,7.6v41.1v7.4v69.9h-5.1v220.3h2.5h2.5h8.2h5h6.8h2.3h5h56.3h7.1c0.5-1.4,1-2.8,1.4-4.3C944.2,1394.7,947.8,1363.1,942.7,1315.8z" fill="url(#buildingGradient)"/>
              <path d="M1256.2,989.5c-5.7-8.1-20-21.4-21.6-22.9v-0.1c0,0,0,0-0.1,0.1c0,0-0.1-0.1-0.1-0.1v0.1c-1.6,1.5-15.9,14.8-21.6,22.9c-6,8.6-5.6,23.8-5.6,23.8v22.5h-0.1v2h0v3.3l0,0.1l0,0v5h0v375.3h22v0h10v-0.4l0,0v0.4h22v-375.3h0.3v-2.6l0,0l0-0.4v-4.3l0,0v-25.6C1261.8,1013.3,1262.2,998.1,1256.2,989.5z" fill="url(#buildingGradient)"/>
              <rect x="1632.3" y="1240.8" fill="url(#buildingGradient)" width="33.3" height="180.6"/>
              <rect x="1918.5" y="1347.2" fill="url(#buildingGradient)" width="51.7" height="73.4"/>
              <rect x="1255.3" y="1311" fill="url(#buildingGradient)" width="12.7" height="110.1"/>
              <rect x="1265.2" y="1372.9" fill="url(#buildingGradient)" width="18.4" height="48.5"/>
              <rect x="1380.3" y="1320.8" fill="url(#buildingGradient)" width="18.4" height="99.1"/>
              <rect x="1394.9" y="1294.7" fill="url(#buildingGradient)" width="18.4" height="128"/>
              <rect x="1512" y="1368.1" fill="url(#buildingGradient)" width="53.5" height="52.2"/>
              <rect x="1186.4" y="1368" fill="url(#buildingGradient)" width="12.1" height="52.1"/>
              <rect x="1157.9" y="1401.3" fill="url(#buildingGradient)" width="42.2" height="28.6"/>
              <rect x="968.7" y="1279.8" fill="url(#buildingGradient)" width="68" height="143.5"/>
              <g>
                <rect x="1651.5" y="1332.6" fill="url(#buildingGradient)" width="140.3" height="89.2"/>
                <rect x="1751.4" y="1270.1" fill="url(#buildingGradient)" width="52.2" height="89.2"/>
                <rect x="1809.6" y="1388.3" fill="url(#buildingGradient)" width="52.2" height="32.5"/>
                <rect x="1783.5" y="1368.7" fill="url(#buildingGradient)" width="52.2" height="32.5"/>
                <rect x="1856" y="1398.7" fill="url(#buildingGradient)" width="52.2" height="22.1"/>
                <rect x="1905.4" y="1404.5" fill="url(#buildingGradient)" width="52.2" height="17.1"/>
                <rect x="1979.4" y="1356.5" fill="url(#buildingGradient)" width="33.4" height="64.3"/>
                <rect x="1082.9" y="1411.9" fill="url(#buildingGradient)" width="50.7" height="9.6"/>
                <rect x="950.8" y="1403.8" fill="url(#buildingGradient)" width="143.1" height="18.7"/>
                <rect x="917.1" y="1413.9" fill="url(#buildingGradient)" width="163.9" height="7.7"/>
                <rect x="978.9" y="1272.1" fill="url(#buildingGradient)" width="68" height="143.5"/>
              </g>
              <g>
                <polygon fill="url(#buildingGradient)" points="1126.5,1018.8 1126.5,997 1123.5,995.8 1123.5,962.7 1118.9,962.7 1118.9,994.1 1118.9,1004.7 1118.9,1051 1118.9,1064.5 1118.9,1086.2 1120.3,1086.2 1126.5,1086.2 1129.8,1086.2 1129.8,1125.7 1121.9,1125.7 1121.9,1131.9 1121.9,1134.8 1121.9,1355.1 1121.9,1359.7 1121.9,1364.2 1129.8,1364.2 1129.8,1421.1 1145.7,1421.1 1179,1421.1 1183.2,1421.1 1193.1,1421.1 1193.1,1364.2 1193.1,1355.1 1193.1,1134.8 1193.1,1125.7 1193.1,1086.2 1193.1,1076.6"/>
                <polygon fill="url(#buildingGradient)" points="1101.7,1036.9 1098.7,1038 1098.7,1059.9 1032.8,1117.1 1032.1,1117.1 1032.1,1117.7 1032.1,1127.2 1032.1,1166.7 1032.1,1175.8 1032.1,1354.2 1032.1,1363.3 1032.1,1422.5 1046.2,1422.5 1046.2,1422.4 1079.5,1422.4 1079.5,1422.5 1095.4,1422.5 1095.4,1363.3 1103.3,1363.3 1103.3,1354.2 1103.3,1175.8 1103.3,1172.9 1103.3,1166.7 1095.4,1166.7 1095.4,1127.2 1098.7,1127.2 1104.9,1127.2 1106.3,1127.2 1106.3,1103.4 1106.3,1089.9 1106.3,1045.7 1106.3,1035.1 1106.3,1003.7 1101.7,1003.7"/>
              </g>
              <path d="M1640.2,1034v-81.8v-7.7v-0.2v-2.2v-2.4h-9.8v-13.5v-4.8h-3.9v-12.2h-0.3c0,0-2.9-15.5-18-18.9c-0.6-0.3-4.3-2.3-4.3-9.1c0-7.3,0-22.8,0-22.8h-0.7h-1.3h-0.7c0,0,0,15.4,0,22.8c0,6.7-3.7,8.8-4.3,9.1c-15.1,3.4-18,18.9-18,18.9h-0.2v12.2h-3.9v4.8v13.5h-10.6v3v1.6v0.2v7.7v81.8h-3.9v7.8v379.6h14.4h1.4h52.1h6.2h9.6v-379.6v-7.8H1640.2z" fill="url(#buildingGradient)"/>
            </g>

            {/* Ground/base */}
            <rect y="1419.2" width="2962.3" height="100.8" fill="url(#buildingGradient)"/>
            <rect x="531.3" y="1428.4" width="1900.4" height="3.8" fill="url(#buildingGradient)"/>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default SvgMorphSplash;