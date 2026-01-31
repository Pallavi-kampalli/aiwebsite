
import { Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="
        relative overflow-hidden
        bg-[linear-gradient(180deg,#030606,#020a0a,#020c0b)]
        px-6 py-24
        text-gray-100
      "
    >
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-25%] left-[5%] w-[420px] h-[420px] bg-cyan-900/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-25%] right-[5%] w-[420px] h-[420px] bg-teal-900/20 rounded-full blur-[160px]" />
      </div>
      

      {/* Container */}
      <div className="relative bottom-15 z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <header className="mb-14">
          <h1
            className="
              text-4xl md:text-5xl font-black tracking-tight
              bg-gradient-to-r from-[#217880] to-[#30b7c4]
              bg-clip-text text-transparent
            "
          >
            Contact Us
          </h1>

          <p className="mt-3 text-gray-400 max-w-xl">
            Reach out to the AI Week organizing team for queries,
            or event support.
          </p>
        </header>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* LEFT COLUMN — Core Contacts */}
          <div className="space-y-10">
            {/* Email */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5 text-cyan-700" />
                <h2 className="text-lg font-semibold text-cyan-700">
                  Email
                </h2>
              </div>
              <a
                href="mailto:krithomedhvnrvjiet@gmail.com"
                className="
                  inline-block mt-1
                  text-gray-200
                  hover:text-cyan-500
                  transition-colors
                "
              >
                krithomedhvnrvjiet@gmail.com
              </a>
            </div>

            {/* Student Coordinators */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-5 h-5 text-teal-700" />
                <h2 className="text-lg font-semibold text-teal-700">
                  Student Coordinators
                </h2>
              </div>

              <div className="space-y-6">
                {[
                  ["Devaamsh", "+91 8106993581"],
                  ["Neehar", "+91 8328089874"],
                  ["Sahithi", "+91 8919291742"],
                  ["Gowtham", "+91 8688753022"],
                ].map(([name, phone]) => (
                  <div key={phone} className="group">
                    <p className="text-gray-200 font-medium">
                      {name}
                    </p>
                    <a
                      href={`tel:${phone}`}
                      className="
                        text-sm text-gray-400
                        group-hover:text-teal-700
                        transition-colors
                      "
                    >
                      {phone.replace("+91", "+91 ")}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — College Info + Faculty Coordinators */}
            <div className="flex items-start justify-center">
              <div className="w-full ">

                {/* COLLEGE LOGO */}
                    <div
                      className="
                        mt-10
                        flex justify-center
                        md:justify-end
                        px-4
                        lg:absolute
                        lg:-top-4
                        lg:right-0
                      "
                    >
                      <img
                        src="/vnrvjiet.png"
                        alt="VNRVJIET"
                        className="
                          h-24
                          lg:h-24
                          object-contain
                          opacity-90
                        "
                      />
                    </div>
                <div className="py-10" />
                {/* FACULTY COORDINATORS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-6">
                  {[
                    {
                      name: "Dr. Sagar Yeruva",
                      role: "Head of Department",
                      img: "/sagarsir.jpeg",
                    },
                    {
                      name: "Dr. A. Kousar Nikhath",
                      role: "Faculty Coordinator",
                      img: "/kousarmaam.jpeg",
                    },
                    {
                      name: "Mr. Bhupesh Deka",
                      role: "Faculty Coordinator",
                      img: "/bhupeshsir.jpg",
                    },
                  ].map((faculty) => (
                    <div
                      key={faculty.name}
                      className="flex flex-col items-center text-center"
                    >
                      {/* Image */}
                      <div
                        className="
                          w-40 h-40
                          rounded-full
                          overflow-hidden
                          bg-[#041414]
                          shadow-[0_0_60px_rgba(48,183,196,0.18)]
                        "
                      >
                        <img
                          src={faculty.img}
                          alt={faculty.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Name */}
                      <p className="mt-4 text-gray-200 font-semibold">
                        {faculty.name}
                      </p>

                      {/* Designation */}
                      <p className="text-sm text-gray-400">
                        {faculty.role}
                      </p>

                      {/* Dept */}
                      <p className="text-sm text-gray-400">
                        Dept. of CSE- (AIML & IoT), R&AI
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>


        </div>
      </div>
    </section>
  );
};

export default Contact;
