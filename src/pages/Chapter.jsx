import { Gift } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { getDay } from "../utils/Date";
import { Music4 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Chapter = ({ currentDay, handleCollectPiece }) => {
  const navigate = useNavigate();

  if (!currentDay) return null;

  const isGift = currentDay.giftType;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 z-20 relative">
      <div className="max-w-2xl w-full paper-texture shadow-2xl rounded-sm overflow-hidden min-h-[80vh] flex flex-col relative animate-fade-in">
        {/* Header Image */}
        <div className="h-64 relative overflow-hidden">
          <img
            src="/window-bg.webp"
            alt="Chapter header"
            className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-10000 ease-linear"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#fffbf7] to-transparent"></div>
          <button
            onClick={() => navigate("/map")}
            className="absolute top-4 left-4 p-2 bg-white/50 rounded-full hover:bg-white transition"
          >
            <ArrowLeft size={24} className="text-[#5A3E36]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 flex-1 flex flex-col items-center text-center">
          <h3 className="text-[#C16E70] text-sm uppercase tracking-widest font-bold mb-2">
            Día {getDay(currentDay.day)}
          </h3>
          <h2 className="text-4xl text-[#5A3E36] font-serif mb-8 leading-tight">
            {currentDay.title}
          </h2>

          <div className="w-16 h-1 bg-[#E8DCCB] mb-8"></div>

          <p className="text-lg text-[#8A6F63] leading-loose font-light mb-8 max-w-lg">
            {currentDay.content}
          </p>

          {isGift && isGift === "spotify" ? (
            <div className="mt-auto p-6 bg-[#FDF7F1] border border-[#C16E70] border-dashed rounded-lg w-full max-w-sm">
              <Music4 className="mx-auto text-[#C16E70] w-12 h-12 mb-4" />{" "}
              <p className="font-serif text-xl text-[#5A3E36] mb-4">
                Recuerdo Desbloqueado:
              </p>
              <a
                href={currentDay.giftLink}
                target="_blank"
                rel="noreferrer"
                className="my-6 w-full py-3 px-6 bg-[#C16E70] text-white rounded-lg hover:bg-[#a85a5c] transition"
              >
                Escucharlo
              </a>
            </div>
          ) : isGift && isGift === "coupon" ? (
            <>
              <div className="mt-auto p-6 bg-[#FDF7F1] border border-[#C16E70] border-dashed rounded-lg w-full max-w-sm">
                <Gift className="mx-auto text-[#C16E70] w-12 h-12 mb-4" />
                <p className="font-serif text-xl text-[#5A3E36] mb-2">
                  Toma un screenshot para que lo puedas canjear:
                </p>
                <p className="text-[#8A6F63] italic">
                  {currentDay.giftContent}
                </p>
              </div>
            </>
          ) : (
            <div></div>
          )}

          <button
            onClick={() => handleCollectPiece(parseInt(currentDay.id))}
            // disabled={currentDay.isCompleted}
            className={`
                    px-8 py-3 rounded-full font-serif text-lg shadow-md transition-all transform hover:-translate-y-1 mt-4
                    ${
                      currentDay.isCompleted
                        ? "bg-[#E8DCCB] text-[#8A6F63] cursor-default"
                        : "bg-[#5A3E36] text-[#FDF7F1] hover:bg-[#C16E70]"
                    }
                  `}
          >
            {currentDay.isCompleted
              ? "Fragmento Guardado"
              : "Revelar Fragmento"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chapter;
