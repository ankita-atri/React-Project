import { Routes, Route } from "react-router";
import HomePage from "./pages/Homepage";
import AddItinerary from "./pages/AddItinerary";
import EditItinerary from "./pages/EditItinerary";
import ViewItinerary from "./pages/ViewItinerary";
import NavigationBar from "./components/Navbar";
import { useEffect, useState } from "react";

// import itinerary from "./travel-data/itineary";

import { Itinerary } from "./dto/itineary";
import axios from "axios";

const App = () => {
  // const [itineraries, setItineraries] = useState<Itinerary[]>([
  //   {
  //     id: 1,
  //     name: "Thanksgiving'24",
  //     destination: "San Francisco",
  //     startDate: "11-26-2024",
  //     endDate: "11-29-2024",
  //     status: "Completed",
  //     modeOfTransport: "Car",
  //     budget: 3400,
  //   },
  //   {
  //     id: 2,
  //     name: "Trip to Paris",
  //     destination: "Paris",
  //     startDate: "12-20-2024",
  //     endDate: "1-29-2025",
  //     status: "In-Progress",
  //     modeOfTransport: "Flight",
  //     budget: 1200,
  //   },
  //   {
  //     id: 3,
  //     name: "Summer Trip",
  //     destination: "Miami",
  //     startDate: "06-20-2025",
  //     endDate: "07-29-2025",
  //     status: "Planned",
  //     modeOfTransport: "Flight",
  //     budget: 5800,
  //   },
  //   {
  //     id: 4,
  //     name: "Spring Break",
  //     destination: "Los Angeles",
  //     startDate: "03-05-2025",
  //     endDate: "03-15-2025",
  //     status: "Planned",
  //     modeOfTransport: "Train",
  //     budget: 5800,
  //   },
  // ]);

  // useEffect(() => {
  //   axios.get("ttp://localhost:3000/trips").then((data) => {
  //     console.log(data.data);
  //   });
  // });
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/trips")
      .then((response) => {
        setItineraries(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);
  // axios
  //   .get("http://localhost:3000/trips")
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.error("There was an error fetching the data!", error);
  //   });

  // useEffect(() => {
  //   axios.get("https://jsonplaceholder.typicode.com/posts").then((d) => {
  //     console.log(d.data);
  //   });
  // });

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
      <div className="background"></div>
      <div className="content">
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
      </div>
    </>
  );
};

export default App;
