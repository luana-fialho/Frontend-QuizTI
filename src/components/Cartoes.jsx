import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Cartoes({ tema, login }) {
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const openQuestions = () => {
    if (login) {
      navigate("/questions", { state: { tema } });
    } else {
      setMensagem("É necessário fazer login primeiro!");
      setMostrarPopup(true);
      setTimeout(() => setMostrarPopup(false), 3000);
    }
  };

  const temaConvertido =
    tema === "backend"
      ? "Back-end"
      : tema === "frontend"
      ? "Front-end"
      : tema === "dados"
      ? "Dados"
      : tema;

  return (
    <div>
      <div
        onClick={() => {
          openQuestions();
        }}
        className="bg-fundoazul-light box-border w-90 h-90 border-4 p-4 flex justify-center items-center rounded-4xl m-2 hover:scale-110 transition-transform"
      >
        <h1 className="fonte text-4xl text-white">{temaConvertido}</h1>
      </div>
      {mostrarPopup && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in">
          {mensagem}
        </div>
      )}
    </div>
  );
}
