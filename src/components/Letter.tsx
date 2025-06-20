import { useState } from "react";
import { motion } from "framer-motion";

type LetterProps = {
  letter: {
    id: number;
    title: string;
    content: string;
    left: number;
    top: number;
    color: string;
    initialRotation: number;
  };
}

const LoveLetter = ({ letter }: LetterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      drag
      initial={{ scale: 1, rotate: letter.initialRotation }}
      animate={{
        scale: isOpen ? 1.1 : 1,
        rotate: isOpen ? 0 : letter.initialRotation,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleClick}
      className={`absolute cursor-pointer p-4 w-32 h-40 flex items-center justify-center 
        ${letter.color} shadow-lg rounded-lg
        ${isOpen ? "z-50" : "z-10"}`}
      style={{
        left: `${letter.left}%`,
        top: `${letter.top}%`,
      }}
    >
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-2"
        >
          <h3 className="font-handwriting mb-2">{letter.title}</h3>
          <p className="text-sm">{letter.content}</p>
        </motion.div>
      ) : (
        <div>
          <span className="text-xl">💌</span>
        </div>
      )}
    </motion.div>
  );
};

export default LoveLetter;