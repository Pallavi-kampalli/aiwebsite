import { BrowserRouter } from "react-router-dom";
import { useState } from "react";   
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import EventsComponent from "./components/EventsComponent";
import JourneyTimeline from "./components/JourneyTimeline";
import Contact from "./components/contact";

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <BrowserRouter>
      {/* ✅ SINGLE navbar, controlled */}
      <Navbar hidden={!!selectedEvent} />

      {/* Hero */}
      <section id="home">
        <Hero />
      </section>

      {/* Events */}
      <section id="events">
        <EventsComponent
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      </section>

      {/* Timeline */}
      <section id="timeline">
        <JourneyTimeline />
      </section>

      {/* Contact */}
      <section id="contact">
        <Contact />
      </section>
    </BrowserRouter>
  );
}

export default App;
