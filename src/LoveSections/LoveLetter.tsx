import { useState } from "react";
import Letter from "../components/Letter";

const generateRandomPosition = () => ({
  left: 10 + Math.random() * 80,
  top: 10 + Math.random() * 80,
  initialRotation: -10 + Math.random() * 20,
});

const generateLetters = () => {
  const colors = [
    "bg-red-100",
    "bg-pink-100",
    "bg-rose-100",
    "bg-purple-100",
    "bg-fuchsia-100",
  ];

  const letters = [
    {
      id: 1,
      title: "Every Kind of You",
      content: "I want you off my mind \n And on me",
    },
    {
      id: 2,
      title: "Meu dengo",
      content: "Quero seu cheiro, seu beijo, seu calor, seu abraço...",
    },
    {
      id: 3,
      title: "Meu amor",
      content: "Te amo, te amo, te amo",
    },
    {
      id: 4,
      title: "Love",
      content: "I wanna love you in every kind of way",
    },
    {
      id: 5,
      title: "Gatinha",
      content: "Quero suas tardes, suas noites e suas manhãs",
    },
    {
      id: 6,
      title: "Minha linda",
      content: "Preciso do seu calor e do seu refresco",
    },
    {
      id: 7,
      title: "Pleasure",
      content: "I wanna please you, no matter how long it takes"
    }
  ];

  return letters.map((letter, index) => ({
    ...letter,
    ...generateRandomPosition(),
    color: colors[index % colors.length],
  }));
};

const LoveLettersSection = () => {
  const [letters] = useState(generateLetters());

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        {letters.map((letter) => (
          <Letter
            key={letter.id}
            letter={letter}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="text-9xl font-bold opacity-20 text-pink-500 select-none">
          9th of June
        </h2>
      </div>
    </section>
  );
};

export default LoveLettersSection;