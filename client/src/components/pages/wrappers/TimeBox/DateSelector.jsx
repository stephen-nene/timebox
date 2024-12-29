import React from "react";
import { DatePicker } from "antd";
import { format, addDays, isToday } from "date-fns";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiRefreshCw,
} from "react-icons/fi";
import dayjs from "dayjs";

/**
 * DateSelector Component
 * A visually appealing date selector with navigation buttons and reset functionality.
 * - Users can select a date via the date picker or navigate between days.
 * - Designed with time management and accessibility in mind.
 *
 * Props:
 * @param {Date} selectedDate - Currently selected date.
 * @param {Function} setSelectedDate - Callback to update the selected date.
 */
export default function DateSelector({ selectedDate, setSelectedDate }) {
  const handleDateChange = (date) => {
    setSelectedDate(date?.toDate() || new Date());
  };

  const navigateDate = (direction) => {
    setSelectedDate(addDays(selectedDate, direction));
  };

  const resetToToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-sky-800 rounded-lg shadow-md transition-colors duration-200">
      {/* Left section: Navigation Buttons */}
      <div className="flex items-center gap-3 mb-4 sm:mb-0">
        <button
          onClick={() => navigateDate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
          aria-label="Previous day"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>

        <div className="relative">
          <DatePicker
            value={dayjs(selectedDate)}
            onChange={handleDateChange}
            format="DD/MM/YYYY"
            allowClear={false}
            popupClassName="custom-popup"
            suffixIcon={
              <FiCalendar className="text-blue-500 dark:text-blue-400" />
            }
            className="w-[150px] h-10 rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:ring-blue-500 hover:border-blue-500 dark:text-white"
          />
        </div>

        <button
          onClick={() => navigateDate(1)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
          aria-label="Next day"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="flex justify-between items-center gap-2">
        {!isToday(selectedDate) && (
          <button
            onClick={resetToToday}
            className="flex items-center gap-2 px-4 py-2 ml-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-200"
            aria-label="Reset to today"
          >
            <FiRefreshCw className="w-4 h-4" />
          </button>
        )}
        {/* Right section: Date Format */}
        <div className="text-lg font-medium text-gray-800 dark:text-gray-200 flex-shrink-0">
          {/* Large Screens - Full Date */}
          <div className="hidden md:block">
            {format(selectedDate, "EEEE, MMMM do")}
          </div>
          {/* Small Screens - Shorter Date */}
          <div className="md:hidden">{format(selectedDate, "EEE, MMM do")}</div>
        </div>
      </div>
    </div>
  );
}
