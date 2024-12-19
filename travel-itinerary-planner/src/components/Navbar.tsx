import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand as={NavLink} to="/" end>
          Travel Itinearray Planner
        </Navbar.Brand>
        <b>| &nbsp;</b>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add-itinerary">
              Add Itinerary
            </Nav.Link>
            {/* <Nav.Link as={NavLink} to="/edit-itinerary">
              Edit Itinerary
            </Nav.Link> */}
            {/* <Nav.Link as={NavLink} to="/view-itinerary/:id">
              View Itinerary
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
