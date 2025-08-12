import { FaUser } from "react-icons/fa";
import ListarCartoes from "./ListarCartoes.jsx";
import LoginModal from "./LoginModal.jsx";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext.jsx";

export default function Home() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);
  const { login, setLogin, user, setUser } = useContext(UserContext);

  function openLoginModal() {
    if (login) {
      setMostrarMenuUsuario(!mostrarMenuUsuario);
    } else {
      setMostrarModal(true);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-fundoazul-dark p-6">
      <header className="relative w-full mb-20 flex justify-center items-center">
        <h1 className="text-8xl fonte cordourado">Quiz TI</h1>
        <button
          onClick={openLoginModal}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-5xl text-blue-500 cursor-pointer hover:text-blue-900"
        >
          <FaUser />
        </button>
      </header>

      <div className="flex flex-col items-center space-y-20 flex-grow">
        <h2 className="fonte text-2xl text-white">
          Escolha um tema para jogar
        </h2>
        <ListarCartoes login={login} />
      </div>
      {mostrarModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <LoginModal
            onClose={() => setMostrarModal(false)}
            setLogin={setLogin}
          />
        </div>
      )}
      {mostrarMenuUsuario && login && (
        <div className="absolute top-30 right-10 bg-fundoazul-light text-black p-4 rounded-3xl shadow-lg z-50 animate-fade-in">
          <button
            onClick={() => {
              setLogin(false);
              setMostrarMenuUsuario(false);
            }}
            className="text-black hover:text-gray-800 fonte text-2xl"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
