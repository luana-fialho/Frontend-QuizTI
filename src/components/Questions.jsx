import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Questions() {
  const location = useLocation();
  var tema = location.state?.tema;
  const navigate = useNavigate();

  if (tema == "Back-end") {
    tema = "backend";
  } else if (tema == "Front-end") {
    tema = "frontend";
  } else if (tema == "Dados") {
    tema = "dados";
  }

  const [pergunta, setPergunta] = useState(null);
  console.log(tema);
  useEffect(() => {
    if (tema) {
      fetch("http://localhost:3000/questions/perguntas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoria: tema }),
      })
        .then((res) => res.json())
        .then((data) => setPergunta(data))
        .catch((err) => console.error("Erro ao buscar pergunta:", err));
    }
  }, [tema]);

  return (
    <div className="flex flex-col h-screen bg-fundoazul-dark p-6">
      {pergunta ? (
        <div className="relative">
          <header className="relative flex justify-center items-center">
            <h1 className="text-7xl fonte cordourado">{pergunta.titulo}</h1>
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
              <p className="fonteSecundaria text-5xl">{pergunta.enunciado}</p>
              <div className="mt-6">
                {pergunta.alternativas.map((alt, index) => (
                  <div
                    key={index}
                    className="p-3 border fonteSecundaria text-2xl rounded-4xl mt-3 bg-blue-900 cursor-pointer hover:bg-blue-600"
                    onClicl=""
                  >
                    <p>
                      {alt.letra} ) {alt.texto}
                    </p>
                  </div>
                ))}
              </div>

              <button className="absolute right-140 bottom-22 fonte corazul-dark bg-white w-55 h-13 text-lg rounded-4xl flex justify-center items-center m-3 cursor-pointer hover:scale-110 transition-transform">
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
