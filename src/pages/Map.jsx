import { Lock } from "lucide-react";
import { Star } from "lucide-react";
import { Heart } from "lucide-react";
import { Puzzle } from "lucide-react";

const Map = ({
  setView,
  daysData,
  handleDayClick,
  collectedPieces,
  TOTAL_DAYS,
}) => {
  return (
    <div className="min-h-screen pb-20 px-4 pt-10 z-10 relative">
      <header className="flex justify-between items-center mb-10 max-w-4xl mx-auto">
        <div>
          <h2 className="text-3xl text-[#5A3E36] font-bold">Tu Aventura</h2>
          <p className="text-[#8A6F63] italic">Día a día, pieza a pieza</p>
        </div>
        <button
          onClick={() => setView("puzzle")}
          className="flex items-center gap-2 px-4 py-2 bg-[#E8DCCB] rounded-full hover:bg-[#D1C0A8] transition-colors text-[#5A3E36] cursor-pointer"
        >
          <Puzzle size={18} />
          <span>Tablero</span>
        </button>
      </header>

      <div className="max-w-4xl mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {daysData.map((day) => (
          <button
            key={day.id}
            onClick={() => handleDayClick(day.id)}
            className={`
              relative aspect-3/4 rounded-t-full rounded-b-lg border-2 flex flex-col items-center justify-center transition-all duration-500 group cursor-pointer
              ${
                day.isCompleted
                  ? "bg-[#FDF7F1] border-[#C16E70] border-opacity-30"
                  : "bg-[#E8DCCB] border-transparent hover:bg-[#FDF7F1] hover:border-[#D1C0A8] hover:-translate-y-2 shadow-md"
              }
            `}
          >
            {/* Window frame detail */}
            <div className="absolute inset-2 border border-white border-opacity-40 rounded-t-full rounded-b-lg pointer-events-none" />

            <span
              className={`text-2xl font-serif font-bold ${
                day.isCompleted ? "text-[#C16E70]" : "text-[#5A3E36]"
              }`}
            >
              {day.day}
            </span>

            <div className="mt-2">
              {day.isCompleted ? (
                <Heart size={16} className="text-[#C16E70] fill-current" />
              ) : day.isLocked ? (
                <Lock size={16} className="text-[#8A6F63] opacity-50" />
              ) : (
                <Star
                  size={16}
                  className="text-[#AEC4D1] opacity-0 group-hover:opacity-100 transition-opacity"
                />
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full p-4 glass-card text-center text-[#8A6F63] text-sm">
        {collectedPieces.length} de {TOTAL_DAYS} días descubiertos
      </div>
    </div>
  );
};

export default Map;
