import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const quotes = [
  `“You have my heart inside your hands”`,
  `“I wanna plant you in my heart”`,
  `“I want you off my mind/And on me Holding me closer than we've ever been before”`,
  `“I was made for loving you”`,
  `“I'll put your love on a pedestal”`,
  `“Y solo mírame con esos ojito lindo/Que con eso yo estoy bien, hoy he vuelto a nacer”`,
  `“I think there's something for us/Lying around as the world comes down”`,
  `“Baby, the sound of you/Better than a harmony”`,
  `“Stay here forever, babe/It don't get no better than this”`,
  `“A thousand kisses from you is never too much”`,
];
export default function TextWavy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [currentText, setCurrentText] = useState(quotes[0]?.split(""));

  const changeText = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentText(quotes[randomIndex].split(""));
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="h-full w-full flex items-center justify-center cursor-pointer" onClick={changeText}>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="flex flex-wrap justify-center max-h-[100px] items-center gap-2 overflow-x-visible show relative select-none"
      >
        {currentText.map((char, index) => (
          <ScatterLetter key={index} char={char} mouse={mouse} />
        ))}
      </div>
    </div>
  );
}

function ScatterLetter({ char, mouse }: { char: string; mouse: { x: number; y: number } }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 10, stiffness: 100 });
  const springY = useSpring(y, { damping: 10, stiffness: 100 });

  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const dx = rect.left + rect.width / 2 - (mouse.x + rect.left - ref.current.offsetLeft);
    const dy = rect.top + rect.height / 2 - (mouse.y + rect.top - ref.current.offsetTop);
    const dist = Math.sqrt(dx * dx + dy * dy);

    const maxDist = 100;
    if (dist < maxDist) {
      const angle = Math.atan2(dy, dx);
      const push = (maxDist - dist) * 0.5;
      x.set(Math.cos(angle) * push);
      y.set(Math.sin(angle) * push);
    } else {
      x.set(0);
      y.set(0);
    }
  }, [mouse.x, mouse.y]);

  switch (char) {
    case " ":
      return "\u00A0"
    case "/":
      return <div className="w-full" />;
    default:
      return <motion.span
        ref={ref}
        style={{
          x: springX,
          y: springY,
        }}
        className="text-3xl font-bold inline-block"
      >
        {char}
      </motion.span>
  }

}
