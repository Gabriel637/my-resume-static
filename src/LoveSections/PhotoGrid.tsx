import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import TypingText from "../components/TypingText";

const images = [
  { img: "/my-resume-static/photos/love12.jpg", text: "Em Sapucaí Mirim, divisa de MG e SP a gente se amou e viveu nas alturas, banho de cachoeira, experimentamos vinhos, e com a vista mais linda do meu lado, tive prazer de ver outras paisagens maravilhosas." },
  { img: "/my-resume-static/photos/love2.jpg", text: `A nossa celebração, a partir daqui somos só nós no nosso larzinho.` },
  { img: "/my-resume-static/photos/love3.jpg", text: `"Invadimos" essa igreja para uma sessãozinha de fotos, lindo dia, linda minha princesa.` },
  { img: "/my-resume-static/photos/love18.jpg", text: `Jamais me protegerei do seu sol ou das suas chuvas, te quero por completo, sua felicidade e todo o raio de sol que você traz pra minha vida.` },
  { img: "/my-resume-static/photos/love16.jpg", text: `O melhor dia da minha vida. Simples assim.` },
  { img: "/my-resume-static/photos/love6.jpg", text: `Apesar de não sempre vencer, ter você do meu lado me faz o maior e mais orgulhoso vitorioso.` },
];

export default function PhotoGrid() {
  const [selected, setSelected] = useState<{ img: string, text: string } | null>(null);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl font-bold font-handwriting 
      text-white select-none">Feliz aniversário, minha princesa!
      </h2>
      <div className="grid grid-cols-3 gap-4 p-8 max-w-3xl">
        {images.map((src) => (
          <motion.div
            key={src.img}
            layoutId={src.img}
            className="cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setSelected(src)}
          >
            <motion.img src={src.img} alt="" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            layoutId={selected.img}
            onClick={() => setSelected(null)}
            className="fixed inset-0 bg-blue-300 bg-opacity-50 z-50 flex items-center justify-around cursor-pointer"
          >
            <motion.img
              src={selected.img}
              className="max-w-3xl max-h-[80vh] object-contain rounded-lg"
            />
            <TypingText text={selected.text} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
