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
  X,
  ExternalLink,
} from "lucide-react";

/* -------------------- CONFIGURATION -------------------- */

const COMBO_PASS_GOOGLE_FORM = "https://aspireup.ai/organization/krithomedh-vnrvjiet/event/100036";

/* -------------------- DATA -------------------- */

const eventsData = [
  // MOVED TO TOP (ID: 7)
  {
    id: 7,
    title: "All-Access Combo Pass",
    icon: <Ticket className="w-8 h-8 text-yellow-600" />,
    teaser: "Unlock the full AI Week at a discounted rate",
    poster: "/Main_poster.png",
    description: "Why choose one when you can have it all? The All-Access Combo Pass is the ultimate ticket for the dedicated innovator. It grants you entry to all 6 events—including every workshop, the hackathon, and the ML challenge—at a significantly bundled rate. Maximize your learning, network with everyone, and don't miss a single moment of AI Week.",
    date: "All Week Access",
    time: "Full Event Access",
    venue: "E Block VNRVJIET",
    Type: "Individual / Team",
    // Combo pass logic is handled separately via the Modal popup
    registrationLink: null, 
  },
  {
    id: 1,
    title: "AI tools workshop",
    icon: <Brain className="w-8 h-8 text-cyan-400" />,
    teaser: "Kickstarting AI Week with industry leaders discussing AGI and the future of work.",
    poster: "/AI_tools_workshop.jpeg",
    description: "This workshop introduces AI tools transforming industries. Participants get hands-on experience with practical applications. It’s interactive, beginner-friendly, and empowers attendees to use AI confidently.",
    date: "11th Feb, 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "E Block VNRVJIET",
    Type: "Individual",
    registrationLink: "https://aspireup.ai/organization/krithomedh-vnrvjiet/event/100045",
  },
  {
    id: 2,
    title: "Robotics Workshop",
    icon: <Network className="w-8 h-8 text-emerald-400" />,
    teaser: "A beginner-friendly workshop on building machines.",
    poster: "/Robotics_Workshop.jpeg",
    description: "Explore the world where hardware meets intelligence in this robotics workshop. Participants will learn how machines can be programmed to think, move, and act. Through hands-on concepts and demonstrations, the session sparks curiosity about the future of robotics.",
    date: "11th Feb, 2026",
    time: "02:00 PM - 04:40 PM",
    venue: "E Block VNRVJIET",
    Type: "Individual",
    registrationLink: "https://aspireup.ai/organization/krithomedh-vnrvjiet/event/100041",
  },
  {
    id: 3,
    title: "Startup Expo",
    icon: <Sparkles className="w-8 h-8 text-purple-400" />,
    teaser: "Explore AI-driven startups.",
    poster: "/StartUp_expo.jpeg",
    description: "The Startup Expo celebrates ideas, ambition, and entrepreneurship. Students and innovators showcase projects, products, and future visions. It’s a chance to network, get inspired, and fuel your entrepreneurial spirit.",
    date: "10th Feb, 2026",
    time: "10:00 AM - 05:00 PM",
    venue: "E Block VNRVJIET",
    Type: "Team size(1 - 4)",
    registrationLink: "https://aspireup.ai/organization/krithomedh-vnrvjiet/event/100042",
  },
  {
    id: 4,
    title: "ML Challenge",
    icon: <Terminal className="w-8 h-8 text-rose-400" />,
    teaser: "Train and compete with ML models.",
    poster: "/ML_challenge.jpeg",
    description: "This challenge is where creativity meets problem-solving. Participants will dive into machine learning tasks, experimenting with synthetic data to build smarter models. It’s not just a competition—it’s a chance to learn, collaborate, and push the boundaries of what’s possible with data. The energy of teamwork and innovation will make this event a highlight.",
    date: "9th-10th Feb, 2026",
    time: "10:00 AM - 05:00 PM",
    venue: "E Block VNRVJIET",
    Type: "Team size(2 - 4)",
    registrationLink: "https://aspireup.ai/organization/krithomedh-vnrvjiet/event/100044",
  },
  {
    id: 5,
    title: "Vibe Coding Hackathon",
    icon: <Cpu className="w-8 h-8 text-amber-400" />,
    teaser: "AI-powered coding without writing code.",
    poster: "/Vibe_coding.jpeg",
    description: "The hackathon combines coding with adrenaline across two intense rounds. Participants tackle real-world problems, collaborate, and build impactful solutions. High energy, teamwork, and “aha!” moments make it an exciting learning experience.",
    date: "12th Feb, 2026",
    time: "10:00 AM - 04:40 PM",
    venue: "E Block VNRVJIET",
    Type: "Team size(2 - 4)",
    registrationLink: "https://aspireup.ai/organization/krithomedh-vnrvjiet/event/100040",
  },
  {
    id: 6,
    title: "Agentic AI Workshop",
    icon: <Zap className="w-8 h-8 text-orange-400" />,
    teaser: "From agents to deployed apps.",
    poster: "/Agentic_AI_workshop.jpeg",
    description: "This workshop focuses on the cutting edge of AI—agentic systems and deployment strategies. Participants will learn how to move beyond theory, taking applications from development to real-world use. It’s a practical, future-focused session that equips attendees with skills to make their AI projects truly impactful.",
    date: "13th Feb, 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "E Block VNRVJIET",
    Type: "Individual",
    //registrationLink: "https://aspireup.ai/organization/krithomedh-vnrvjiet/event/100046",
  },
  {
    id: 8,
    title: "Synth vision Hackathon",
    icon: <Zap className="w-8 h-8 text-orange-400" />,
    teaser: "Next-gen Computer Vision challenge.",
    poster: "/Synth_Vision.jpeg",
    description: "Dive into the world of computer vision and synthetic data. Participants will work on cutting-edge visual recognition challenges. It’s a practical session that equips attendees with skills to make their AI projects truly impactful.",
    date: "9th-10th Feb, 2026",
    time: "10:00 AM - 05:00 PM",
    venue: "E Block VNRVJIET",
    Type: "Team size(2 - 4)",
    registrationLink: "https://aspireup.ai/organization/krithomedh-vnrvjiet/event/100043",
  },
];

