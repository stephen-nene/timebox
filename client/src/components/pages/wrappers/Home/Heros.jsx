import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import all images
import hero6 from "../../../../assets/images/hero6.webp";
import hero7 from "../../../../assets/images/hero7.webp";
import hero8 from "../../../../assets/images/hero8.webp";
import heros10 from "../../../../assets/images/heros10.jpeg";
import heros1 from "../../../../assets/images/heros1.webp";
import heros2 from "../../../../assets/images/heros2.webp";
import heros3 from "../../../../assets/images/heros3.webp";
import heros4 from "../../../../assets/images/heros4.webp";
import heros5 from "../../../../assets/images/heros5.webp";
import heros9 from "../../../../assets/images/heros9.jpeg";
import money from "../../../../assets/images/money.webp";

const images = [
  hero6,
  hero7,
  hero8,
  heros10,
  heros1,
  heros2,
  heros3,
  heros4,
  heros5,
  heros9,
  money,
];

export default function Heros() {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    Math.floor(Math.random() * 12)
  );

  useEffect(() => {
    // Interval to change the image every 30 minutes (30 * 60 * 1000 milliseconds)
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="grid md:grid-cols-2 items-center md:gap-8 gap-6 font-[sans-serif] max-w-5xl max-md:max-w-md mx-auto">
        <div className="max-md:order-1 max-md:text-center mt-9">
          <h2 className="md:text-4xl text-3xl md:leading-10 font-extrabold text-gray-800 mb-4">
            Take Control of Your Time
          </h2>
          <p className="mt-4 text-base leading-relaxed">
            Master your daily schedule and boost productivity effortlessly. 
            Track tasks, set priorities, and manage your time effectively to 
            achieve more in less time. Perfect for busy professionals and teams.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
            <Link
              to="/register"
              className="px-6 py-3 text-base font-semibold text-white bg-sky-500 rounded-full hover:bg-opacity-80 transition-transform duration-300 transform hover:scale-105 focus:ring-2 focus:ring-sky-500 focus:outline-none focus:ring-opacity-50"
            >
              Get Started
            </Link>
            <Link
              to="/timebox"
              className="px-6 py-3 text-base font-semibold text-sky-600 border border-sky-500 rounded-full hover:text-white hover:bg-sky-500 transition-transform duration-300 transform hover:scale-105 focus:ring-2 focus:ring-sky-500 focus:outline-none focus:ring-opacity-50"
            >
              View Calendar
            </Link>
          </div>
        </div>
        <div className="md:h-[450px]">
          <img
            src={images[currentImageIndex]}
            className="w-full h-full object-contain rounded-lg"
            alt="Time Management Hero"
          />
        </div>
      </div>
    </>
  );
}
