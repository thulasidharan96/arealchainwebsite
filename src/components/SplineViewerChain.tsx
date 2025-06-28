"use client";
import Spline from "@splinetool/react-spline";

export default function SplineViewerChain() {
  return (
    <div className="flex items-center justify-center w-full h-full relative">
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <Spline
            scene="https://prod.spline.design/2L7NBSXOdcTCDb-e/scene.splinecode"
            width={949}
            height={961}
          />
        </div>
      </div>
    </div>
  );
}
