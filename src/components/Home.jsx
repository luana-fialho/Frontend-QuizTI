import { FaUser } from "react-icons/fa";
import ListarCartoes from "./ListarCartoes.jsx";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal.jsx";
import { useState } from "react";

export default function Home() {
  const [mostrarModal, setMostrarModal] = useState(false);

  function openLoginModal() {
    setMostrarModal(true);
  }

  function closeLoginModal() {
    setMostrarModal(false);
  }

  return (
    <div className="flex flex-col h-screen bg-fundoazul-dark p-6">
      <header className="relative w-full mb-20 flex justify-center items-center">
        <h1 className="text-8xl fonte cordourado">Quiz TI</h1>
        <button
          onClick={openLoginModal}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl corazul-light cursor-pointer"
        >
          <FaUser />
        </button>
      </header>

      <div className="flex flex-col items-center space-y-20 flex-grow">
        <h2 className="fonte text-2xl text-white">
          Escolha um tema para jogar
        </h2>
        <ListarCartoes />
      </div>
      {mostrarModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <LoginModal onClose={closeLoginModal} />
        </div>
      )}
    </div>
  );
}
