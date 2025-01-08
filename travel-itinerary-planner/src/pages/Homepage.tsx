import Table from "../components/Table";
import { Itinerary } from "../dto/itineary";
import { useNavigate } from "react-router";
import EmptyItineraray from "./EmptyItinerary";
import { Button } from "react-bootstrap";
import { FcPlus } from "react-icons/fc";

interface ItenarariesProps {
  itineraries: Itinerary[];
  deleteItinerary: (id: number) => void;
}

const HomePage = ({ deleteItinerary, itineraries }: ItenarariesProps) => {
  const navigate = useNavigate();
  if (itineraries.length === 0) {
    return (
      <>
        <div
          className="container mt-5"
          style={{ backgroundColor: "rgba(232, 220, 202, 0.2)" }}>
          <h5 className="text-center">
            <b>
              Plan your perfect trip with the all-in-one travel itinerary
              planner!
            </b>
          </h5>
          <EmptyItineraray />
          <Button variant="light" onClick={() => navigate("/add-itinerary")}>
            <FcPlus style={{ marginRight: "5px", paddingBottom: "2px" }} />
            Itinerary
          </Button>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className="container mt-5"
        style={{ backgroundColor: "rgba(232, 220, 202, 0.2)" }}>
        <h5 className="text-center">
          <b>
            Plan your perfect trip with the all-in-one travel itinerary planner!
          </b>
        </h5>
        <h3 className="text-center page-heading">Itinerary List</h3>

        <Table deleteItinerary={deleteItinerary} data={itineraries} />
        <Button variant="light" onClick={() => navigate("/add-itinerary")}>
          <FcPlus style={{ marginRight: "5px", paddingBottom: "2px" }} />
          Itinerary
        </Button>
      </div>
    </>
  );
};

export default HomePage;
