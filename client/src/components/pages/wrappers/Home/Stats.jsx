import React from "react";

export default function Stats() {
  const stats = [
    {
      name: "Money Saved by Users",
      stat: "KSH 5.4M+",
    },
    { name: "Active Monthly Users", stat: "80K+" },
    { name: "Daily Transactions Logged", stat: "100K+" },
    { name: "Reliability", stat: "99.9% Uptime" },
  ];
  return (
    <div className="bg- gray-100 px-4 py-12 font-sans">
      <div className="max-w-4xl max-sm:max-w-sm mx-auto">
        <h2 className=" text-4xl max-sm:text-2xl font-extrabold mb-8">
          Why Choose Our Spending Habit Tracker?
        </h2>
        <p className=" text-lg mb-8">
          Trusted by thousands, our tracker offers powerful insights to help you
          manage your spending effectively. See why users love us:
        </p>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-5">
          {stats.map((stat,index) => {
            return (
              <div key={index} className="bg-white dark:bg-gray-500 rounded-xl border dark:border-gray-800 px-7 py-8">
                <p className="text-gray-400 text-base font-semibold mb-1">
                  {stat.name}
                </p>
                <h3 className="text-blue-600 text-3xl font-extrabold">
                  {stat.stat}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
