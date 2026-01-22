import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Home,
  ArrowRight,
  Cpu,
  Terminal,
  Zap,
  Brain,
  Network,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

/* -------------------- DATA -------------------- */

const eventsData = [
  {
    id: 1,
    title: "AI tools workshop",
    icon: <Brain className="w-8 h-8 text-cyan-400" />,
    teaser:
      "Kickstarting AI Week with industry leaders discussing AGI and the future of work.",
      poster: "/kritoathon.jpeg",
    description:
      "Join us for an electrifying opening ceremony discussing the transition from Narrow AI to AGI.",
    date: "9th Feb, 2026",
    time: "10:30 AM - 01:00 PM",
    venue: "Classroom",
    capacity: "120 Seats",
  },
  {
    id: 2,
    title: "Robotics Workshop",
    icon: <Network className="w-8 h-8 text-emerald-400" />,
    teaser: "A beginner-friendly workshop on building machines.",
    poster: "/kritoathon.jpeg",
    description: "Hands-on robotics workshop for beginners.",
    date: "9th Feb, 2026",
    time: "02:00 PM - 04:40 PM",
    venue: "Lab Complex B",
    capacity: "50 Seats",
  },
  {
    id: 3,
    title: "Startup Expo",
    icon: <Sparkles className="w-8 h-8 text-purple-400" />,
    teaser: "Explore AI-driven startups.",
    poster: "/kritoathon.jpeg",
    description: "A showcase of innovative startups judged by experts.",
    date: "10th Feb, 2026",
    time: "10:00 AM - 05:00 PM",
    venue: "Atrium Hall",
    capacity: "Open for all",
  },
  {
    id: 4,
    title: "ML Challenge + Data Creation",
    icon: <Terminal className="w-8 h-8 text-rose-400" />,
    teaser: "Train and compete with ML models.",
    poster: "/kritoathon.jpeg",
    description: "Develop models using provided datasets and compete.",
    date: "11th Feb, 2026",
    time: "10:00 AM - 05:00 PM",
    venue: "Innovation Hub",
    capacity: "20 Teams",
  },
  {
    id: 5,
    title: "Vibe Coding Hackathon",
    icon: <Cpu className="w-8 h-8 text-amber-400" />,
    teaser: "AI-powered coding without writing code.",
    poster: "/kritoathon.jpeg",
    description: "Build applications using modern AI tools.",
    date: "12th Feb, 2026",
    time: "10:00 AM - 05:00 PM",
    venue: "Seminar Hall 1",
    capacity: "100 Seats",
  },
  {
    id: 6,
    title: "Agentic AI + Deployment Workshop",
    icon: <Zap className="w-8 h-8 text-orange-400" />,
    teaser: "From agents to deployed apps.",
    poster: "/kritoathon.jpeg",
    description: "Build, deploy, and scale agentic AI applications.",
    date: "13th Feb, 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "Classroom",
    capacity: "120 Seats",
  },
];

/* -------------------- MODAL -------------------- */

