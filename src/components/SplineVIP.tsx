"use client";

import { useState } from "react";
import Spline from "@splinetool/react-spline";

export default function SplineVIP() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleError = (err: any) => {
    console.error("Spline loading error:", err);
    setError("Failed to load 3D scene");
    setIsLoading(false);
  };

  // Fallback gradient background if Spline fails
  if (error) {
    return (
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F4B448]/20 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-500 text-sm">
            <div className="animate-pulse">Loading 3D Experience...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full relative">
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 z-10 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-[#F4B448] rounded-full animate-spin border-t-transparent" />
                <p className="text-sm">Loading 3D Experience...</p>
              </div>
            </div>
          )}

          {/* Spline Scene */}
          <Spline
            scene="https://prod.spline.design/CnJTuuwTHJ3571XS/scene.splinecode"
            onLoad={handleLoad}
            onError={handleError}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
