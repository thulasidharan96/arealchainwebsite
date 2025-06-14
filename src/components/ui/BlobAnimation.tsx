"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { cn } from "@/src/lib/utils";

export const BlobAnimation = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Select all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, .cursor-pointer'
    );

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [router.asPath]); // Re-run this effect on page navigation

  return (
    <div className="hidden md:block">
      {/* Outline a larger ring with a slower transition */}
      <div
        className={cn(
          "fixed w-8 h-8 rounded-full border-2 pointer-events-none z-[9999] transition-transform duration-300 ease-out",
          isHovering
            ? "border-[#F4B448] bg-[#F4B448]/20"
            : "border-white/50"
        )}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.75 : 1})`,
        }}
      />
      {/* Dot a small dot with a faster transition */}
      <div
        className={cn(
          "fixed w-2 h-2 rounded-full bg-white pointer-events-none z-[9999] transition-transform duration-100 ease-out"
        )}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 0 : 1})`,
        }}
      />
    </div>
  );
};