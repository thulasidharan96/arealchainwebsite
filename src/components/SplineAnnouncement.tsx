"use client";
import Spline from "@splinetool/react-spline";

export default function SplineAnnouncement() {
  return (
    <div className="flex items-center justify-center w-full h-full relative">
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full flex items-start justify-center">
          <Spline scene="https://prod.spline.design/azP9vMc6tMzHZ88g/scene.splinecode" />
        </div>
      </div>
    </div>
  );
}
