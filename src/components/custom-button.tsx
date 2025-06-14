import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
}

export default function CustomButton({
  className,
  children = "Join the Waitlist →",
  ...props
}: ButtonProps) {
  function cn(...classes: (string | undefined | false | null)[]): string {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <button
      className={cn(
        "relative px-8 py-2 rounded-full font-medium text-black text-lg shadow-lg overflow-hidden",
        "border border-amber-700/30",
        "transition-all duration-300 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50",
        className
      )}
      style={{
        background: "linear-gradient(to bottom, #f59e0b, #fbbf24, #f59e0b)",
      }}
      {...props}
    >
      {/* Dark edge effect */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, transparent 60%, rgba(146, 64, 14, 0.4) 100%)",
        }}
      />

      {/* Metallic texture */}
      <span
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noise)" opacity="0.5"/%3E%3C/svg%3E\')',
          backgroundSize: "150px",
        }}
      />

      {/* Main coin reflection - top right */}
      <span
        className="absolute opacity-70"
        style={{
          background:
            "linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.8) 50%, transparent 100%)",
          top: "-50%",
          right: "-50%",
          width: "100%",
          height: "100%",
          transform: "rotate(45deg)",
          borderRadius: "50%",
        }}
      />

      {/* Secondary subtle reflection - bottom left */}
      <span
        className="absolute opacity-30"
        style={{
          background:
            "linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.5) 50%, transparent 100%)",
          bottom: "-30%",
          left: "-30%",
          width: "80%",
          height: "80%",
          transform: "rotate(45deg)",
          borderRadius: "50%",
        }}
      />

      {/* Button text with relative positioning to appear above the effects */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
