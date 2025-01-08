import { useNavigate, useParams } from "react-router";
import {
  IoIosInformationCircleOutline,
  IoMdArrowRoundBack,
} from "react-icons/io";
import { Itinerary } from "../dto/itineary";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FaCalendarAlt, FaDollarSign, FaMapMarkedAlt } from "react-icons/fa";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import travelPic from "../img/Designer.png";

ChartJS.register(ArcElement, Tooltip, Legend);

type ViewItineraryProps = {
  itineraries: Itinerary[];
};

const ViewItinerary = ({ itineraries }: ViewItineraryProps) => {
  const { id } = useParams<{ id: string }>();
  const itinerary = itineraries.find(
    (itinerary) => itinerary.id === parseInt(id || "", 10)
  );

  const statusCount = itineraries.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    { Planned: 0, "In-Progress": 0, Completed: 0 }
  );

  const chartData = {
    labels: ["Planned", "In-progress", "Completed"],
    datasets: [
      {
        data: [
          statusCount.Planned || 0,
          statusCount["In-Progress"] || 0,
          statusCount.Completed || 0,
        ],
        backgroundColor: ["#007bff", "#ffc107", "#28a745"],
        borderColor: ["#ffffff", "#ffffff", "#fvfffff"],
        borderWidth: 1,
      },
    ],
  };

  const navigate = useNavigate();
  if (!itinerary) {
    return <p className="text-danger">Itinerary not found.</p>;
  }

  return (
    <>
      <h3 className="text-center page-heading">View Itinerary</h3>
      <div className="view-heading  d-flex justify-content-center">
        <Card className="shadow-lg" style={{ width: "30rem" }}>
          {/* <Card.Title>
            <Card.Img
              variant="top"
              src={travelPic}
              width={250}
              height={250}
              alt="Travel Pic"
            />
          </Card.Title> */}
          <Card.Header as={Row} className="card-header ">
            <Col s lg="2">
              <Button variant="light" onClick={() => navigate("/")}>
                <IoMdArrowRoundBack />
              </Button>
            </Col>
            <Col>
              <h4
                style={{
                  paddingLeft: "30px",
                  marginLeft: "40px",
                  marginTop: "15px",
                }}>
                {itinerary.name}
              </h4>
            </Col>
          </Card.Header>
          <Card.Body className="p-4 card-body">
            <ul className="list-unstyled">
              <div className="mb-3 d-flex align-itens-center">
                <FaMapMarkedAlt className="me-3 text-danger" size={20} />
                <strong>Destination: </strong>
                {itinerary.destination}
              </div>
              <div className="mb-3 d-flex align-itens-center">
                <FaCalendarAlt className="me-3 text-warning" size={20} />
                <strong>Start Date: </strong>
                {itinerary.startDate}
              </div>
              <div className="mb-3 d-flex align-itens-center">
                <FaCalendarAlt className="me-3 text-warning" size={20} />
                <strong>End Date: </strong>
                {itinerary.endDate}
              </div>
              <div className="mb-3 d-flex align-itens-center">
                <IoIosInformationCircleOutline className="me-3 text-warning" />
                <strong>Status: </strong>
                {itinerary.status}
              </div>
              <div className="mb-3 d-flex align-itens-center">
                <MdOutlineEmojiTransportation
                  className="me-3 text-warning"
                  size={20}
                />
                <strong>Mode of Tranport: </strong>
                {itinerary.modeOfTransport}
              </div>
              <div className="mb-3 d-flex align-itens-center">
                <FaDollarSign className="me-3 text-warning" size={20} />
                <strong>Budget: </strong>
                {itinerary.budget}
              </div>
            </ul>
          </Card.Body>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card>
      </div>
      <h3 className="text-center page-heading">Itinerary Status Overview</h3>
      <div
        className="chart-container"
        style={{ maxWidth: "350px", margin: "0 auto" }}>
        <Pie data={chartData} />
      </div>
    </>
  );
};

export default ViewItinerary;
