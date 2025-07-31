import { useNavigate } from "react-router-dom";

export default function Cartoes({ tema }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("/questions", { state: { tema } });
      }}
      className="bg-fundoazul-light box-border w-90 h-90 border-4 p-4 flex justify-center items-center rounded-4xl m-2"
    >
      <h1 className="fonte text-4xl text-white">{tema}</h1>
    </div>
  );
}
