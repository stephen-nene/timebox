import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";


export default function Teams() {
  const teamMembers = [
    {
      name: "Steve Nene",
      role: "CEO",
      img: "https://readymadeui.com/team-1.webp",
      socials: {
        facebook: "https://www.facebook.com/steven.nene",
        twitter: "https://twitter.com/stevennene",
        linkedin: "https://www.linkedin.com/in/stevenene/",
      },
    },
    // {
    //   name: "Ghost Worker 1",
    //   role: "Invisible Coder",
    //   img: "https://readymadeui.com/team-5.webp",
    //   socials: {
    //     facebook: "https://facebook.com/invisiblecoder",
    //     twitter: "https://twitter.com/invisiblecoder",
    //     linkedin: "https://linkedin.com/in/invisiblecoder",
    //   },
    // },
    // {
    //   name: "Ghost Worker 2",
    //   role: "Phantom Debugger",
    //   img: "https://readymadeui.com/team-6.webp",
    //   socials: {
    //     facebook: "https://facebook.com/phantomdebugger",
    //     twitter: "https://twitter.com/phantomdebugger",
    //     linkedin: "https://linkedin.com/in/phantomdebugger",
    //   },
    // },
    // {
    //   name: "Ghost Worker 3",
    //   role: "Stealthy Architect",
    //   img: "https://readymadeui.com/team-1.webp",
    //   socials: {
    //     facebook: "https://facebook.com/stealthyarchitect",
    //     twitter: "https://twitter.com/stealthyarchitect",
    //     linkedin: "https://linkedin.com/in/stealthyarchitect",
    //   },
    // },
    // {
    //   name: "Ghost Worker 4",
    //   role: "Silent Tester",
    //   img: "https://readymadeui.com/team-2.webp",
    //   socials: {
    //     facebook: "https://facebook.com/silenttester",
    //     twitter: "https://twitter.com/silenttester",
    //     linkedin: "https://linkedin.com/in/silenttester",
    //   },
    // },
    // {
    //   name: "Ghost Worker 5",
    //   role: "Hidden Innovator",
    //   img: "https://readymadeui.com/team-4.webp",
    //   socials: {
    //     facebook: "https://facebook.com/hiddeninnovator",
    //     twitter: "https://twitter.com/hiddeninnovator",
    //     linkedin: "https://linkedin.com/in/hiddeninnovator",
    //   },
    // },
  ];

  return (
    <div className="font-[sans-serif] flex flex-col items-center">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className=" text-4xl font-extrabold">Meet our team</h2>
        <p className=" text-sm mt-4 leading-relaxed">
          Meet our team of professionals to serve you.
        </p>
      </div>
      <div className="gap-8 text-center mt-16">
        {/* <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 text-center mt-16 max-w-5xl max-lg:max-w-3xl max-md:max-w-xl mx-auto"> */}
        {teamMembers.map((member, index) => (
          <div key={index}>
            <img
              src={member.img}
              alt={member.name}
              className="w-32 h-32 rounded-full inline-block"
            />
            <div className="py-4">
              <h4 className="text-base font-bold">{member.name}</h4>
              <p className=" text-xs mt-1">{member.role}</p>
              <div className="space-x-4 text-3xl mt-4 flex justify-center">
                {member.socials && (
                  <>
                    <Link
                      to={member.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaFacebookF className="" />
                    </Link>
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text- hover:text-black"
                    >
                      <FaXTwitter className="" />
                    </a>
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-500 hover:text-blue-600"
                    >
                      <FaLinkedinIn className="" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
