import { FaUser } from "react-icons/fa";
import ListarCartoes from "./ListarCartoes.jsx";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-fundoazul-dark p-6">
      <header className="relative w-full mb-20 flex justify-center items-center">
        <h1 className="text-8xl fonte cordourado">Quiz TI</h1>
        <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl corazul-light cursor-pointer" />
      </header>

      <div className="flex flex-col items-center space-y-20 flex-grow">
        <h2 className="fonte text-2xl text-white">
          Escolha um tema para jogar
        </h2>
        <ListarCartoes />
      </div>
    </div>
  );
}
