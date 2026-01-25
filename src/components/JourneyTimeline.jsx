import { useEffect, useRef } from "react";

const EVENTS = [
  {
    id: "0",
    title: "Inauguration",
    startTime: "09:30 AM",
    endTime: "01:30 PM",
    date: "Feb 9, 2026",
    location: "Main Auditorium",
    category: "Ceremony",
    description: "AI Week kicks off with an inspiring inauguration ceremony that sets the tone for five days of innovation and collaboration. It’s not just about speeches—it’s about bringing together curious minds, passionate learners, and visionary leaders under one roof. The atmosphere will be filled with excitement as students, faculty, and guests unite to celebrate the beginning of a journey into the world of artificial intelligence.",
  },
  {
    id: "1",
    title: "AI Tools Workshop",
    startTime: "10:30 AM",
    endTime: "01:00 PM",
    date: "Feb 9, 2026",
    location: "TBD",
    category: "Workshops",
  },
  {
    id: "2",
    title: "Robotics Workshop",
    startTime: "02:00 PM",
    endTime: "04:40 PM",
    date: "Feb 9, 2026",
    location: "TBD",
    category: "Workshops",
  },
  {
    id: "3",
    title: "Startup Expo",
    startTime: "10:00 AM",
    endTime: "05:00 PM",
    date: "Feb 10, 2026",
    location: "TBD",
    category: "Contests",
  },
  {
    id: "4",
    title: "ML Challenge + Data Creation",
    startTime: "10:00 AM",
    endTime: "05:00 PM",
    date: "Feb 10, 2026",
    location: "TBD",
    category: "Contests",
  },
  {
    id: "5",
    title: "Vibe Coding Hackathon",
    startTime: "10:00 AM",
    endTime: "05:00 PM",
    date: "Feb 12, 2026",
    location: "TBD",
    category: "Hackathons",
  },
  {
    id: "6",
    title: "Agentic-AI & Deployment Workshop",
    startTime: "09:00 AM",
    endTime: "01:00 PM",
    date: "Feb 13, 2026",
    location: "Innovation Hub",
    category: "Workshops",
  },
  {
    id: "7",
    title: "Closing Ceremony",
    startTime: "02:00 PM",
    endTime: "05:00 PM",
    date: "Feb 13, 2026",
    location: "Main Auditorium",
    category: "Ceremony",
    description: "AI Week concludes with a heartfelt closing ceremony that celebrates the journey of learning, collaboration, and innovation. Certificates will be distributed to recognize participation and achievement, but more importantly, it’s a moment to reflect on the experiences shared and the friendships built. The week may end here, but the inspiration will carry forward",
  },
];

