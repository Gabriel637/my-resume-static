import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MemoryCard from "../components/MemoryCard";
import ModalLetter from "../components/ModalLetter";

const imagePairs = [
  { src: "/photos/louie.jpg", label: "Fury" },
  { src: "/photos/tixa.jpg", label: "Fatty" },
  { src: "/photos/luna.jpg", label: "Skinny" },
  { src: "/photos/gang.jpg", label: "The Gang" },
  { src: "/photos/star.jpg", label: "The Star" },
  { src: "/photos/love16.jpg", label: "The Couple" },
];

export default function MemoryGameSection() {
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [elapsed, setElapsed] = useState<number>(0);
  const [shuffled, setShuffled] = useState(() => [...imagePairs, ...imagePairs].sort(() => Math.random() - 0.5));
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const restartGame = () => {
    setFlipped([]);
    setMatched([]);
    setElapsed(0);
    setTimerRunning(false);
    startTimeRef.current = null;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setTimeout(() => {
      setShuffled([...imagePairs, ...imagePairs].sort(() => Math.random() - 0.5));
    }, 2000);
  };

  const getBestTime = () => {
    const saved = localStorage.getItem("memoryBestTime");
    return saved ? Number(saved) : null;
  };

  useEffect(() => {
    const saved = getBestTime();
    if (saved) setBestTime(Number(saved));
  }, []);

  const saveBestTime = (time: number) => {
    const current = bestTime;
    if (current === null || time < current) {
      localStorage.setItem("memoryBestTime", time.toString());
      setBestTime(time); // ✅ update state so UI reacts
    }
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const decimals = Math.floor((ms % 1000) / 10); // 2 decimal digits
    return `${seconds}.${decimals.toString().padStart(2, "0")}s`;
  };

  const updateElapsed = () => {
    if (startTimeRef.current !== null) {
      const now = performance.now();
      setElapsed(now - startTimeRef.current);
      animationFrameRef.current = requestAnimationFrame(updateElapsed);
    }
  };

  useEffect(() => {
    if (flipped.length === 1 && !timerRunning) {
      const now = performance.now();
      startTimeRef.current = now;
      setTimerRunning(true);
      animationFrameRef.current = requestAnimationFrame(updateElapsed);
    }
  }, [flipped, timerRunning]);

  useEffect(() => {
    if (matched.length === shuffled.length && timerRunning) {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      setTimerRunning(false);

      if (startTimeRef.current !== null) {
        const finalElapsed = performance.now() - startTimeRef.current;
        setElapsed(finalElapsed);
        saveBestTime(finalElapsed);
      }
    }
  }, [matched, timerRunning, shuffled.length]);


  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (shuffled[first].src === shuffled[second].src) {
        setMatched([...matched, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped]);

  const handleFlip = (index: number) => {
    if (
      flipped.length < 2 &&
      !flipped.includes(index) &&
      !matched.includes(index)
    ) {
      setFlipped([...flipped, index]);
    }
  };

  const isCompleted = matched.length === shuffled.length;

  return (
    <section className="relative w-full flex justify-around">
      <div className="text-md flex flex-col font-gaming gap-4 w-min justify-center">
        <p>
          {`Time: ${formatTime(elapsed)}`}
        </p>
        <p>
          {`Record: ${bestTime !== null ? formatTime(bestTime) : "None"}`}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {shuffled.map((card, index) => (
          <MemoryCard
            key={index}
            isFlipped={flipped.includes(index) || matched.includes(index)}
            onClick={() => handleFlip(index)}
            imageSrc={card.src}
            label={card.label}
          />
        ))}
      </div>

      <div className="text-sm flex flex-col font-gaming gap-4 w-min justify-center">
        <motion.button
          onClick={restartGame}
          whileHover={{ scale: 1.05 }}
          className="p-3 border font-medium bg-red-500 text-white rounded-xl transition-all cursor-pointer"
        >
          Restart
        </motion.button>
      </div>

      {isCompleted && (
        <div className="absolute z-50">
          <ModalLetter
            letter={{
              title: "🎉 Parabéns minha gatinha",
              content: `Esse foi de longe o melhor projeto que já fiz, o mais divertido e leve, também serviu como uma terapia para mim, estou ansiosíssimo para você ver, e brincar um pouquinho... \n Te amo muito! Parabéns pelo seu dia, você é tudo pra mim!`,
            }}
          />
        </div>
      )}
    </section>
  );
}
