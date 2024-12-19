import { useNavigate, useParams } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Itinerary } from "../dto/itineary";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FaCalendarAlt, FaDollarSign, FaMapMarkedAlt } from "react-icons/fa";
// import travelPic from "../img/Designer.png";

type ViewItineraryProps = {
  itineraries: Itinerary[];
};

const ViewItinerary = ({ itineraries }: ViewItineraryProps) => {
  const { id } = useParams<{ id: string }>();
  const itinerary = itineraries.find(
    (itinerary) => itinerary.id === parseInt(id || "", 10)
  );
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
                <strong>Status: </strong>
                {itinerary.status}
              </div>
              <div className="mb-3 d-flex align-itens-center">
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
    </>
  );
};

export default ViewItinerary;
