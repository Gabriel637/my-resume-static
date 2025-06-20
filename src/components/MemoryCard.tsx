
interface MemoryCardProps {
  isFlipped: boolean;
  onClick: () => void;
  imageSrc: string;
  label: string;
}

const MemoryCard = ({
  isFlipped,
  onClick,
  imageSrc,
  label,
}: MemoryCardProps) => {
  return (
    <div className="w-54 h-70 cursor-pointer" onClick={onClick}>
      <div
        className={`relative w-full h-full transition-transform duration-500 
          transform-style-3d ${isFlipped && "rotate-y-180"}`}
      >
        <div className="absolute w-full h-full bg-white rounded shadow flex 
        items-center justify-center text-3xl backface-hidden">
          ❤️
        </div>

        <div className="w-full h-full bg-white rounded shadow rotate-y-180 
        backface-hidden flex flex-col items-center justify-center">
          <img
            src={imageSrc}
            alt={label}
            className="h-full w-full"
          />
          <div className="absolute flex items-center justify-center 
          text-4xl font-handwriting text-center z-20 w-full h-[50px]
           bottom-0 bg-white">
            {label}</div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