export default function JourneyTimeline() {
  const sectionRef = useRef(null);
  const desktopLineRef = useRef(null);
  const mobileLineRef = useRef(null);
  
  // Refs to store dot elements for direct DOM manipulation
  const desktopDotsRef = useRef([]);
  const mobileDotsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;

      // Calculate progress (0 to 1)
      const progress = Math.min(
        Math.max(-rect.top / scrollable, 0),
        1
      );

      // Update Line Height
      if (desktopLineRef.current) {
        desktopLineRef.current.style.transform = `scaleY(${progress})`;
      }
      if (mobileLineRef.current) {
        mobileLineRef.current.style.transform = `scaleY(${progress})`;
      }

      // --- LOGIC TO GLOW DOTS ---
      // Get the active line element (desktop or mobile)
      const lineEl = desktopLineRef.current || mobileLineRef.current;
      if (!lineEl) return;

      // Calculate the exact visual position of the line's tip.
      // We use offsetHeight (unscaled full height) * progress + top position.
      const lineRect = lineEl.getBoundingClientRect();
      const lineTipY = lineRect.top + (lineEl.offsetHeight * progress);

      // Helper to toggle classes
      const updateDot = (dot) => {
        if (!dot) return;
        
        // Get dot's position relative to viewport
        const dotTop = dot.getBoundingClientRect().top;

        // Activate if the line tip has reached the dot (with a 10px buffer for "instant" feel)
        if (lineTipY >= dotTop - 10) {
          // ACTIVE STATE: Bright Cyan & Glow
          dot.classList.remove("bg-teal-900", "border-teal-700");
          dot.classList.add("bg-cyan-400", "shadow-[0_0_15px_rgba(34,211,238,0.8)]", "scale-125");
        } else {
          // INACTIVE STATE: Dark Teal & Dim
          dot.classList.add("bg-teal-900", "border-teal-700");
          dot.classList.remove("bg-cyan-400", "shadow-[0_0_15px_rgba(34,211,238,0.8)]", "scale-125");
        }
      };

      // Update all desktop dots
      desktopDotsRef.current.forEach(updateDot);
      // Update all mobile dots
      mobileDotsRef.current.forEach(updateDot);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Trigger once on mount to set initial state
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden
        text-white py-20 px-4
        bg-[linear-gradient(180deg,#040909,#030707)]
      "
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
          THE{" "}
          <span className="bg-gradient-to-r from-[#217880] to-[#30b7c4] bg-clip-text text-transparent">
            JOURNEY
          </span>
        </h1>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Explore the key events that shape AI WEEK 2026
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* DESKTOP BASE LINE */}
        <div
          className="
            absolute left-1/2 top-0 h-full w-[2px]
            bg-gradient-to-b from-cyan-900/40 to-teal-900/40
            -translate-x-1/2
            opacity-0 md:opacity-100
          "
        />

        {/* DESKTOP ACTIVE LINE */}
        <div
          ref={desktopLineRef}
          className="
            absolute left-1/2 top-0 h-full w-[2px]
            bg-gradient-to-b from-cyan-400 to-teal-400
            -translate-x-1/2
            origin-top
            will-change-transform
            shadow-[0_0_10px_rgba(45,212,191,0.6)]
            opacity-0 md:opacity-100
          "
          style={{ transform: "scaleY(0)" }}
        />

        {/* MOBILE BASE LINE */}
        <div
          className="
            absolute left-4 top-0 h-full w-[2px]
            bg-gradient-to-b from-cyan-900/40 to-teal-900/40
            md:opacity-0
          "
        />

        {/* MOBILE ACTIVE LINE */}
        <div
          ref={mobileLineRef}
          className="
            absolute left-4 top-0 h-full w-[2px]
            bg-gradient-to-b from-cyan-400 to-teal-400
            origin-top
            will-change-transform
            shadow-[0_0_8px_rgba(45,212,191,0.6)]
            md:opacity-0
          "
          style={{ transform: "scaleY(0)" }}
        />

        <div className="space-y-16">
          {EVENTS.map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={event.id}
                className={`relative flex md:flex-row ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Mobile Dot */}
                <span 
                  ref={el => mobileDotsRef.current[index] = el}
                  className="md:hidden absolute left-[10px] top-8 h-3 w-3 rounded-full border border-teal-700 bg-teal-900 transition-all duration-300" 
                />

                <div className="md:w-1/2 w-full pl-10 pr-4 md:px-4 relative">
                  {/* Desktop Dot */}
                  <span
                    ref={el => desktopDotsRef.current[index] = el}
                    className={`hidden md:block absolute top-8 h-4 w-4 rounded-full
                      border border-teal-700 bg-teal-900 transition-all duration-300
                      ${isLeft ? "-right-2" : "-left-2"}`}
                  />

                  <div className="bg-gradient-to-br from-gray-900 to-black border border-teal-500/30 rounded-xl p-6 shadow-lg hover:shadow-cyan-500/20 transition">
                    <span className="text-xs text-teal-600 font-semibold">
                      {event.date} • {event.startTime} – {event.endTime}
                    </span>

                    <h3 className="text-xl font-bold mt-2 text-teal-500">
                      {event.title}
                    </h3>

                    <p className="text-gray-500 mt-3 text-sm">
                      📍 {event.location}
                    </p>

                    {event.description && (
                      <p className="text-gray-400 mt-3 text-sm leading-relaxed border-t border-teal-500/10 pt-3">
                        {event.description}
                      </p>
                    )}

                    <span className="inline-block mt-5 text-xs px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-400/30">
                      {event.category}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}