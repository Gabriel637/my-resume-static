import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  delay?: number;
}

export default function TypingText({ text, delay = 50 }: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [index, text, delay]);

  return (
    <p className="text-xl font-mono whitespace-pre-wrap w-[400px]">
      {displayed}
      <span className="animate-pulse">{index < text.length ? "|" : ""}</span>
    </p>
  );
}
