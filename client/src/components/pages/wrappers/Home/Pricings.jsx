import React, { useState } from 'react';
import { FcOk, FcCancel } from "react-icons/fc";

// Updated pricing data based on financial management features
const pricingData = [
  {
    name: "Free",
    monthly: {
      price: 0.00,
      transactions: 50,
      reportGeneration: 1,
      prioritySupport: false,
      recurringTransactions: false,
      cloudStorage: "1GB"
    },
    yearly: {
      price: 0.00,
      transactions: 600,
      reportGeneration: 12,
      prioritySupport: false,
      recurringTransactions: false,
      cloudStorage: "12GB"
    }
  },
  {
    name: "Basic",
    monthly: {
      price: 9.99,
      transactions: 500,
      reportGeneration: 5,
      prioritySupport: false,
      recurringTransactions: true,
      cloudStorage: "5GB"
    },
    yearly: {
      price: 99.99,
      transactions: 6000,
      reportGeneration: 60,
      prioritySupport: false,
      recurringTransactions: true,
      cloudStorage: "60GB"
    }
  },
  {
    name: "Pro",
    monthly: {
      price: 29.99,
      transactions: 2000,
      reportGeneration: 20,
      prioritySupport: true,
      recurringTransactions: true,
      cloudStorage: "50GB"
    },
    yearly: {
      price: 299.99,
      transactions: 24000,
      reportGeneration: 240,
      prioritySupport: true,
      recurringTransactions: true,
      cloudStorage: "600GB"
    }
  }
];

export default function Pricings() {
  // State to manage the toggle (monthly or yearly)
  const [isYearly, setIsYearly] = useState(false);

  // Toggle function for switching between monthly and yearly pricing
  const togglePricing = () => {
    setIsYearly(prevState => !prevState);
  };

  return (
    <div className="font-[sans-serif]  px-4 py-8">
      <div className="max-w-5xl max-lg:max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 ">Choose a Subscription</h2>
          <p className="text-sm text-gray-500">
            Choose a plan that fits your financial needs
          </p>
        </div>

        <div className="flex mx-auto bg-white dark:bg-slate-500 rounded-full max-w-[300px] p-1 mt-6">
          <button
            onClick={togglePricing}
            className={`w-full text-sm py-2 px-4 tracking-wide rounded-full ${
              !isYearly
                ? "bg-purple-600 text-white"
                : "bg-transparent text-gray-800"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={togglePricing}
            className={`w-full text-sm py-2 px-4 tracking-wide rounded-full ${
              isYearly
                ? "bg-purple-600 text-white"
                : "bg-transparent text-gray-800"
            }`}
          >
            Yearly
          </button>
        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 max-sm:max-w-sm max-sm:mx-auto mt-12">
          {pricingData.map((plan, index) => {
            const planDetails = isYearly ? plan.yearly : plan.monthly;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-500 shadow rounded-3xl p-6 "
              >
                <h4 className="text-gray-800 text-lg mb-3">{plan.name}</h4>
                <h3 className="text-4xl font-semibold ">
                  ${planDetails.price.toFixed(2)}
                  <sub className="text-gray -500 font-medium text-sm ml-1">
                    / {isYearly ? "year" : "month"}
                  </sub>
                </h3>

                <hr className="my-6 border-gray-300" />

                <div>
                  <ul className="space-y-4">
                    <li className="flex items-center text-sm text-gr ay-500">
                      <FcOk className="text-2xl mr-3  rounded-full p-[3px]" />
                      {planDetails.transactions} Transactions
                    </li>
                    <li className="flex items-center text-sm ">
                      <FcOk className="text-2xl mr-3  rounded-full p-[3px]" />
                      {planDetails.reportGeneration} Report Generation
                    </li>
                    <li className="flex items-center text-sm ">
                      <FcOk className="text-2xl mr-3 rounded-full p-[3px]" />
                      {planDetails.prioritySupport
                        ? "Priority Support"
                        : "Standard Support"}
                    </li>
                    <li className="flex items-center text-sm">
                      <FcOk className="text-2xl mr-3  rounded-full p-[3px]" />
                      {planDetails.recurringTransactions
                        ? "Recurring Transactions"
                        : "No Recurring Transactions"}
                    </li>
                    {/* <li className="flex items-center text-sm ">
                      <FcOk className="text-2xl mr-3  rounded-full p-[3px]" />
                      {planDetails.cloudStorage} Cloud Storage
                    </li> */}
                  </ul>

                  <button
                    type="button"
                    className="w-full mt-6 px-4 py-2 text-sm tracking-wide bg-sky-600 hover:bg-sky-700 text-white rounded-xl"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
