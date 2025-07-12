"use client";
import Spline from "@splinetool/react-spline";

export default function SplineCube() {
  return (
    <div className="flex items-center justify-center w-full h-full relative">
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="w-full h-full flex items-center justify-center blur-sm">
          <Spline scene="https://prod.spline.design/zgKtHkmkgl-BA9k1/scene.splinecode" />
        </div>
      </div>
    </div>
  );
}