/* -------------------- MODAL -------------------- */

const EventModal = ({ event, onClose }) => {
  const [show, setShow] = useState(false);
  const [showBundleSelection, setShowBundleSelection] = useState(false);

  useEffect(() => {
    if (event) {
      setShow(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setShowBundleSelection(false);
    }
    return () => (document.body.style.overflow = "auto");
  }, [event]);

  if (!event) return null;

  const isCombo = event.id === 7;
  const headerGradient = isCombo
    ? "from-yellow-500 to-amber-500"
    : "from-[#206a6e] to-[#28a3a9]";

  // --- RENDER CONTENT ---
  const renderActiveEventContent = () => (
    <>
      <div className="w-full overflow-hidden">
        <img
          src={event.poster}
          alt={event.title}
          className="w-full max-w-[460px] md:max-w-[620px] mx-auto h-auto object-contain"
        />
      </div>
      <div className="h-10 md:h-16" />
      <div className="max-w-6xl mx-auto px-6 md:px-10 space-y-14">

        <h2 className={`text-2xl font-bold text-center gap-y-20 text-[1.4rem] bg-gradient-to-r ${headerGradient} bg-clip-text text-transparent`}>
          EVENT DETAILS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-10 justify-items-center text-center">
          <Info icon={<Calendar />} label="Date" value={event.date} />
          <Info icon={<Clock />} label="Time" value={event.time} />
          <Info icon={<MapPin />} label="Venue" value={event.venue} />
          <Info icon={<Cpu />} label="Participation Type" value={event.Type} />
        </div>

        <section className="max-w-4xl mx-auto md:text-center">
          <h3 className={`text-lg text-[1.4rem] font-bold bg-gradient-to-r ${headerGradient} bg-clip-text text-transparent mb-3`}>
            Description
          </h3>
          <p className="text-gray-300 leading-relaxed">
            {event.description}
          </p>
        </section>

        <div className="h-8 md:h-12" />
      </div>
    </>
  );

  return (
    <>
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-200 ${show ? "opacity-100" : "opacity-0"
          }`}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-xl"
          onClick={onClose}
        />
        <div className="absolute inset-x-0 top-1 bottom-0 bg-[#050505] text-white flex flex-col">
          {/* Header */}
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

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            {renderActiveEventContent()}
          </div>

          {/* Sticky Button Logic - Displays for BOTH Combo and Single Events */}
          <div className="sticky bottom-0 w-full p-4 bg-[#050505]/90 backdrop-blur border-t border-white/10 flex justify-center">
            {isCombo ? (
              // COMBO PASS BUTTON
              <button
                onClick={() => setShowBundleSelection(true)}
                className="w-full md:w-auto md:px-16 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg bg-gradient-to-r from-yellow-600 to-amber-700 shadow-amber-900/20 text-center"
              >
                Grab the Bundle
              </button>
            ) : (
              // INDIVIDUAL EVENT BUTTON
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full md:w-auto md:px-16 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg bg-gradient-to-r from-teal-600 to-cyan-700 shadow-cyan-900/20 text-center"
              >
                Register Now
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>

        </div>
      </div>

      {/* Bundle Selection Popup (Only for Combo Pass) */}
      {showBundleSelection && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowBundleSelection(false)}
          />
          <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowBundleSelection(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
              Choose Your Pass
            </h3>

            <div className="space-y-4">
              <a
                href={COMBO_PASS_GOOGLE_FORM}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 px-6 rounded-xl bg-white/5 border border-white/10 hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg text-white">VNRVJIET Pass</span>
                  <ArrowRight className="w-5 h-5 text-yellow-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              <a
                href="https://aspireup.ai/organization/krithomedh-vnrvjiet/event/100037"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 px-6 rounded-xl bg-white/5 border border-white/10 hover:border-teal-500/50 hover:bg-teal-500/10 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg text-white">Non-VNRVJIET Pass</span>
                  <ArrowRight className="w-5 h-5 text-teal-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
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
    ? "linear-gradient(135deg, rgba(255, 221, 89, 0.45), rgba(255, 170, 20, 0.65))"
    : "linear-gradient(135deg, rgba(44,190,194,0.18), rgba(14,59,63,0.45))";

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
      {/* Background Glow */}
      <div
        className={`absolute inset-0 rounded-2xl blur-2xl transition-opacity duration-700 ${glowOpacity}`}
        style={{ background: glowBackground }}
      />

      {/* Main Card Content */}
      <div
        onClick={onRegister}
        className={`glass-panel relative h-full rounded-2xl p-6 flex flex-col justify-between transition-all duration-500 bg-[rgba(8,28,30,0.75)] border group-hover:-translate-y-1 group-hover:bg-[rgba(8,34,36,0.85)] ${borderColor} cursor-pointer`}
      >
        <div>
          <div className="mb-5 flex justify-between items-start">
            {event.icon}
            {isCombo && (
              <span className="animate-pulse bg-yellow-500/20 text-yellow-300 text-[10px] font-bold px-2 py-1 rounded border border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                BEST VALUE
              </span>
            )}
          </div>

          <h3 className={`text-xl font-bold mb-2 ${titleColor}`}>
            {event.title}
          </h3>

          {/* Pricing Display for Combo Pass */}
          {isCombo && (
            <div className="flex flex-col mb-3 space-y-1">
              <span className="text-gray-500 text-xs font-medium line-through decoration-red-500/60 decoration-2">
                Worth ₹699
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold">
                <div className="text-yellow-400 whitespace-nowrap">
                  ₹299 <span className="text-gray-400 text-[10px] font-normal uppercase">VNR</span>
                </div>
                <div className="text-gray-600">|</div>
                <div className="text-yellow-400 whitespace-nowrap">
                  ₹399 <span className="text-gray-400 text-[10px] font-normal uppercase">Non-VNR</span>
                </div>
              </div>
            </div>
          )}

          <p className="text-gray-400 text-sm leading-relaxed">
            {event.teaser}
          </p>
        </div>

        <button
          type="button"
          className={`mt-6 inline-flex items-center text-sm font-semibold transition ${linkColor}`}
        >
          {isCombo ? "Register Now" : "View Details"}
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* -------------------- MAIN -------------------- */

const EventsComponent = ({ selectedEvent, setSelectedEvent }) => {
  const featuredEvent = eventsData[0];
  const regularEvents = eventsData.slice(1);

  return (
    <section className="bg-[#050505] pt-16 pb-28 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Featured (Combo) */}
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

        {/* Regular Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularEvents.map((event, index) => {
            const isLastItem = index === regularEvents.length - 1;
            const shouldCenter = isLastItem && regularEvents.length % 3 === 1;

            return (
              <div
                key={event.id}
                data-aos="fade-up"
                data-aos-once="false"
                className={`h-full ${shouldCenter ? "lg:col-start-2" : ""}`}
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