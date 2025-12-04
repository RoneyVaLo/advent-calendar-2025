import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Puzzle = ({ collectedPieces }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 z-10 relative">
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => navigate("/map")}
          className="flex items-center gap-2 text-[#5A3E36] hover:text-[#C16E70] transition"
        >
          <ArrowLeft size={20} /> Volver al Mapa
        </button>
      </div>

      <div className="glass-card p-6 md:p-0 rounded-2xl max-w-4xl w-full text-center">
        <h2 className="text-3xl font-serif text-[#5A3E36] my-2">
          Tu Mosaico de Invierno
        </h2>
        <p className="text-[#8A6F63] italic mb-4">
          Recupera los fragmentos de nuestra historia día tras día
        </p>

        <div className="grid grid-cols-4 md:grid-cols-6 gap-2 bg-[#E8DCCB] p-4 rounded-lg shadow-inner mx-auto max-w-3xl">
          {Array.from({ length: 24 }).map((_, i) => {
            const dayNum = i + 1;
            const isCollected = collectedPieces.includes(dayNum);

            return (
              <div
                key={i}
                className={`
                      aspect-square rounded flex items-center justify-center transition-all duration-700
                      ${
                        !isCollected
                          ? "bg-white shadow-sm scale-100 opacity-100"
                          : "bg-[#D1C0A8] opacity-50 scale-95 inner-shadow"
                      }
                    `}
              >
                {!isCollected ? (
                  <img
                    src={`/puzzle/day-${dayNum}.webp`}
                    className="w-full h-full object-cover rounded opacity-80"
                    alt="piece"
                  />
                ) : (
                  <span className="text-black font-serif text-lg font-bold opacity-70">
                    {dayNum}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal de pieza nueva */}
        {collectedPieces.length > 0 && (
          <div className="mt-8 text-[#C16E70] animate-pulse font-serif">
            ¡Has añadido una nueva pieza a la colección!
          </div>
        )}
      </div>
    </div>
  );
};

export default Puzzle;
