import React, { useState, useEffect } from "react";
import { FaRobot, FaSyncAlt } from "react-icons/fa";

import techJokes from "../../assets/data/jokes.json"; // Local fallback JSON

export default function Pomodoro() {
  const [funMessage, setFunMessage] = useState("Fetching a joke...");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await response.json();

      setFunMessage(data.value);
    } catch (error) {
      setError(true);
      const fallbackJoke =
        techJokes.techJokes[
          Math.floor(Math.random() * techJokes.techJokes.length)
        ];
      setFunMessage(fallbackJoke);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="mt-20 md:mt-[123px] p-4">
      <div className="max-w-4xl mx-auto flex flex-col justify-center items-center">
        {/* Animated Cogwheel */}
        <div className="relative mb-8 group">
          <img
            src="https://www.svgrepo.com/show/426192/cogs-settings.svg"
            alt="Logo"
            className="h-40 group-hover:scale-110"
          />
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-logo2  text-center mb-14 dark:text-white">
          🔧 Currently Deving … 🛠️
        </h1>

        {/* Joke Display */}
        <div className="relative  mb-8 w-full max-w-2xl">
          <div className="bg-white/80 dark:bg-gray-950 backdrop-blur-sm p-6 rounded-xl shadow-lg ">
            {loading ? (
              <p className="text-center text-gray-700 dark:text-gray-200 text-lg">
                Loading...
              </p>
            ) : (
              <>
                <p className="text-center text-gray-700 dark:text-gray-200 text-lg">
                  {funMessage}
                </p>
                {error && (
                  <p className="text-center text-red-500 text-sm mt-2">
                    ⚠️ Network error! Showing a fallback joke.
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={fetchJoke}
            className="flex items-center gap-2 dark:bg-green-600 dark:hover:bg-green-700 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <FaRobot size={20} />
            Chuck Now
          </button>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 border-2 border-gray-800 text-gray-800 font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg dark:text-white dark:border-white"
          >
            <FaSyncAlt size={20} />
            Reload
          </button>
        </div>
      </div>
    </div>
  );
}
