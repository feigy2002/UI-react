import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
// import "bootstrap/dist/css/bootstrap.min.css";
//pages
import Connect from "./Component/Connect";
import About from "./Component/About";
import Home from "./Component/Home";
import SearchEvent from "./Component/SearchEvent";
import EventTalk from './Component/EventTalk';
import './App.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { MapsApp } from './Component/MapsHistory';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/" className='brand'>Time Tunnel</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/About">קצת עלינו</Nav.Link>
              <Nav.Link variant="pills" href="/">דף הבית</Nav.Link>
              <Nav.Link href="/event-search">חפש אירוע</Nav.Link>
              <Nav.Link href="/maps">מפות</Nav.Link>
              <Nav.Link href="/event-talk">היסטוריה בשיחה</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/event-search" element={<SearchEvent />} />
          <Route path="/maps" element={<MapsApp />} />
          <Route path="/maps/:eventId" element={<MapsApp />} />
          <Route path="/event-talk/:id" element={<EventTalk />} />
          <Route path="/event-talk" element={<EventTalk />} />
        </Routes>
      </BrowserRouter>
      <Connect />
    </div>
  );
}

export default App;

