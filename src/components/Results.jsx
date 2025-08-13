import { useEffect, useState, useRef } from "react";
import { GoHomeFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Results({ id_jogador, pontuacao, data }) {
  const navigate = useNavigate();
  const location = useLocation();
  const tema = location.state?.tema || "Tema não informado";
  const pergunta = location.state?.pergunta;
  const respostas = JSON.parse(localStorage.getItem("respostasQuiz"));
  const nomeJogador = localStorage.getItem("nomeJogador");
  const [ranking, setRanking] = useState([]);
  const { user } = useContext(UserContext);

  const temaConvertido =
    tema === "backend"
      ? "Back-end"
      : tema === "frontend"
      ? "Front-end"
      : tema === "dados"
      ? "Dados"
      : tema;

  const calcularPontuacao = () => {
    let pontuacao = 0;

    for (let i = 0; i < pergunta.length; i++) {
      if (pergunta[i].resposta === respostas[i].respostaLetra) {
        pontuacao++;
      }
    }

    return pontuacao;
  };

  const enviadoRef = useRef(false);

  useEffect(() => {
    if (!user || enviadoRef.current) return;
    enviadoRef.current = true;

    const pontuacao = calcularPontuacao();

    fetch("http://localhost:3000/results/pontuacao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_jogador: user.id,
        pontuacao,
        tema,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao salvar pontuação");
        return res.json();
      })
      .then(() =>
        fetch("http://localhost:3000/results/ranking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tema }),
        })
      )
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar ranking");
        return res.json();
      })
      .then((rankingData) => setRanking(rankingData))
      .catch((err) => {
        console.error(err);
        // Pode mostrar algum aviso pro usuário aqui, se quiser
      });
  }, [user]);

  return (
    <div className="flex flex-col h-screen bg-fundoazul-dark p-6">
      <div className="relative w-full mb-20">
        <h1 className="absolute left-90 text-8xl fonte cordourado">
          Resultado
        </h1>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="cordourado absolute left-4 top-3 text-7xl cursor-pointer"
        >
          <GoHomeFill />
        </button>
      </div>
      <div className="static h-full flex">
        <div className="mt-30 ml-30 flex flex-col ">
          <h2 className="fonte text-white text-5xl p-8 ">
            Jogador: <span className="text-teal-800/55">{nomeJogador}</span>
          </h2>
          <h2 className="fonte text-white text-5xl p-8">
            Pontuação:{" "}
            <span className="text-teal-800/55">{calcularPontuacao()} / 5</span>
          </h2>
          <h2 className="fonte text-white text-5xl p-8 pb-10">
            Tema: <span className="text-teal-800/55">{temaConvertido}</span>
          </h2>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="absolute left-90 bottom-30 fonte corazul-dark bg-white w-69 h-23 text-2xl rounded-4xl flex justify-center items-center m-20 cursor-pointer hover:scale-110 transition-transform"
          >
            Jogar outro tema
          </button>
        </div>
        <div className="absolute right-40 top-20 bg-teal-800/55 w-140 h-200 rounded-4xl flex flex-col items-center">
          <h1 className="fonte text-white text-4xl mt-10">Ranking</h1>
          <h2 className="fonte text-white cordourado text-2xl mt-5">
            {temaConvertido}
          </h2>
          <div className="w-100 h-130 rounded-2xl p-3 bg-white mt-10">
            <div className="flex justify-between text-2xl fonte m-2">
              <h2>Jogador</h2>
              <h2>Pontuação</h2>
              <p className="absolute right-21 top-50">
                _________________________
              </p>
            </div>
            {ranking.length === 0 ? (
              <p>Nenhum ranking disponível</p>
            ) : (
              ranking.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex justify-between mb-2 pt-2 text-2xl"
                >
                  <p>
                    <strong>{index + 1}.</strong> {item.nome}
                  </p>
                  <p>{item.pontuacao}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
