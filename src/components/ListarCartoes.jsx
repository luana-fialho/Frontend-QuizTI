import Cartoes from "./Cartoes.jsx";

export default function ListarCartoes() {
  return (
    <div className="flex justify-center items-center gap-30 p-4">
      <Cartoes tema="Back-end" />
      <Cartoes tema="Front-end" />
      <Cartoes tema="Dados" />
    </div>
  );
}
