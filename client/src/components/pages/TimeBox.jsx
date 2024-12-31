import React, { useEffect } from "react";
import BrainDumps from "./wrappers/TimeBox/BrainDumps.jsx";
import TimeFrames from "./wrappers/TimeBox/TimeFrames.jsx";
import Priorities from "./wrappers/TimeBox/Priorities.jsx";
import DateSelector from "./wrappers/TimeBox/DateSelector.jsx";

import {
  initializeDB,
  addTimeFrame,
  getDayTask,
  getTimeFramesByDate,
  formatDate,
} from "../../helpers/indexDb/indexedDB";
import { INITIAL_EVENTS } from "./wrappers/TimeBox/event-utils.js";


export default function TimeBox() {
  const [db, setDb] = React.useState(null); 

  const userData = JSON.parse(localStorage.getItem("userData"));
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [timeFrame, setTimeFrame] = React.useState([...INITIAL_EVENTS]);
  const [dayTask, setDayTask] = React.useState({
    id: generateUniqueId(),
    user_id: userData?.data?.id || null,
    brainDump: [],
    priorities: [],
    date: formatDate(selectedDate),
    sync: false,
    timestamp: Date.now(),
  });

  useEffect(() => {
    setDayTask((prevState) => ({
      ...prevState,
      date: formatDate(selectedDate),
      // id: generateUniqueId(),
    }));
  }, [selectedDate]);

  // console.log(timeFrame);

  // Initialize IndexedDB on mount
useEffect(() => {
  initializeDB()
    .then(setDb)
    .catch((error) => {
      console.error("Failed to initialize IndexedDB:", error);
      // Handle the error gracefully, e.g., notify the user
    });
}, []);


  useEffect(() => {
    if (db) {
      fetchDayTaskAndTimeFrames();
    }
  }, [db, selectedDate]);
 

  // console.log(dayTask);

const fetchDayTaskAndTimeFrames = async () => {
  try {
    // Fetch day task
    const task = await getDayTask(db, formatDate(selectedDate));

    // Update day task state
    setDayTask((prevState) => ({
      ...prevState,
      id: task?.id || generateUniqueId(),
      brainDump: task?.brainDump || [],
      priorities: task?.priorities || [],
      sync: task?.sync || false,
      timestamp: task?.timestamp || Date.now(),
    }));

    const taskId = task?.id ;
    if (!taskId) {
      console.error("Task ID is undefined. Cannot fetch timeframes.");
      return;
    }

    const frames = await getTimeFramesByDate(db, taskId);

    setTimeFrame((prevTimeFrames) => [...prevTimeFrames, ...frames]);
  } catch (error) {
    console.error("Error in fetchDayTaskAndTimeFrames:", error);
  }
};

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
  return (
    <div className="min-h-screen p-4">
      {/* Date Selector at the top */}
      <div className="mb-4">
        <DateSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      <div className="lg:min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Brain Dumps Section */}
        <div className="flex flex-col space-y-4">
          <div className="bg-blue-100 dark:bg-blue-800 rounded-lg p-4 shadow-lg">
            <BrainDumps dayTask={dayTask} setDayTask={setDayTask} />
          </div>
          {dayTask.brainDump.length >= 3 ? (
            <div className="bg-green-100 dark:bg-green-800 rounded-lg p-4">
              <Priorities db={db} dayTask={dayTask} setDayTask={setDayTask} />
            </div>
          ) : (
            <div className="text-red-500 text-sm mt-2">
              Add at least 3 items to your Brain Dump to proceed to Priorities.
            </div>
          )}
        </div>

        {/* Time Frames Section */}
        {dayTask.priorities.length >= 3 ? (
          <div className="bg-yellow-100 dark:bg-yellow-800 rounded-lg p-4 md:col-span-2 md:row-span-2">
            <TimeFrames
              dayTask={dayTask}
              timeFrame={timeFrame}
              setTimeFrame={setTimeFrame}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              db={db}
            />
          </div>
        ) : (
          <div className="text-red-500 text-sm lg:col-span-2 mt-4">
            {dayTask.brainDump.length >= 3 &&
              "Add at least 3 Priorities to proceed to Time Frames."}
          </div>
        )}
      </div>
    </div>
  );
}
