import { Link } from "react-router-dom";
import Background3D from "./Background3D";

function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        w-full min-h-screen
        flex items-center
        pt-16
        overflow-hidden
        bg-[linear-gradient(135deg,#020909,#031818,#042323)]
      "
    >
      <Background3D />

      <div
        className="
          absolute inset-0 pointer-events-none
          bg-[radial-gradient(circle_at_30%_30%,rgba(0,120,120,0.14),transparent_45%),
          radial-gradient(circle_at_70%_70%,rgba(0,90,90,0.10),transparent_55%)]
        "
      />

      <div className="relative z-10 max-w-[900px] ml-6 md:ml-24 mr-6">
        {/* HERO TITLE – same design, forced font */}
        <h1
          className="
            font-audiowide-force
            text-white
            font-black
            leading-[1.1]
            text-[2.2rem] md:text-[clamp(2.8rem,5vw,4.2rem)]
          "
        >
          <span className="block md:inline">ENGINEERING </span>
          <span className="block md:inline">THE NEXT</span>
          <span
            className="
              block
              bg-gradient-to-r from-[#2bbec2] to-[#34d6de]
              bg-clip-text text-transparent
            "
          >
            INTELLIGENCE
          </span>
        </h1>

        <p className="mt-5 max-w-[600px] text-[#cfeeee] text-base leading-[1.65]">
          Join the brightest minds for a week of innovation, cutting-edge AI
          workshops, hackathons, and the future of human–AI collaboration.
        </p>

        <Link
          to="#events"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("events")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="
            inline-block mt-8 px-9 py-3 text-base font-bold rounded-full
            bg-gradient-to-r from-[#1f6b6e] to-[#2eabb1]
            text-[#001212]
            shadow-[0_0_22px_rgba(40,160,160,0.35)]
            transition-all duration-200
            hover:-translate-y-1
            hover:shadow-[0_0_32px_rgba(40,160,160,0.55)]
          "
        >
          View Events
        </Link>
      </div>
    </section>
  );
}

export default Hero;
