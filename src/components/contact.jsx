// const Contact = () => {
//   return (
//     <section
//       id="contact"
//       className="flex flex-col items-center px-4 py-16 bg-black text-gray-100"
//       aria-labelledby="contact-heading"
//     >
//       {/* Heading */}
//       <header className="mb-8 text-center">
//         <h1
//           id="contact-heading"
//           className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent"
//         >
//           Contact Us
//         </h1>
//         <p className="mt-2 text-gray-400 text-sm md:text-base">
//           Get in touch with the AI Week organizing team
//         </p>
//       </header>

//       {/* Contact Card */}
//       <article
//         role="region"
//         aria-label="Contact information"
//         className="w-full max-w-xl rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg px-6 py-6 md:px-8 md:py-7"
//       >
//         {/* Email */}
//         <p className="mb-6 text-gray-300">
//           <strong className="text-gray-200">Email:</strong>{" "}
//           <a
//             href="mailto:krithomedhvnrvjiet@gmail.com"
//             className="ml-1 text-cyan-400 hover:text-cyan-300 transition-colors"
//           >
//             📧 krithomedhvnrvjiet@gmail.com
//           </a>
//         </p>

//         {/* Phone Contacts */}
//         <h2 className="text-lg font-semibold text-teal-400 mb-3">
//           Phone Contacts
//         </h2>

//         <ul className="space-y-3">
//           {[
//             ["Shruthika", "+919573288738"],
//             ["Neehar", "+918328089874"],
//             ["Chaitanya", "+919347290006"],
//             ["Bhanusree", "+919381331830"],
//           ].map(([name, phone]) => (
//             <li
//               key={phone}
//               className="flex justify-between items-center border-b border-white/10 pb-2 last:border-none"
//             >
//               <span className="font-medium text-gray-200">{name}</span>
//               <a
//                 href={`tel:${phone}`}
//                 className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
//               >
//                 {phone.replace("+91", "+91 ")}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </article>
//     </section>
//   );
// };

// export default Contact;
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
                  ["Shruthika", "+919573288738"],
                  ["Neehar", "+918328089874"],
                  ["Chaitanya", "+919347290006"],
                  ["Bhanusree", "+919381331830"],
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

          {/* RIGHT COLUMN — Faculty Coordinators */}
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {[
                {
                  name: "Dr. Sagar Yeruva",
                  role: "Head of Department",
                  img: "/public/sagarsir.jpeg",
                },
                {
                  name: "Dr. A. Kousar Nikhath",
                  role: "Faculty coordinator",
                  img: "/public/kousarmaam.jpeg",
                },
                {
                  name: "Mr. Bhupesh Deka",
                  role: "Faculty Coordinator",
                  img: "/public/bhupeshsir.jpeg",
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

                  {/* dept */}
                  <p className="text-sm text-gray-400">
                    Dept. of CSE-AIML,IOT &RAI
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
