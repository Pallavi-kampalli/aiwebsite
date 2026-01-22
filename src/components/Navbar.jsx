import {useState} from "react";

function Navbar({ hidden }) {
  // Don't render the navbar if hidden is true
  if (hidden) return null;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full h-16 px-6 flex items-center justify-between 
      bg-[rgba(5,10,10,0.9)] backdrop-blur-lg z-[1000]
      border-b border-[rgba(0,255,200,0.25)]">

      {/* Logo */}
      <div className="text-[1.4rem] font-bold cursor-pointer 
        bg-gradient-to-r from-[#206a6e] to-[#28a3a9] 
        bg-clip-text text-transparent">
        AI WEEK
      </div>

      {/* Hamburger */}
      <div
        className="relative w-[26px] h-[20px] cursor-pointer md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={`absolute h-[3px] w-full rounded 
          bg-gradient-to-r from-[#28898e] to-[#34d6de]
          transition-all duration-300
          ${menuOpen ? "top-2 rotate-45" : "top-0"}`} />
        <span className={`absolute h-[3px] w-full rounded 
          bg-gradient-to-r from-[#28898e] to-[#34d6de]
          transition-all duration-300 top-2
          ${menuOpen ? "opacity-0" : "opacity-100"}`} />
        <span className={`absolute h-[3px] w-full rounded 
          bg-gradient-to-r from-[#00ffcc] to-[#00e5ff]
          transition-all duration-300
          ${menuOpen ? "top-2 -rotate-45" : "top-4"}`} />
      </div>

      {/* Nav Links */}
      <nav
        className={`
          absolute md:static top-16 left-0 w-full md:w-auto
          bg-[rgba(5,10,10,0.97)] md:bg-transparent
          flex flex-col md:flex-row items-center
          gap-6 md:gap-7 py-8 md:py-0
          transition-all duration-300
          ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" 
                     : "opacity-0 -translate-y-5 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto"}
        `}
      >
        {["Home", "Events", "Timeline", "Contact"].map((item, i) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            className={`
              relative text-white text-sm md:text-[0.95rem]
              transition-all duration-200
              hover:text-[#1f989e] hover:-translate-y-0.5
              after:absolute after:left-0 after:-bottom-1.5
              after:h-[2px] after:w-0 after:bg-gradient-to-r 
              after:from-[#1f989e] after:to-[#26abb1]
              after:transition-all after:duration-300
              hover:after:w-full
              ${menuOpen ? "animate-fadeSlideUp" : ""}
            `}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
