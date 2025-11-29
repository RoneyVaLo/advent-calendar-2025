import { useState } from "react";
import Welcome from "./pages/Welcome";
import Map from "./pages/Map";
import Chapter from "./pages/Chapter";

const TOTAL_DAYS = 24;

const generateDaysData = () => {
  const days = [];
  for (let i = 1; i <= 24; i++) {
    let type = "story";
    let title = `Capítulo ${i}: El Comienzo del Frío`;
    let content =
      "El invierno llegó suavemente, cubriendo nuestras huellas con un manto blanco. Recuerdo el día en que nos conocimos, el aire olía a pino y promesas...";
    let clue = "Busca donde guardamos los recuerdos de papel.";

    // Contenido específico para demostración
    if (i === 1) {
      title = "Capítulo 1: El Primer Copo";
      content =
        "Todo comienza con un pequeño destello en el cielo gris. Así apareciste tú en mi vida, silenciosa pero transformándolo todo. Este calendario no es solo una cuenta atrás, es un mapa de lo que somos.";
      clue = "La primera pieza es la base de todo.";
    }
    if (i === 5) {
      type = "gift";
      title = "Día 5: Un Pequeño Detalle";
      content =
        "A veces el amor no necesita palabras, solo un momento de calma compartido. Hoy quiero regalarte eso.";
    }
    if (i === 12) {
      title = "Capítulo 12: Mitad del Camino";
      content =
        "Doce días de magia. La nieve se acumula fuera, pero aquí dentro, el fuego de nuestra historia arde más fuerte que nunca.";
      clue = "Mira bajo la luz más cálida de la casa.";
    }
    if (i === 24) {
      type = "final";
      title = "Día 24: El Encuentro Final";
      content =
        "Hemos llegado al final de este calendario, pero solo al principio de nuestra próxima gran aventura. Gracias por cada día.";
    }

    days.push({
      id: i,
      day: i,
      type: type, // 'story', 'gift', 'final'
      title: title,
      content: content,
      clue: clue,
      image: `https://images.unsplash.com/photo-${
        i % 2 === 0 ? "1477601458968-3d122247ba84" : "1543589077-47d821896773"
      }?auto=format&fit=crop&w=800&q=80`, // Winter aesthetic placeholders
      isLocked: false, // En una app real, esto dependería de la fecha actual
      isCompleted: false,
    });
  }
  return days;
};

const App = () => {
  const [view, setView] = useState("welcome");
  const [currentDay, setCurrentDay] = useState(null);
  const [daysData, setDaysData] = useState(generateDaysData());
  const [collectedPieces, setCollectedPieces] = useState([]); // Array of day IDs

  const handleDayClick = (dayId) => {
    const day = daysData.find((d) => d.id === dayId);
    if (!day) return;

    // Simulación: Si es un día futuro en una app real, se mostraría un bloqueo.
    // Aquí permite abrir todos para la demo, pero visualmente se marca el progreso.

    setCurrentDay(day);
    setView("chapter");
  };

  const handleCollectPiece = (dayId) => {
    if (!collectedPieces.includes(dayId)) {
      setCollectedPieces([...collectedPieces, dayId]);
    }
    // Marcar como completado
    setDaysData((prev) =>
      prev.map((d) => (d.id === dayId ? { ...d, isCompleted: true } : d))
    );

    if (dayId === 24) {
      setView("final");
    } else {
      setView("puzzle");
    }
  };

  return (
    <main>
      {view === "welcome" && <Welcome setView={setView} />}
      {view === "map" && (
        <Map
          setView={setView}
          daysData={daysData}
          handleDayClick={handleDayClick}
          collectedPieces={collectedPieces}
          TOTAL_DAYS={TOTAL_DAYS}
        />
      )}
      {view === "chapter" && (
        <Chapter
          currentDay={currentDay}
          setView={setView}
          handleCollectPiece={handleCollectPiece}
        />
      )}
    </main>
  );
};

export default App;
