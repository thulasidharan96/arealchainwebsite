import { cn } from "@/src/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  isFinishing: boolean;
}

const SplashScreen = ({ isFinishing }: SplashScreenProps) => {
  return (
    <AnimatePresence>
      {!isFinishing && (
        <motion.div
          className={cn(
            "fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900"
          )}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-row items-center gap-4"
          >
            <motion.div
              className="w-[200px] h-[200px]"
              animate={{ y: [0, -20, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/coin/coin.png"
                alt="Splash Coin"
                width={200}
                height={200}
                priority
              />
            </motion.div>

            <motion.div
              className="w-[400px] h-[200px] flex items-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src="/coin/text.png"
                alt="Splash Text"
                width={400}
                height={200}
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
