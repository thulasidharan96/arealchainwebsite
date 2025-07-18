"use client";
import Spline from "@splinetool/react-spline";

export default function SplineCompany() {
  return (
    <div className="flex items-center justify-center w-full h-full relative bg-transparent">
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-transparent">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-transparent">
          <Spline scene="https://prod.spline.design/JK9dqim3mq8uU-QU/scene.splinecode" />
        </div>
      </div>
    </div>
  );
}
