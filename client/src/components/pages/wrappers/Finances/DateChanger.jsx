import React, { useState } from "react";
import { Input, FloatButton, message } from "antd";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


export default function DateChanger({selectedDate,setSelectedDate}) {
  const formatDate = (date) => date.toISOString().split("T")[0];

  // Format date as YYYY-MM-DD
// console.log(formatDate(selectedDate))
const changeDate = (days) => {
  // console.log("Days to Increment: ", days);

  setSelectedDate((prevDate) => {
    // console.log("Previous Date in setSelectedDate: ", formatDate(prevDate));
    
    const newDate = new Date(prevDate);  // Make a new copy of the prevDate
    newDate.setDate(newDate.getDate() + days);

    // console.log("New Date after change: ", formatDate(newDate));  // Log the new calculated date
    return newDate;
  });
};


  const isToday = () => {
    const today = new Date();
    return formatDate(selectedDate) === formatDate(today);
  };

  return (
    <div>
      {/* Date Selector */}
      <div className="flex items-center justify-center space-x-4 mb-3">
        <button
          className="text-xl text-gray-600 hover:text-blue-600"
          onClick={() => changeDate(-1)}
        >
          <FaChevronLeft />
        </button>
        <Input
          type="date"
          value={formatDate(selectedDate)}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="w-48"
        />
        <button
          className="text-xl text-gray-600 hover:text-blue-600"
          onClick={() => changeDate(1)}
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Today Button */}
      {!isToday() && (
        <div className="flex justify-center my-5">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-full"
            onClick={() => setSelectedDate(new Date())}
          >
            Today
          </button>
        </div>
      )}

      {/* Display Selected Date
      <p className="text-center text-lg text-gray-700">
        You are at{" "}
        <span className="font-bold text-blue-600">
          {formatDate(selectedDate)}
        </span>
      </p> */}
    </div>
  );
}
