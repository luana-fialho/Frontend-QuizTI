import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";

export default function LoginModal({ onClose, setLogin }) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [genero, setGenero] = useState("");
  const [mensagem, setMensagem] = useState("");
  const { setUser } = useContext(UserContext);

  const addPlayer = () => {
    console.log("Função addPlayer chamada");
    if (!nome) {
      setMensagem("Preencha seu nome!");
      return;
    }
    console.log("Enviando dados para a API:", { nome, idade, genero });
    fetch("http://localhost:3000/user/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, idade, genero }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Resposta:", data);
        setMensagem("Cadastro realizado com sucesso!");
        setLogin(true);
        setUser(data); // Atualiza o contexto com o usuário retornado da API
        localStorage.setItem("nomeJogador", nome);

        setTimeout(() => {
          onClose();
        }, 1500);
      })
      .catch((err) => {
        console.error("Erro no cadastro:", err);
        setMensagem("Erro ao cadastrar. Tente novamente.");
      });
  };

  function changeGenero(e) {
    setGenero(e.target.value);
  }

  return (
    <div className="flex flex-col bg-fundoazul-medium h-150 w-100 rounded-4xl">
      <header className="relative flex justify-center items-center">
        <h1 className="text-5xl fonte cordourado p-8">Jogador</h1>
        <button
          onClick={onClose}
          className="cordourado text-4xl absolute right-6 top-4"
        >
          X
        </button>
      </header>
      <div className="m-4 flex flex-col items-center">
        <label htmlFor="name">
          <h2 className="text-white fonte text-3xl pb-3">Nome:</h2>
        </label>
        <input
          className="border border-gray-400 focus:border-gray-800 outline-none mb-3 p-3 rounded-xl bg-white"
          type="text"
          id="name"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <label htmlFor="old">
          <h2 className="text-white fonte text-3xl pb-3">Idade:</h2>
        </label>
        <input
          className="border border-gray-400 focus:border-gray-800 outline-none mb-3 p-3 rounded-xl bg-white"
          type="text"
          id="old"
          placeholder="Digite sua idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />
        <h2 className="text-white fonte text-3xl pb-3">Gênero</h2>
        <div className="fonteSecundaria text-white text-xl flex flex-wrap justify-center">
          <label htmlFor="m" className="mr-13">
            <input
              className="appearance-none w-4 h-4 border-2 border-white rounded-full checked:bg-white mr-2"
              type="radio"
              id="m"
              name="genero"
              value="masc"
              onChange={changeGenero}
            />
            Masculino
          </label>
          <label htmlFor="f">
            <input
              className="appearance-none w-4 h-4 border-2 border-white rounded-full checked:bg-white mr-2"
              type="radio"
              id="f"
              name="genero"
              value="fem"
              onChange={changeGenero}
            />
            Feminino
          </label>
          <label htmlFor="o" className="w-full flex justify-center m-2">
            <input
              className="mt-1.5 appearance-none w-4 h-4 border-2 border-white rounded-full checked:bg-white mr-2"
              type="radio"
              name="genero"
              id="o"
              value="outro"
              onChange={changeGenero}
            />
            Outro
          </label>
        </div>

        <button
          onClick={addPlayer}
          className="fonte corazul-dark bg-white w-55 h-13 text-lg rounded-4xl flex justify-center items-center m-3 cursor-pointer hover:scale-110 transition-transform"
        >
          Continuar
        </button>
      </div>
      {mensagem && (
        <p className="text-white mt-4 bg-green-700 px-4 py-2 rounded-xl">
          {mensagem}
        </p>
      )}
      {console.log({ nome, idade, genero })}
    </div>
  );
}