const EventModal = ({ event, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (event) {
      setShow(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [event]);

  if (!event) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
       className="absolute inset-x-0 top-1 bottom-0 bg-[#050505] text-white flex flex-col"
      >

        {/* Universal Top Bar */}
          <div className="sticky top-0 z-50 h-16 px-6
                          flex items-center justify-between
                          bg-[#050505]/95 backdrop-blur
                          border-b border-white/10">

            {/* Back */}
            <button
              onClick={onClose}
              aria-label="Go to home"
              className="
                p-2 rounded-lg
                text-teal-700
                hover:text-teal-600
                hover:bg-white/5
                transition
              "
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>

            {/* Center Logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              {/* Logo */}
              <div className="text-[1.4rem] font-bold cursor-pointer 
                bg-gradient-to-r from-[#206a6e] to-[#28a3a9] 
                bg-clip-text text-transparent">
              AI WEEK
              </div>
            </div>

            {/* Right Spacer (keeps center truly centered) */}
            <div className="w-16" />
          </div>


        {/* CONTENT */}
        <div className="flex-1 overflow-hidden">
          {/* Desktop Layout */}
          <div className="hidden md:grid grid-rows-[auto_1fr] h-full">
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-6 p-8 border-b border-white/10">
              {/* Poster */}
              <div className="rounded-2xl bg-gradient-to-br from-cyan-900/40 to-emerald-900/30 flex items-center justify-center text-gray-400 text-sm">
                <img
                  src={event.poster}
                  alt={event.title}
                  className="w-full h-full object-contain"
                />
              </div>


              {/* Details */}
              <div>
                <h2 className="text-3xl font-bold mb-6">{event.title}</h2>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                  <Info icon={<Calendar />} label="Date" value={event.date} />
                  <Info icon={<Clock />} label="Time" value={event.time} />
                  <Info icon={<MapPin />} label="Venue" value={event.venue} />
                  <Info icon={<Cpu />} label="Capacity" value={event.capacity} />

                <section>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                  Event Description
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {event.description}
                </p>
                </section>

              <section>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                  Speakers / POCs
                </h3>
                <p className="text-gray-400">
                  Speaker and POC information goes here.
                </p>
              </section>
                </div>
              </div>
            </div>

            
          </div>

          {/* Mobile Layout */}
        <div className="md:hidden w-full h-[calc(100dvh-8rem)] overflow-y-auto pb-32">
  {/* Poster */}
  <div className="w-full overflow-hidden">
    <img
      src={event.poster}
      alt={event.title}
      className="w-full h-auto object-contain"
    />
  </div>

  {/* Content */}
  <div className="p-6 space-y-6">
    <h2 className="text-2xl font-bold">{event.title}</h2>

    <div className="grid grid-cols-1 gap-4 text-sm text-gray-300">
      <Info icon={<Calendar />} label="Date" value={event.date} />
      <Info icon={<Clock />} label="Time" value={event.time} />
      <Info icon={<MapPin />} label="Venue" value={event.venue} />
      <Info icon={<Cpu />} label="Capacity" value={event.capacity} />
    </div>

    <section>
      <h3 className="text-lg font-semibold text-cyan-400 mb-2">
        Event Description
      </h3>
      <p className="text-gray-300 leading-relaxed">
        {event.description}
      </p>
    </section>

    <section>
      <h3 className="text-lg font-semibold text-cyan-400 mb-2">
        Speakers / POCs
      </h3>
      <p className="text-gray-400">
        Speaker and POC information goes here.
      </p>
    </section>
  </div>
</div>

        </div>

        {/* Sticky Register Bar */}
        <div className="sticky bottom-0 w-full p-4 bg-[#050505]/90 backdrop-blur border-t border-white/10">
          <button
            onClick={() => alert(`Registered for ${event.title}`)}
            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-700 to-teal-800 hover:opacity-90 transition"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

const Info = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-emerald-500 mt-0.5">{icon}</div>
    <div>
      <p className="text-xs uppercase text-gray-500">{label}</p>
      <p className="text-gray-300">{value}</p> {/* ✅ wrapped */}
    </div>
  </div>
);


/* -------------------- CARD -------------------- */

const EventCard = ({ event, onClick }) => (
  <div className="relative group h-full">
    <div
      className="absolute inset-0 rounded-2xl blur-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-700"
      style={{
        background:
          "linear-gradient(135deg, rgba(44,190,194,0.18), rgba(14,59,63,0.45))",
      }}
    />

    <div className="glass-panel relative h-full rounded-2xl p-6 flex flex-col justify-between transition-all duration-500 bg-[rgba(8,28,30,0.75)] border border-white/10 group-hover:-translate-y-1 group-hover:bg-[rgba(8,34,36,0.85)] group-hover:border-[#2CBEC2]/40 active:scale-[0.98]">
      <div>
        <div className="mb-5">{event.icon}</div>
        <h3 className="text-xl font-bold text-gray-100 mb-3">
          {event.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {event.teaser}
        </p>
      </div>

      <button
  onClick={onClick}
  className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-400
             hover:text-emerald-300 transition-all duration-300
             group-hover:translate-x-1"
>
  View more to register<ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
</button>
    </div>
  </div>
);

/* -------------------- MAIN -------------------- */

const EventsComponent = ({ selectedEvent, setSelectedEvent }) => {
  return (
    <section className="min-h-screen bg-[#050505] py-16 px-4 md:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsData.map((event, index) => (
          <div
            key={event.id}
            data-aos="fade-up"
            data-aos-delay={(index % 3) * 120}
            className="h-full"
          >
            <EventCard
              event={event}
              onClick={() => setSelectedEvent(event)}
            />
          </div>
        ))}
      </div>

      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
};


export default EventsComponent;
