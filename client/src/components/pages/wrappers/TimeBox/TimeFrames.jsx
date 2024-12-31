import React, { useState, useEffect } from "react";
import { Modal } from "antd";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import NewTf from "../../../modals/NewTf";
import ViewTf from "../../../modals/ViewTf";

export default function TimeFrames({
  dayTask,
  timeFrame,
  setTimeFrame,
  selectedDate,
  setSelectedDate,
  db,
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
      <TimeFrame
        calendarRef={calendarRef}
        timeFrame={timeFrame}
        setTimeFrame={setTimeFrame}
        dayTask={dayTask}
        db={db}
      />
      {/* <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
        Manage your time effectively and stay on top of your tasks!
      </p> */}
    </div>
  );
}

const TimeFrame = ({ calendarRef, timeFrame, setTimeFrame, dayTask, db }) => {
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const [calendarApi, setCalendarApi] = useState();
  const [selectedEvent, setSelectedEvent] = useState();

  const userData = JSON.parse(localStorage.getItem("userData"));

  function handleDateSelect(selectInfo) {
    console.log(selectInfo);
    setCalendarApi(selectInfo);
    setIsNewOpen(true);
  }

  function handleEventClick(clickInfo, eventInfo) {
    clickInfo.jsEvent.preventDefault();

    setSelectedEvent(clickInfo);

    if (clickInfo.event.url) {
      Modal.confirm({
        title: "Open Link or View Event?",
        content: "Would you like to open the event's link or view its details?",
        okText: "Open Link",
        cancelText: "View Details",
        onOk: () => {
          window.open(clickInfo.event.url, "_blank");
        },
        onCancel: () => {
          setIsViewOpen(true);
          console.log("Event Info:", clickInfo);
        },
      });
    } else {
      setIsViewOpen(true);
      console.log("Event Info:", clickInfo);
    }
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
              // userData?.data?.role === "user"
              !userData
                ? {
                    // center: "prev,today,next",
                    left: "title",
                    right: "dayGridYear,dayGridMonth,timeGridWeek,timeGridDay",
                  }
                : false
            }
            select={handleDateSelect}
            events={timeFrame}
            selectable={true}
            eventClick={handleEventClick}
            eventChange={handleEventChange}
            eventMouseEnter={function (info) {
              // console.log("eventMouseEnter", info);
              const eventElement = info.el; // The event's DOM element
              if (eventElement) {
                eventElement.style.cursor = "pointer"; // Set cursor to pointer
              }
            }}
            eventMouseLeave={function (info) {
              // console.log("eventMouseLeave", info);
              const eventElement = info.el; // The event's DOM element
              if (eventElement) {
                eventElement.style.cursor = "default"; // Reset cursor to default
              }
            }}
            // eventOverlap={!false}
            eventResize={function (info) {
              alert(
                info.event.title + " end is now " + info.event.end.toISOString()
              );

              if (!confirm("is this okay?")) {
                info.revert();
              }
            }}
            editable={true}
            height="auto"
            nowIndicator={true}
            viewClassNames="bg-blue-5 00 text- white"
            // nextDayThreshold="00:00:00" // Ensure events spanning midnight are handled
          />
        </div>
      </section>
      {isNewOpen && (
        <NewTf
          isOpen={isNewOpen}
          onClose={() => setIsNewOpen(false)}
          calendarApi={calendarApi}
          dayTask={dayTask}
          setTimeFrame={setTimeFrame}
          db={db}
        />
      )}
      {/* isOpen, onClose, event, setEventData, db, */}
      {isViewOpen && (
        <ViewTf
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          event={selectedEvent}
          setTimeFrame={setTimeFrame}
          db={db}
        />
      )}
      {/* {newTf && <NewTf newTf={newTf} setNewTf={setNewTf} />} */}
    </>
  );
};
