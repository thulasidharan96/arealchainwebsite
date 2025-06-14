import { cn } from "@/src/lib/utils";

interface SplashScreenProps {
  isFinishing: boolean;
}

const SplashScreen = ({ isFinishing }: SplashScreenProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900 transition-opacity duration-500",
        isFinishing ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      <h1 className="animate-zoom-out text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-[#F4B448] to-yellow-400">
        AREAL
      </h1>
    </div>
  );
};

export default SplashScreen;