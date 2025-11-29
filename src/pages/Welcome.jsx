import { Star } from "lucide-react";

const Welcome = ({ setView }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 relative z-10 animate-fade-in">
      <div className="mb-8 opacity-80">
        <Star className="w-12 h-12 text-[#C16E70] animate-pulse" />
      </div>
      <h1 className="text-5xl md:text-7xl text-[#5A3E36] mb-4 font-bold italic">
        Nuestro Calendario
      </h1>
      <h2 className="text-2xl md:text-3xl text-[#8A6F63] mb-12 font-light">
        24 días de magia contigo
      </h2>

      <p className="max-w-md text-lg text-[#8A6F63] mb-12 italic leading-relaxed">
        "Un viaje hecho solo para ti, para descubrir poco a poco nuestra
        historia de invierno."
      </p>

      <button
        onClick={() => setView("map")}
        className="group relative px-10 py-4 bg-[#5A3E36] text-[#FDF7F1] rounded-full text-xl font-serif tracking-widest hover:bg-[#C16E70] transition-colors duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
      >
        <span className="relative z-10">Entrar</span>
      </button>

      <div className="absolute bottom-8 text-sm text-[#D1C0A8]">
        Desliza hacia el encanto del invierno
      </div>
    </div>
  );
};

export default Welcome;
