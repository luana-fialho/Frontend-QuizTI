export default function LoginModal({ onClose }) {
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
        />
        <label htmlFor="old">
          <h2 className="text-white fonte text-3xl pb-3">Idade:</h2>
        </label>
        <input
          className="border border-gray-400 focus:border-gray-800 outline-none mb-3 p-3 rounded-xl bg-white"
          type="text"
          id="old"
          placeholder="Digite sua idade"
        />
        <h2 className="text-white fonte text-3xl pb-3">Gênero</h2>
        <div className="fonteSecundaria text-white text-xl flex flex-wrap justify-center">
          <label htmlFor="m" className="mr-13">
            <input
              className="appearance-none w-4 h-4 border-2 border-white rounded-full checked:bg-white mr-2"
              type="radio"
              id="m"
              name="genero"
            />
            Masculino
          </label>
          <label htmlFor="f">
            <input
              className="appearance-none w-4 h-4 border-2 border-white rounded-full checked:bg-white mr-2"
              type="radio"
              id="f"
              name="genero"
            />
            Feminino
          </label>
          <label htmlFor="o" className="w-full flex justify-center m-2">
            <input
              className="mt-1.5 appearance-none w-4 h-4 border-2 border-white rounded-full checked:bg-white mr-2"
              type="radio"
              name="genero"
              id="o"
            />
            Outro
          </label>
        </div>

        <button className="fonte corazul-dark bg-white w-55 h-13 text-lg rounded-4xl flex justify-center items-center m-3 cursor-pointer">
          Continuar
        </button>
      </div>
    </div>
  );
}
