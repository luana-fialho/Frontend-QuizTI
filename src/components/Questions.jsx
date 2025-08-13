import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function Questions() {
  const location = useLocation();
  const tema = location.state?.tema;
  const navigate = useNavigate();
  const [pergunta, setPergunta] = useState([]);
  const [marcada, setMarcada] = useState("");
  const [pgAtual, setPgAtual] = useState(0);
  const [resposta, setResposta] = useState([]);

  console.log(tema);
  useEffect(() => {
    if (tema) {
      fetch(
        "https://backend-quizti-production.up.railway.app/questions/perguntas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoria: tema }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Perguntas recebidas:", data);
          setPergunta(data);
        });
    }
  }, [tema]);

  const proximaPergunta = (e) => {
    if (!e) return;
    const novaResposta = {
      id: perguntaAtual.id,
      respostaLetra: e,
    };
    const todasRespostas = [...resposta, novaResposta];
    setResposta(todasRespostas);
    setMarcada("");

    if (pgAtual < pergunta.length - 1) {
      setPgAtual(pgAtual + 1);
    } else {
      localStorage.setItem("respostasQuiz", JSON.stringify(todasRespostas));
      navigate("/results", { state: { pergunta, tema } });
    }
  };

  const perguntaAtual = pergunta[pgAtual];

  return (
    <div className="flex flex-col h-screen bg-fundoazul-dark p-6">
      {perguntaAtual ? (
        <div className="relative">
          <header className="relative flex justify-center items-center">
            <h1 className="text-7xl fonte cordourado">
              {perguntaAtual.titulo}
            </h1>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="cordourado absolute left-4 top-3 text-5xl"
            >
              <FaArrowLeft />
            </button>
          </header>
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center w-200 h-150 rounded-4xl bg-fundoazul-light m-18 p-8 text-white">
              <p className="fonteSecundaria text-5xl">
                {perguntaAtual.enunciado}
              </p>
              <div className="mt-6">
                {perguntaAtual.alternativas.map((alt, index) => (
                  <div
                    onClick={() => {
                      setMarcada(alt.letra);
                    }}
                    key={index}
                    className={`p-3 w-180 border fonteSecundaria text-2xl rounded-4xl mt-3 cursor-pointer ${
                      marcada == alt.letra
                        ? "bg-blue-900 "
                        : "bg-blue-600 hover:bg-blue-800"
                    }`}
                  >
                    <p>
                      {alt.letra} ) {alt.texto}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={(e) => {
                  proximaPergunta(marcada);
                }}
                disabled={!marcada}
                className="absolute right-140 bottom-22 fonte corazul-dark bg-white w-55 h-13 text-lg rounded-4xl flex justify-center items-center m-3 cursor-pointer hover:scale-110 transition-transform"
              >
                Responder
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>nao</p>
      )}
    </div>
  );
}
