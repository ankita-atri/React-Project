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
        <EmptyItineraray />
        <Button variant="light" onClick={() => navigate("/add-itinerary")}>
          Add Itinerary
        </Button>
      </>
    );
  }
  return (
    <>
      <div className="container mt-5">
        <h3 className="text-center page-heading"> Itinerary List</h3>
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
