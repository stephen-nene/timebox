import React from "react";

export default function Stats() {
  const stats = [
    {
      name: "Time Saved by Users",
      stat: "10K+ Hours",
    },
    { name: "Active Monthly Users", stat: "50K+" },
    { name: "Tasks Completed Daily", stat: "150K+" },
    { name: "User Satisfaction", stat: "98%" },
  ];

  return (
    <div className=" px-4 py-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl max-sm:text-2xl font-extrabold mb-8 text-center">
          Why Choose Our Timebox Planner?
        </h2>
        <p className="text-lg mb-8 text-center">
          Join thousands of users boosting their productivity, achieving their
          goals, and taking control of their time with our powerful timeboxing
          tools.
        </p>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-5">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-500 rounded-xl border dark:border-gray-800 px-7 py-8 text-center"
            >
              <p className="text-gray -400 text-base font-semibold mb-1">
                {stat.name}
              </p>
              <h3 className="text-blue-600 text-3xl font-extrabold">
                {stat.stat}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
