import ModalLetter from "../components/ModalLetter";

export default function LoveYou() {
  const coin = () => Math.random();

  return (
    <div className="relative h-screen w-full overflow-hidden flex justify-center items-center">
      <div className="absolute z-20">
        <ModalLetter letter={{ title: "Happy birthday", content: "O arco íris inicia no melhor dia do ano, você é o meu orgulho, eu te amo infinitamente!! \n \n I want you \n Want you to want me, baby \n \n Feliz pelo seu dia, muito obrigado por tudo que faz e vem fazendo por mim, desculpa as vezes não conseguir retribuir da mesma maneira, mas ainda chegarei lá, vamos curtir o seu dia em mais uma noitinha fora e mais um momento especial, te amo muito e obrigado obrigado obrigado por você! When I get lost, feel I've been crossed \n She will be my salvation \n \n When I feel low, I've nowhere to go \n She'll be my inspiration" }} />
      </div>
      <div className="absolute inset-0">
        {
          [...Array(500)].map((_, i) => {
            const flippedCoin = coin();
            return (
              <span key={i} className="text-2xl font-bold opacity-20 text-pink-500 select-none" >
                {flippedCoin > 0.5 ? `I LOVE YOU ` : `HAPPY BIRTHDAY `}
              </span>)
          })
        }
      </div >
    </div >
  );
}
