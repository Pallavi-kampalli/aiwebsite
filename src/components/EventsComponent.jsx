import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  X,
  ArrowRight,
  Cpu,
  Terminal,
  Zap,
  Brain,
  Network,
  Sparkles,
} from "lucide-react";

/* -------------------- DATA -------------------- */

const eventsData = [
  {
    id: 1,
    title: "AI tools workshop",
    icon: <Brain className="w-8 h-8 text-cyan-400" />,
    teaser:
      "Kickstarting AI Week with industry leaders discussing AGI and the future of work.",
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
      setShow(false);
      document.body.style.overflow = "auto";
    }
  }, [event]);

  if (!event) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-500 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      {/* 🌫️ GLASS BACKDROP */}
      <div
        className={`absolute inset-0 backdrop-blur-xl transition-all duration-700 ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
        }`}
        style={{
          background: `
            radial-gradient(
              1200px at 20% 10%,
              rgba(34, 211, 238, 0.14),
              transparent 55%
            ),
            radial-gradient(
              1000px at 80% 85%,
              rgba(16, 185, 129, 0.16),
              transparent 60%
            ),
            rgba(0, 0, 0, 0.55)
          `,
        }}
      />

      {/* MODAL CONTENT */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`glass-panel relative z-10 w-full max-w-2xl rounded-2xl overflow-hidden transition-all duration-500 ${
          show ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              {event.icon}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {event.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={26} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-black/25 p-4 rounded-xl border border-white/10 text-gray-400 text-sm">
            <Info icon={<Calendar />} label="Date" value={event.date} />
            <Info icon={<Clock />} label="Time" value={event.time} />
            <Info icon={<MapPin />} label="Venue" value={event.venue} />
            <Info icon={<Cpu />} label="Capacity" value={event.capacity} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">
              Event Details
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {event.description}
            </p>
          </div>

          <button
            onClick={() => alert(`Registered for ${event.title}`)}
            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-800 via-emerald-700 to-cyan-800 hover:opacity-90 transition active:scale-95"
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
      {value}
    </div>
  </div>
);

/* -------------------- CARD -------------------- */

const EventCard = ({ event, onClick }) => (
  <div className="relative group h-full cursor-pointer" onClick={onClick}>
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

      <span className="mt-6 flex items-center text-sm font-semibold text-emerald-500">
        View more <ArrowRight className="ml-2 w-4 h-4" />
      </span>
    </div>
  </div>
);

/* -------------------- MAIN -------------------- */

const EventsComponent = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <section className="min-h-screen bg-[#050505] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsData.map((event, index) => (
          <div
            key={event.id}
            data-aos="fade-up"
            data-aos-delay={(index % 3) * 120}
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
