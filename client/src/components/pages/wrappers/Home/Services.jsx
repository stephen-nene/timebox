import React from "react";
import {
  FcGenealogy,
  FcEngineering,
  FcSettings,
  FcWorkflow,
  FcHeatMap,
  FcTabletAndroid,
} from "react-icons/fc";

export default function Services() {
  return (
    <div className="bg-b max-w-6xl mx-auto font-[sans-serif]">
      <h2 className="text-gray-800 dark:text-[#CAD5CA] sm:text-4xl text-2xl font-extrabold text-center mb-16">
        Discover Our Exclusive Features
      </h2>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 max-md:max-w-lg mx-auto gap-12">
        <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
          <FcEngineering className="text-5xl bg-blue-100 p-2 rounded-lg shrink-0" />

          <div>
            <h3 className=" text-xl font-semibold mb-3">Customization</h3>
            <p className="text-gray-600 text-sm">
              Tailor our product to suit your needs Expand your reach with our
              global network.
            </p>
          </div>
        </div>

        <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
          <FcGenealogy className="text-5xl bg-blue-100 p-2 rounded-lg shrink-0" />

          <div>
            <h3 className=" text-xl font-semibold mb-3">Security</h3>
            <p className="text-gray-600 text-sm">
              Your data is protected by the latest security measures.
            </p>
          </div>
        </div>

        <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
          <FcWorkflow className="text-5xl bg-blue-100 p-2 rounded-lg shrink-0" />

          <div>
            <h3 className=" text-xl font-semibold mb-3">Support</h3>
            <p className="text-gray-600 text-sm">
              Tailor our product to suit your needs 24/7 customer support for
              all your inquiries.
            </p>
          </div>
        </div>

        <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
          <FcSettings className="text-5xl bg-blue-100 p-2 rounded-lg shrink-0" />

          <div>
            <h3 className=" text-xl font-semibold mb-3">Performance</h3>
            <p className="text-gray-600 text-sm">
              Experience blazing-fast performance with our product.
            </p>
          </div>
        </div>

        <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
          <FcTabletAndroid className="text-5xl bg-blue-100 p-2 rounded-lg shrink-0" />

          <div>
            <h3 className=" text-xl font-semibold mb-3">Global Reach</h3>
            <p className="text-gray-600 text-sm">
              Tailor our product to suit your needs Expand your reach with our
              global network.
            </p>
          </div>
        </div>

        <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
          <FcHeatMap className="text-5xl bg-blue-100 p-2 rounded-lg shrink-0" />

          <div>
            <h3 className=" text-xl font-semibold mb-3">Communication</h3>
            <p className="text-gray-600 text-sm">
              Tailor our product to suit your needs Seamless communication for
              your team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
