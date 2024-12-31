import React, { useState, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";

import  NewTf  from "../../../modals/NewTf";
import  ViewTf  from '../../../modals/ViewTf'

export default function TimeFrames({
  timeFrame,
  setTimeFrame,
  selectedDate,
  setSelectedDate,
}) {
  const calendarRef = React.useRef(null);
  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(selectedDate);
    }
    // console.log(selectedDate, calendarRef);
    const dayViewButton = document.querySelector('button[title="day view"]');
    if (dayViewButton) {
      dayViewButton.click();
    }
  }, [selectedDate]);
  
  return (
    <div className="p-6 ">
      <h2 className="text-3xl font-bold text-left text-gray-800 dark:text-white mb-4">
        ⏰ Time Frames
      </h2>
      <TimeFrame calendarRef={calendarRef} timeFrame={timeFrame} />
      {/* <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
        Manage your time effectively and stay on top of your tasks!
      </p> */}
    </div>
  );
}

const TimeFrame = ({ calendarRef, timeFrame }) => {
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const [calendarApi, setCalendarApi] = useState();
  const [selectedEvent, setSelectedEvent] = useState();

  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleDateClick = (arg) => {
    message.success(arg.dateStr);
    console.log(arg);
  };

  function handleDateSelect(selectInfo) {
    console.log(selectInfo)
    setIsNewOpen(true);
    setCalendarApi(selectInfo);
  }

  function handleEventClick(clickInfo) {
    setSelectedEvent(clickInfo);
    console.log(clickInfo);
    setIsViewOpen(true);
  }

  function handleEvents(events) {
    console.log(events);
  }

  function handleEventChange(selectInfo, eventInfo) {
    Functions.updateTimeFrame(
      selectInfo.event.id,
      selectInfo.event.startStr,
      selectInfo.event.endStr
    );
    // console.log("old", selectInfo.event._def, "new", selectInfo.oldEvent._def)
    // console.log("old", selectInfo, "new", selectInfo.oldEvent.endStr)
  }

  const events = [...INITIAL_EVENTS, ...timeFrame];
  return (
    <>
      <section
        className="dark:bg-s ky-950 text- black whit e dark bg-sky -500
          w-full p-4 lg:w-1/1 lg:flex-grow overflow-auto  rounded-lg"
      >
        <div className="calendar bg-- white p -6">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            headerToolbar={
              userData?.data?.role === "user"
                ? {
                    // center: "prev,today,next",
                    left: "title",
                    right: "dayGridYear,dayGridMonth,timeGridWeek,timeGridDay",
                  }
                : false
            }
            select={handleDateSelect}
            // events={INITIAL_EVENTS}
            events={events}
            // dateClick={handleDateClick}
            selectable={true}
            eventClick={handleEventClick}
            // eventsSet={handleEvents}
            eventChange={handleEventChange}
            editable={true}
            height="auto"
            nowIndicator={true}
            viewClassNames="bg-blue-5 00 text- white"
          />
        </div>
      </section>

      <NewTf
        isOpen={isNewOpen}
        onClose={() => setIsNewOpen(false)}
        calendarApi={calendarApi}
        timeFrame={timeFrame}
      />
      <ViewTf
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        event={selectedEvent}
      />
      {/* {newTf && <NewTf newTf={newTf} setNewTf={setNewTf} />} */}
    </>
  );
};
