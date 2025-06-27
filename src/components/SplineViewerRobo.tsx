"use client";
import Spline from "@splinetool/react-spline";

export default function SplineViewerRobo() {
  const onLoad = (splineApp: { findObjectByName: (arg0: string) => any; }) => {
    const obj = splineApp.findObjectByName("Robot"); // Adjust the name if needed
    if (obj) {
      console.log("Robot position:", obj.position);
    } else {
      console.warn("Object not found in Spline scene");
    }
  };

  return (
    <div className="flex justify-center items-end">
      <Spline
        scene="https://prod.spline.design/ZSUKm-WfqPFFIllI/scene.splinecode"
        onLoad={onLoad}
      />
    </div>
  );
}
