import { Routes, Route } from "react-router";
import HomePage from "./pages/Homepage";
import AddItinerary from "./pages/AddItinerary";
import EditItinerary from "./pages/EditItinerary";
import ViewItinerary from "./pages/ViewItinerary";
import NavigationBar from "./components/Navbar";
import { useState } from "react";
import { Itinerary } from "./dto/itineary";

const App = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([
    {
      id: 1,
      name: "Trip to Paris",
      destination: "Paris",
      startDate: "12-20-2024",
      endDate: "12-29-2024",
      status: "In-Progress",
      modeOfTransport: "Flight",
      budget: 1200,
    },
  ]);

  const deleteItinerary = (id: number) => {
    setItineraries((prev) => prev.filter((itinerary) => itinerary.id !== id));
  };

  const editItinerary = (id: number, data: Omit<Itinerary, "id">) => {
    setItineraries((prev) =>
      prev.map((itinerary) =>
        itinerary.id === id ? { id, ...data } : itinerary
      )
    );
  };
  const addItinerary = (data: Omit<Itinerary, "id">) => {
    setItineraries((prev: Itinerary[]) => [
      ...prev,
      { ...data, id: itineraries.length + 1 },
    ]);
  };

  return (
    <>
      <header>
        <NavigationBar />
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              deleteItinerary={deleteItinerary}
              itineraries={itineraries}
            />
          }
        />
        <Route
          path="/add-itinerary"
          element={<AddItinerary addItinerary={addItinerary} />}
        />
        <Route
          path="/edit-itinerary/:id"
          element={
            <EditItinerary
              itineraries={itineraries}
              editItinerary={editItinerary}
            />
          }
        />
        <Route
          path="/view-itinerary/:id"
          element={<ViewItinerary itineraries={itineraries} />}
        />
      </Routes>
    </>
  );
};

export default App;
