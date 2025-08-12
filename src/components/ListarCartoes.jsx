import Cartoes from "./Cartoes.jsx";

export default function ListarCartoes({ login }) {
  return (
    <div className="flex justify-center items-center gap-30 p-4">
      <Cartoes tema="backend" login={login} />
      <Cartoes tema="frontend" login={login} />
      <Cartoes tema="dados" login={login} />
    </div>
  );
}
