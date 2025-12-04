import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import Loader from "./components/Loader";
import Welcome from "./pages/Welcome";
import Map from "./pages/Map";
import Chapter from "./pages/Chapter";
import Puzzle from "./pages/Puzzle";
import Final from "./pages/Final";

const TOTAL_DAYS = 24;

const App = () => {
  const navigate = useNavigate();

  const [currentDay, setCurrentDay] = useState(null);
  const [daysData, setDaysData] = useState([]);
  const [collectedPieces, setCollectedPieces] = useState([]); // Array of day IDs
  const [showFinalLetter, setShowFinalLetter] = useState(false);
  const [loading, setLoading] = useState(false);

  const chaptersCollectionRef = collection(db, "chapters");

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        setLoading(true);
        const data = await getDocs(chaptersCollectionRef);

        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setDaysData(
          filteredData.sort((a, b) => parseInt(a.id) - parseInt(b.id))
        );

        // Filtrar los capítulos completados y guardar sus IDs
        const completedIds = filteredData
          .filter((chapter) => chapter.isCompleted === true)
          .map((chapter) => parseInt(chapter.id));

        setCollectedPieces(completedIds);
      } catch (err) {
        console.error(err);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      }
    };

    fetchChapters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDayClick = (dayId) => {
    const day = daysData.find((d) => d.id === dayId);
    if (!day) return;

    // Simulación: Si es un día futuro en una app real, se mostraría un bloqueo.
    // Aquí permite abrir todos para la demo, pero visualmente se marca el progreso.

    setCurrentDay(day);
    navigate("chapter");
  };

  // La función ahora debe ser 'async'
  const handleCollectPiece = async (dayId) => {
    // **1. Actualizar Firestore**
    try {
      setLoading(true);
      const chapterRef = doc(db, "chapters", dayId.toString());

      await updateDoc(chapterRef, {
        isCompleted: true,
      });

      console.log(`Capítulo ${dayId} actualizado correctamente en Firestore.`);
    } catch (error) {
      console.error("Error al actualizar el documento en Firestore:", error);
      return;
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    }

    // **2. Actualizar el estado local (UI)**
    if (!collectedPieces.includes(dayId)) {
      setCollectedPieces([...collectedPieces, dayId]);
    }

    setDaysData((prev) =>
      prev.map((d) => (d.id == dayId ? { ...d, isCompleted: true } : d))
    );

    // **3. Lógica de navegación**
    if (dayId === 24) {
      navigate("/puzzle");
      setShowFinalLetter(true);
    } else {
      navigate("/puzzle");
    }
  };

  if (loading) return <Loader />;

  return (
    <main>
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route
          path="/map"
          element={
            <Map
              daysData={daysData}
              handleDayClick={handleDayClick}
              collectedPieces={collectedPieces}
              TOTAL_DAYS={TOTAL_DAYS}
            />
          }
        />

        <Route
          path="/chapter"
          element={
            <Chapter
              currentDay={currentDay}
              handleCollectPiece={handleCollectPiece}
            />
          }
        />

        <Route
          path="/puzzle"
          element={<Puzzle collectedPieces={collectedPieces} />}
        />
      </Routes>

      {showFinalLetter && <Final setShowFinalLetter={setShowFinalLetter} />}
    </main>
  );
};

export default App;
