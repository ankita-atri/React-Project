import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import planeIcon from "../img/plane-icon.png";
import home from "../img/home.png";
import add from "../img/add.png";

const NavigationBar = () => {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand as={NavLink} to="/" end>
          <img
            src={planeIcon}
            alt="Plane Icon"
            width="30"
            height="30"
            className="d-inline-block align-top"
            style={{ padding: "2px" }}
          />
          Travel Itinearray Planner
        </Navbar.Brand>
        <b>| &nbsp;</b>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              <img
                src={home}
                alt="Plane Icon"
                width="30"
                height="30"
                className="d-inline-block align-top"
                style={{ paddingBottom: "5px" }}
              />
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add-itinerary">
              <img
                src={add}
                alt="Plane Icon"
                width="30"
                height="30"
                className="d-inline-block align-top"
                style={{ paddingBottom: "5px" }}
              />
              Add Itinerary
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
