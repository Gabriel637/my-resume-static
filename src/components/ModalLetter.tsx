import { useState } from "react";
import { motion } from "framer-motion";

type LetterProps = {
  letter: {
    title: string;
    content: string;
  };
}

const ModalLetter = ({ letter }: LetterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      animate={{
        scale: isOpen ? 1.1 : 1,
        rotate: 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleClick}
      className={`cursor-pointer w-200 h-100 flex items-center justify-center 
        shadow-lg z-100 bg-white`}
    >
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-2"
        >
          <h3 className="font-handwriting text-4xl mb-10">{letter.title}</h3>
          <p className="text-sm whitespace-pre-line">{letter.content}</p>
        </motion.div>
      ) : (
        <div className="w-full flex flex-col items-center justify-between">
          <div className="w-full border-b absolute top-35" />
          <span className="text-2xl absolute top-32">💌</span>
          <p className="text-4xl font-handwriting">From Moonlight</p>
          <p className="text-4xl font-handwriting">To Sunshine</p>
        </div>
      )}
    </motion.div>
  );
};

export default ModalLetter;