import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Final = ({ setShowFinalLetter }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 backdrop-blur-xs">
      <div className="bg-white/95 text-black p-10 max-w-xl rounded-md leading-1.5 text-center">
        {/* <Star className="w-16 h-16 text-[#C16E70] mx-auto mb-6 animate-spin-slow" /> */}
        <h2 className="text-2xl md:text-4xl text-[#5A3E36] font-serif font-bold mb-6">
          La Guardiana de la Luz
        </h2>
        <p className="text-xl text-[#8A6F63] font-light leading-relaxed mb-10">
          Al colocar el último fragmento, la nieve se derrite... <br />
          <br />
          No necesitabas buscar la luz en bosques encantados. La luz siempre ha
          sido esto. Lo que construimos día a día. <br />
          <br />
          Tú eres mi heroína, mi aventura favorita y la pieza que completa mi
          vida. El invierno puede ser frío, pero mientras estemos juntos,
          siempre será verano.
        </p>

        <h3 className="mt-8 text-right text-xl">- Te amo.</h3>

        <button
          className="reveal-btn"
          style={{
            transition: "all 0.3s",
          }}
          onClick={() => {
            setShowFinalLetter(false);
            navigate("/puzzle");
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Final;
