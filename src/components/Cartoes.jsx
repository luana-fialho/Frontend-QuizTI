export default function Cartoes({ tema }) {
  return (
    <div className="bg-fundoazul-light box-border w-90 h-90 border-4 p-4 flex justify-center items-center rounded-4xl m-2">
      <h1 className="fonte text-4xl text-white">{tema}</h1>
    </div>
  );
}
