import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../assets/styles/navbar.css";

export default function Footer() {
  const darkMode = useSelector((state) => state.app.darkMode);

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { to: "/", label: "Home" },
        { to: "/about", label: "About TimeBox" },
        { to: "/contact", label: "Contact Us" },
      ],
    },
    {
      title: "Features",
      links: [
        { to: "/time-tracking", label: "Time Tracking" },
        { to: "/task-management", label: "Task Management" },
        { to: "/project-planning", label: "Project Planning" },
        { to: "/reports", label: "Reports & Analytics" },
      ],
    },
    {
      title: "Resources",
      links: [
        { to: "/blogs", label: "Blogs" },
        { to: "/faq", label: "FAQs" },
        { to: "/guides", label: "User Guides" },
      ],
    },
    {
      title: "Support",
      links: [
        { href: "tel:+1234567890", label: "+1 234 567 890" },
        { href: "mailto:support@timebox.com", label: "support@timebox.com" },
        { to: "/customer-support", label: "Customer Support" },
      ],
    },
  ];

  return (
    <footer
      className={`bg-sky-400 dark:bg-sky-950 text-gray-800 dark:text-gray-300 transition`}
    >
      <div className="container px-6 py-12 mx-auto">
        {/* Newsletter Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Subscribe to our newsletter for financial tips and updates.
          </h1>
          <div className="mt-4 sm:mt-0">
            <Link
              to="/signup"
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <p className="font-semibold text-lg">{section.title}</p>
              <ul className="mt-4 space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="hover:underline hover:text-gray-600 dark:hover:text-gray-400"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="hover:underline hover:text-gray-600 dark:hover:text-gray-400"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            {/* <img
              className="w-auto h-7"
              src="https://via.placeholder.com/150"
              alt="SpendIQue Logo"
            /> */}
            <span className="font-semibold text-lg">TimeBox</span>
          </Link>
          <p className="mt-4 sm:mt-0 text-sm">
            © {new Date().getFullYear()} Timebox. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
