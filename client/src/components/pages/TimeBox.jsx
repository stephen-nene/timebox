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

    // Update day task state with task data or defaults
    setDayTask({
      id: task?.id || generateUniqueId(),
      user_id: userData?.data?.id || null,
      brainDump: task?.brainDump || [],
      priorities: task?.priorities || [],
      date: formatDate(selectedDate),
      sync: task?.sync || false,
      timestamp: task?.timestamp || Date.now(),
    });

    // Only fetch timeframes if we have a task ID
    if (task?.id) {
      const frames = await getTimeFramesByDate(db, task.id);
      // Replace timeframes instead of appending to prevent duplicates
      setTimeFrame(frames || [...INITIAL_EVENTS]);
    } else {
      setTimeFrame([...INITIAL_EVENTS]);
    }
  } catch (error) {
    console.error("Error in fetchDayTaskAndTimeFrames:", error);
    // Reset to defaults on error
    setTimeFrame([...INITIAL_EVENTS]);
    setDayTask({
      id: generateUniqueId(),
      user_id: userData?.data?.id || null,
      brainDump: [],
      priorities: [],
      date: formatDate(selectedDate),
      sync: false,
      timestamp: Date.now(),
    });
  }
};

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
  return (
    <div className="min-h-screen px-[85px] py-4 bg-g ray-50 dark:bg-gr ay-900 transition-colors duration-200">
      {/* Date Selector at the top */}
      <div className="max-w -7xl mx-auto mb-6">
        <DateSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      <div className="max-w- mx-auto lg:min-h-[calc(100vh-12rem)] grid md:grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Brain Dumps and Priorities */}
        <div className="flex flex-col space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg transition-all duration-200 hover:shadow-xl">
            <BrainDumps dayTask={dayTask} setDayTask={setDayTask} />
          </div>
          
          {dayTask.brainDump.length >= 3 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg transition-all duration-200 hover:shadow-xl">
              <Priorities
                db={db}
                dayTask={dayTask}
                setDayTask={setDayTask}
                selectedDate={selectedDate}
              />
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg text-center">
              <div className="text-gray-600 dark:text-gray-300 flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Add at least 3 items to your Brain Dump to set Priorities</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Time Frames */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg transition-all duration-200 hover:shadow-xl">
          <TimeFrames
            dayTask={dayTask}
            timeFrame={timeFrame}
            setTimeFrame={setTimeFrame}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            db={db}
          />
        </div>
      </div>
    </div>
  );
}
