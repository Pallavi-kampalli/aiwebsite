import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Cpu,
  Terminal,
  Zap,
  Brain,
  Network,
  Sparkles,
  ArrowLeft,
  Ticket,
} from "lucide-react";

/* -------------------- DATA -------------------- */

const eventsData = [
  // MOVED TO TOP (ID: 7)
  {
    id: 7,
    title: "All-Access Combo Pass",
    icon: <Ticket className="w-8 h-8 text-yellow-400" />,
    teaser: "Unlock the full AI Week experience at a discounted price.",
    poster: "/mainposter.png",
    description: "Why choose one when you can have it all? The All-Access Combo Pass is the ultimate ticket for the dedicated innovator. It grants you entry to all 6 events—including every workshop, the hackathon, and the ML challenge—at a significantly bundled rate. Maximize your learning, network with everyone, and don't miss a single moment of AI Week.",
    date: "All Week Access",
    time: "",
    venue: "All Venues",
    Type: "Individual / Team",
  },
  {
    id: 1,
    title: "AI tools workshop",
    icon: <Brain className="w-8 h-8 text-cyan-400" />,
    teaser:
      "Kickstarting AI Week with industry leaders discussing AGI and the future of work.",
    poster: "/krithoathon.jpeg",
    description:
      "This workshop is all about discovering the power of AI tools that are transforming industries today. Participants will get hands-on exposure to practical applications—whether it’s automating tasks, enhancing creativity, or solving real-world problems. It’s designed to be interactive, approachable, and empowering, so even beginners can walk away with confidence in using AI tools for their own projects.",
    date: "11 Feb, 2026",
    time: "10:30 AM - 01:00 PM",
    venue: "Classroom",
    Type: "Individual",
  },
  {
    id: 2,
    title: "Robotics Workshop",
    icon: <Network className="w-8 h-8 text-emerald-400" />,
    teaser: "A beginner-friendly workshop on building machines.",
    poster: "/krithoathon.jpeg",
    description: "Step into the fascinating world where hardware meets intelligence! The robotics workshop will give participants a chance to explore how machines can be programmed to think, move, and act. From basic concepts to exciting demonstrations, this session will spark curiosity about how robotics is shaping the future. It’s perfect for anyone who loves to see ideas come alive in motion.",
    date: "11 Feb, 2026",
    time: "02:00 PM - 04:40 PM",
    venue: "Lab Complex B",
    Type: "Individual",
  },
  {
    id: 3,
    title: "Startup Expo",
    icon: <Sparkles className="w-8 h-8 text-purple-400" />,
    teaser: "Explore AI-driven startups.",
    poster: "/krithoathon.jpeg",
    description: "The Startup Expo is a celebration of ideas, ambition, and entrepreneurship. Students and innovators will showcase their projects, products, and visions for the future. It’s a chance to network, exchange feedback, and get inspired by the creativity around. Whether you’re a budding entrepreneur or simply curious, this expo will leave you motivated to dream bigger.",
    date: "10 Feb, 2026",
    time: "10:00 AM - 05:00 PM",
    venue: "Atrium Hall",
    Type: "Team size()",
  },
  {
    id: 4,
    title: "ML Challenge + Data Creation",
    icon: <Terminal className="w-8 h-8 text-rose-400" />,
    teaser: "Train and compete with ML models.",
    poster: "/krithoathon.jpeg",
    description: "This challenge is where creativity meets problem-solving. Participants will dive into machine learning tasks, experimenting with synthetic data to build smarter models. It’s not just a competition—it’s a chance to learn, collaborate, and push the boundaries of what’s possible with data. The energy of teamwork and innovation will make this event a highlight.",
    date: "9-10 Feb, 2026",
    time: "10:00 AM - 05:00 PM",
    venue: "Innovation Hub",
    Type: "Team size()",
  },
  {
    id: 5,
    title: "Vibe Coding Hackathon",
    icon: <Cpu className="w-8 h-8 text-amber-400" />,
    teaser: "AI-powered coding without writing code.",
    poster: "/krithoathon.jpeg",
    description: "The hackathon is where coding meets adrenaline. Across two rounds, participants will tackle real-world problems, brainstorm solutions, and bring their ideas to life through code. It’s not just about winning—it’s about learning, collaborating, and experiencing the thrill of building something impactful under time pressure. Expect energy, teamwork, and plenty of “aha!” moments.",
    date: "12 Feb, 2026",
    time: "10:00 AM - 05:00 PM",
    venue: "Seminar Hall 1",
    Type: "Individual",
  },
  {
    id: 6,
    title: "Agentic AI + Deployment Workshop",
    icon: <Zap className="w-8 h-8 text-orange-400" />,
    teaser: "From agents to deployed apps.",
    poster: "/kritoathon.jpeg",
    description: "This workshop focuses on the cutting edge of AI—agentic systems and deployment strategies. Participants will learn how to move beyond theory, taking applications from development to real-world use. It’s a practical, future-focused session that equips attendees with skills to make their AI projects truly impactful.",
    date: "13 Feb, 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "Classroom",
    Type: "Individual",
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

  const isCombo = event.id === 7;
  
  const headerGradient = isCombo 
    ? "from-yellow-500 to-amber-600" 
    : "from-[#206a6e] to-[#28a3a9]";

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 top-1 bottom-0 bg-[#050505] text-white flex flex-col">
        <div className="sticky top-0 z-50 h-16 px-6 flex items-center justify-between bg-[#050505]/95 backdrop-blur border-b border-white/10">
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-teal-700 hover:text-teal-600 hover:bg-white/5 transition"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          
          <div className={`absolute left-1/2 -translate-x-1/2 text-[1.4rem] font-bold bg-gradient-to-r ${headerGradient} bg-clip-text text-transparent`}>
            {isCombo ? "COMBO PASS" : "AI WEEK"}
          </div>
          
          <div className="w-16" />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="w-full overflow-hidden">
            <img
              src={event.poster}
              alt={event.title}
              className="w-full max-w-[460px] md:max-w-[620px] mx-auto h-auto object-contain"
            />
          </div>
          <div className="h-10 md:h-16" />
          <div className="max-w-6xl mx-auto px-6 md:px-10 space-y-14">
            
            {!isCombo && (
              <>
                <h2 className={`text-2xl font-bold text-center gap-y-20 text-[1.4rem] cursor-pointer bg-gradient-to-r ${headerGradient} bg-clip-text text-transparent`}>
                  EVENT DETAILS
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-10 justify-items-center text-center">
                  <Info icon={<Calendar />} label="Date" value={event.date} />
                  <Info icon={<Clock />} label="Time" value={event.time} />
                  <Info icon={<MapPin />} label="Venue" value={event.venue} />
                  <Info icon={<Cpu />} label="Participation Type" value={event.Type} />
                </div>
              </>
            )}
            
            <section className="max-w-4xl mx-auto md:text-center">
              <h3 className={`text-lg text-[1.4rem] font-bold cursor-pointer bg-gradient-to-r ${headerGradient} bg-clip-text text-transparent mb-3`}>
                Description
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {event.description}
              </p>
            </section>
            
            {!isCombo && (
              <section className="max-w-4xl mx-auto md:text-center">
                <h3 className={`text-lg text-[1.4rem] font-bold cursor-pointer bg-gradient-to-r ${headerGradient} bg-clip-text text-transparent mb-3`}>
                  Speakers / POCs
                </h3>
                <p className="text-gray-400">
                  Speaker and POC information goes here.
                </p>
              </section>
            )}
            
            <div className="h-8 md:h-12" />
          </div>
        </div>
        
        {/* Sticky Button Area */}
        <div className="sticky bottom-0 w-full p-4 bg-[#050505]/90 backdrop-blur border-t border-white/10 flex justify-center">
          <button 
            className={`w-full md:w-auto md:px-16 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg ${
              isCombo 
                ? "bg-gradient-to-r from-yellow-600 to-amber-700 shadow-amber-900/20" 
                : "bg-gradient-to-r from-cyan-700 to-teal-800 shadow-cyan-900/20"
            }`}
          >
            {isCombo ? "Grab the Bundle" : "Register Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Info = ({ icon, label, value }) => {
  return (
    <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-4">
      <div className="text-teal-500 shrink-0">{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
        <p className="text-gray-200 font-medium">{value}</p>
      </div>
    </div>
  );
};

/* -------------------- CARD -------------------- */

const EventCard = ({ event, onRegister }) => {
  const isCombo = event.id === 7;

  const glowBackground = isCombo
    ? "linear-gradient(135deg, rgba(250, 204, 21, 0.2), rgba(161, 98, 7, 0.45))" 
    : "linear-gradient(135deg, rgba(44,190,194,0.18), rgba(14,59,63,0.45))";

  // Combo card always has a slight glow to stand out
  const glowOpacity = isCombo 
    ? "opacity-60 lg:opacity-80 group-hover:opacity-100" 
    : "opacity-20 group-hover:opacity-100";

  const borderColor = isCombo 
    ? "border-yellow-400/30 group-hover:border-yellow-400/60" 
    : "border-white/10 group-hover:border-[#2CBEC2]/40";
  
  const titleColor = isCombo ? "text-yellow-100" : "text-gray-100";
  
  const linkColor = isCombo 
    ? "text-yellow-400 hover:text-yellow-300" 
    : "text-emerald-400 hover:text-emerald-300";

  return (
    <div className="relative group h-full">
      {/* Glow */}
      <div
        className={`absolute inset-0 rounded-2xl blur-2xl transition-opacity duration-700 ${glowOpacity}`}
        style={{ background: glowBackground }}
      />

      {/* Card Container */}
      <div className={`glass-panel relative h-full rounded-2xl p-6 flex flex-col justify-between transition-all duration-500 bg-[rgba(8,28,30,0.75)] border group-hover:-translate-y-1 group-hover:bg-[rgba(8,34,36,0.85)] ${borderColor}`}>
        <div>
          <div className="mb-5 flex justify-between items-start">
            {event.icon}
            {isCombo && <span className="bg-yellow-500/20 text-yellow-300 text-[10px] font-bold px-2 py-1 rounded border border-yellow-500/30">BEST VALUE</span>}
          </div>
          <h3 className={`text-xl font-bold mb-3 ${titleColor}`}>
            {event.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {event.teaser}
          </p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRegister();
          }}
          className={`mt-6 inline-flex items-center text-sm font-semibold transition ${linkColor}`}
        >
          {isCombo ? "Get the Bundle" : "View more to register"}
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* -------------------- MAIN -------------------- */

const EventsComponent = ({ selectedEvent, setSelectedEvent }) => {
  
  // Separate the first event (Combo Pass) from the rest
  const featuredEvent = eventsData[0];
  const regularEvents = eventsData.slice(1);

  return (
    <section className="bg-[#050505] pt-16 pb-28 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. FEATURED SECTION (Combo Pass) */}
        {/* Centered, Scaled Up, Distinct layout */}
        <div 
          className="flex justify-center mb-16 relative z-10"
          data-aos="fade-down"
        >
          <div className="w-full max-w-md md:max-w-lg lg:scale-110 lg:hover:scale-[1.12] transition-transform duration-500">
             <EventCard
                event={featuredEvent}
                onRegister={() => setSelectedEvent(featuredEvent)}
              />
          </div>
        </div>

        {/* 2. REGULAR GRID (Events 1-6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularEvents.map((event) => {
            return (
              <div
                key={event.id}
                data-aos="fade-up"
                data-aos-once="false"
                className="h-full"
              >
                <EventCard
                  event={event}
                  onRegister={() => setSelectedEvent(event)}
                />
              </div>
            );
          })}
        </div>

      </div>

      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
};

export default EventsComponent;