const EVENTS = [
  {
    id: "0",
    title: "Inauguration",
    startTime: "09:30 AM",
    endTime: "01:30 PM",
    date: "Feb 9, 2026",
    location: "Main Auditorium",
    category: "Ceremony",
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
  },
];

export default function JourneyTimeline() {
  return (
  <section className="
  relative  overflow-hidden
  text-white py-20 px-4
  bg-[linear-gradient(180deg,#040909,#030707)]
">



      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
          THE <span className="bg-gradient-to-r from-[#217880] to-[#30b7c4] bg-clip-text text-transparent">
  JOURNEY
</span>

        </h1>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Explore the key events that shape AI WEEK 2026
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative max-w-6xl mx-auto">
        {/* Desktop Center Line */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-800 to-teal-700 -translate-x-1/2" />

        {/* Mobile Left Line */}
        <div className="md:hidden absolute left-4 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-800 to-teal-700" />

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
                <span className="md:hidden absolute left-[10px] top-8 h-3 w-3 rounded-full bg-teal-700 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />

                <div className="md:w-1/2 pl-10 md:px-4 relative">
                  {/* Desktop Dot */}
                  <span
                    className={`hidden md:block absolute top-8 h-4 w-4 rounded-full bg-teal-500 shadow-[0_0_12px_rgba(34,211,238,0.9)]
                    ${isLeft ? "-right-2" : "-left-2"}`}
                  />

                  {/* Card */}
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-teal-500/30 rounded-xl p-6 shadow-lg hover:shadow-cyan-500/20 transition">
                    <span className="text-xs text-teal-600 font-semibold">
                      {event.date} • {event.startTime} – {event.endTime}
                    </span>

                    <h3 className="text-xl font-bold mt-2 text-teal-500">
                      {event.title}
                    </h3>
                    <div className="mt-4 text-sm">
                      
                      <p className="text-gray-500 mt-1">
                        📍 {event.location}
                      </p>
                    </div>

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
