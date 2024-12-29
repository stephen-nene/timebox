import React from "react";
import BrainDumps from "./wrappers/TimeBox/BrainDumps.jsx";
import TimeFrames from "./wrappers/TimeBox/TimeFrames.jsx";
import Priorities from "./wrappers/TimeBox/Priorities.jsx";
import DateSelector from "./wrappers/TimeBox/DateSelector.jsx";

export default function TimeBox() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());


  return (
    <div>
      <div className="">
        <DateSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <div className="">
        <BrainDumps
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <div className="">
        <Priorities
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <div className="">
        <TimeFrames
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
}
