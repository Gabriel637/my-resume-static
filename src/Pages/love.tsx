import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ImageRevealSlider from "../LoveSections/ImageSlider";
import LoveLetter from "../LoveSections/LoveLetter";
import LoveYou from "../LoveSections/LoveYou";
import PhotoGrid from "../LoveSections/PhotoGrid";
import TextWavy from "../LoveSections/TextWavy";
import MemoryGameSection from "../LoveSections/MemoryGame";
import { useTheme } from "../contexts/ThemeContext";

export default function LovePage() {
  const { theme, toggleTheme } = useTheme();

  if (theme === 'dark') toggleTheme();

  const [step, setStep] = useState<"loading" | "expanding" | "done">("loading");

  useEffect(() => {

    const loadingTimer = setTimeout(() => setStep("expanding"), 1600);
    const expandTimer = setTimeout(() => setStep("done"), 2400);
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(expandTimer);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-rose-500">
      <AnimatePresence>
        {step !== "done" && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50"
            initial={{ backgroundColor: "#ec4899" }}
            animate={{ backgroundColor: "#ffffff" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {step === "loading" && (
              <motion.div
                className="absolute top-1/2 left-0 right-0 h-[3px] bg-rose-300"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            )}

            {step === "expanding" && (
              <motion.div
                className="absolute top-1/2 left-1/2 w-[2px] h-[3px] bg-rose-300"
                initial={{ width: "100%", height: "3px", x: "-50%", y: "-50%" }}
                animate={{ height: "100vh", y: "-50vh" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {step === "done" && (
        <div className="h-screen overflow-y-scroll snap-y snap-mandatory  ">
          <section className="h-screen snap-start flex items-center justify-center bg-rose-300">
            <PhotoGrid />
          </section>
          <section className="h-screen snap-start flex items-center justify-center bg-rose-50">
            <LoveYou />
          </section>
          <section className="h-screen snap-start flex items-center justify-center bg-gradient-to-b from-pink-50 to-rose-50">
            <LoveLetter />
          </section>
          <section className="h-screen snap-start flex items-center justify-center bg-pink-100">
            <ImageRevealSlider />
          </section>
          <section className="h-screen snap-start flex items-center justify-center bg-rose-100">
            <TextWavy />
          </section>
          <section className="h-screen snap-start flex items-center justify-center bg-rose-200">
            <MemoryGameSection />
          </section>
        </div>

      )}
    </div>
  );
}
