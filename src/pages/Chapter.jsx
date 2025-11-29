import { Map } from "lucide-react";
import { Gift } from "lucide-react";
import { ArrowLeft } from "lucide-react";

const Chapter = ({ currentDay, setView, handleCollectPiece }) => {
  if (!currentDay) return null;
  const isGift = currentDay.type === "gift";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 z-20 relative">
      <div className="max-w-2xl w-full paper-texture shadow-2xl rounded-sm overflow-hidden min-h-[80vh] flex flex-col relative animate-fade-in">
        {/* Header Image */}
        <div className="h-64 relative overflow-hidden">
          <img
            src={currentDay.image}
            alt="Chapter header"
            className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-10000 ease-linear"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#fffbf7] to-transparent"></div>
          <button
            onClick={() => setView("map")}
            className="absolute top-4 left-4 p-2 bg-white/50 rounded-full hover:bg-white transition"
          >
            <ArrowLeft size={24} className="text-[#5A3E36]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 flex-1 flex flex-col items-center text-center">
          <h3 className="text-[#C16E70] text-sm uppercase tracking-widest font-bold mb-2">
            Día {currentDay.day}
          </h3>
          <h2 className="text-4xl text-[#5A3E36] font-serif mb-8 leading-tight">
            {currentDay.title}
          </h2>

          <div className="w-16 h-1 bg-[#E8DCCB] mb-8"></div>

          <p className="text-lg text-[#8A6F63] leading-loose font-light mb-8 max-w-lg">
            {currentDay.content}
          </p>

          {isGift ? (
            <div className="mt-auto p-6 bg-[#FDF7F1] border border-[#C16E70] border-dashed rounded-lg w-full max-w-sm">
              <Gift className="mx-auto text-[#C16E70] w-12 h-12 mb-4" />
              <p className="font-serif text-xl text-[#5A3E36] mb-2">
                Vale por:
              </p>
              <p className="text-[#8A6F63] italic">
                Una cena romántica casera preparada por mí.
              </p>
              <button
                onClick={() => handleCollectPiece(currentDay.id)}
                className="mt-6 w-full py-3 bg-[#C16E70] text-white rounded-lg hover:bg-[#a85a5c] transition"
              >
                Guardar Recuerdo
              </button>
            </div>
          ) : (
            <>
              <div className="mt-auto mb-8 p-4 bg-[#FDF7F1] rounded-lg border-l-4 border-[#AEC4D1] text-left w-full max-w-md">
                <p className="text-sm text-[#AEC4D1] font-bold uppercase mb-1 flex items-center gap-2">
                  <Map size={14} /> Pista del día
                </p>
                <p className="text-[#8A6F63] italic">{currentDay.clue}</p>
              </div>

              <button
                onClick={() => handleCollectPiece(currentDay.id)}
                disabled={currentDay.isCompleted}
                className={`
                    px-8 py-3 rounded-full font-serif text-lg shadow-md transition-all transform hover:-translate-y-1
                    ${
                      currentDay.isCompleted
                        ? "bg-[#E8DCCB] text-[#8A6F63] cursor-default"
                        : "bg-[#5A3E36] text-[#FDF7F1] hover:bg-[#C16E70]"
                    }
                  `}
              >
                {currentDay.isCompleted
                  ? "Recuerdo Guardado"
                  : "Revelar Pieza del Puzzle"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chapter;
