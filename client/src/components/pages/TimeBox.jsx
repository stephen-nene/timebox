import React from "react";
import BrainDumps from "./wrappers/TimeBox/BrainDumps.jsx";
import TimeFrames from "./wrappers/TimeBox/TimeFrames.jsx";
import Priorities from "./wrappers/TimeBox/Priorities.jsx";
import DateSelector from "./wrappers/TimeBox/DateSelector.jsx";

export default function TimeBox() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  return (
    <div className="min-h-s creen  p-4">
      {/* Date Selector at the top */}
      <div className="mb-4">
        <DateSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="flex flex-col space-y-4">
          <div className="bg-blue-100 dark:bg-blue-800 rounded-lg p-4 shadow-lg">
            <BrainDumps
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
          <div className="bg-green-100 dark:bg-green-800 rounded-lg p-4">
            <Priorities
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        </div>

        <div className="bg-yellow-100 dark:bg-yellow-800 rounded-lg p-4 md:col-span-2 md:row- span-2">
          <TimeFrames
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
      </div>
    </div>
  );
}
