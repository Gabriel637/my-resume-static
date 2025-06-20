import { motion, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import { VscArrowBoth } from "react-icons/vsc";
import useMeasure from "react-use-measure";
import { useEffect, useState } from "react";

export default function SliderSection() {
  const [ref, bounds] = useMeasure();
  const [showMessage, setShowMessage] = useState(false);

  const x = useMotionValue(0);
  const percentage = useTransform(x, [0, bounds.width || 1], [0, 100]);

  const clipPath = useMotionTemplate`inset(0 ${useTransform(percentage, p => 100 - p)}% 0 0)`;

  useEffect(() => {
    const unsubscribe = percentage.on("change", (latest) => {
      if (latest > 50) {
        setShowMessage(true);
      } else {
        setShowMessage(false);
      }
    });

    return () => unsubscribe();
  }, [percentage]);

  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl font-bold font-handwriting">
        {!showMessage ? "From here" : "To eternity"}
      </span>
      <section
        ref={ref}
        className="h-180 w-180 overflow-visible relative snap-start"
      >
        <motion.div className="absolute inset-0 z-0">
          <motion.img
            src="/my-resume-static/photos/love20.jpg"
            alt="Before"
            className="object-cover w-full h-full"
          />
          <motion.img
            src="/my-resume-static/photos/love19.jpg"
            alt="After"
            style={{ clipPath }}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute inset-y-0 left-0 w-1 bg-white z-10 
        cursor-ew-resize"
          drag="x"
          dragConstraints={{ left: 0, right: bounds.width || 0 }}
          style={{ x }}
        >
          <div className="bg-white w-12 h-12 rounded-full items-center flex justify-center -ml-6 mt-90 cursor-pointer">
            <VscArrowBoth size={22} />
          </div>
        </motion.div>
      </section>
    </div>

  );
}
