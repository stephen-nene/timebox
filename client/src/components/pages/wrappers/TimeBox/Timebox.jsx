import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { message, Select } from "antd";
// import Select from 'react-select'
import axios from 'axios';


import { FcPrevious, FcNext } from 'react-icons/fc'


import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"
import { INITIAL_EVENTS, createEventId } from './event-utils'



import * as Functions from './timeboxFunctions'

import ViewTf from "../modals/ViewTf";
import NewTf from "../modals/NewTf";



const isToday = (someDate) => {
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear();
};



export default function Timebox({ darkMode, user }) {
    const [currentDate, setCurrentDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const calendarRef = useRef(null);
    const [inputValue, setInputValue] = useState(""); // State to store the input value
    const [serverRes, setServerRes] = useState({})
    const [changesMade, setChangesMade] = useState(false);

    const [dayTask, setDayTask] = useState({
        priorities: [],
        brain_dumps: [],
        time_frames: [],
        date: currentDate,
        user_id: user?.user?.id || 1,
    });


    useEffect(() => {
        if (Object.keys(serverRes).length === 0) {
            Functions.fetchDayTasks(user.user.id, setServerRes);
        }
    }, [dayTask]);
    // console.log(serverRes)

    useEffect(() => {
        if (calendarRef.current) {
            calendarRef.current.getApi().gotoDate(currentDate);
        }

        const dayViewButton = document.querySelector('button[title="day view"]');
        if (dayViewButton) {
            dayViewButton.click();
        }


    }, [currentDate]);

    useEffect(() => {
        // Filter serverRes to get data for the current date
        const filteredData = Object.values(serverRes).filter(item => item.date === currentDate);

        // Extract priorities, brain dumps, and ID from filteredData
        const priorities = [];
        const brainDumps = [];
        const timeFrames = [];
        let taskId = null;

        filteredData.forEach(item => {
            priorities.push(...item.priorities);
            brainDumps.push(...item.brain_dumps);
            timeFrames.push(...item.time_frames)
            if (item.id) {
                taskId = item.id; // Set taskId if ID exists in the server response
            }
        });

        // Update dayTask state with extracted priorities, brain dumps, and taskId
        setDayTask(prevState => ({
            ...prevState,
            id: taskId, // Set the id of dayTask to the extracted taskId
            priorities: priorities,
            brain_dumps: brainDumps,
            time_frames: timeFrames
        }));
        setChangesMade(false);


    }, [serverRes, currentDate]);



    const options = dayTask.brain_dumps.map((dump) => ({
        label: dump,
        value: dump,
    }));


    const handleSelectChange = (selectedPriorities) => {

        setDayTask(prevState => ({
            ...prevState,
            priorities: selectedPriorities // Update priorities with the labels of the selected options
        }));
        setChangesMade(true);
    };




    const handleSaveDayTask = () => {
        const loadingMessage = message.loading('Saving day task...', 0);

        axios.post('http://127.0.0.1:3000/api/day_tasks', dayTask)
            .then(response => {
                setDayTask(response.data);
                loadingMessage();
                message.success('Day task saved');
                setChangesMade(false);
            })
            .catch(error => {
                loadingMessage();
                if (error.response && error.response.data) {
                    let errorMessage = '';

                    // Check if error.response.data contains brain_dumps array
                    if (Array.isArray(error.response.data.brain_dumps)) {
                        errorMessage += error.response.data.brain_dumps.map(error => ` ${error}`).join('\n');
                    }

                    // Check if error.response.data contains priorities array
                    if (Array.isArray(error.response.data.priorities)) {
                        errorMessage += error.response.data.priorities.map(error => ` ${error}`).join('\n');
                    }

                    if (errorMessage !== '') {
                        message.error(errorMessage);
                    } else {
                        console.error('Error saving day task:', error);
                        message.error('Failed to save day task');
                    }
                } else {
                    console.error('Error saving day task:', error);
                    message.flash('Failed to save day task');
                }
            });
    };

    // console.log(dayTask)
    const handleUdateDayTask = () => {
        const loadingMessage = message.loading('Updating day task...', 0);

        axios.put(`http://127.0.0.1:3000/api/day_tasks/${dayTask.id}`, dayTask)
            .then(response => {
                setDayTask(response.data);
                message.success('Day task updated');
                setChangesMade(false);
            })
            .catch(error => {
                console.error('Error updating day task:', error);
                message.error('Failed to update day task. Please try again.');
            })
            .finally(() => {
                loadingMessage(); // Close the loading message regardless of the outcome
            });
    };


    return (
        <>
            <DateHeader darkMode={darkMode} currentDate={currentDate} setCurrentDate={setCurrentDate} />

            <div className="p-3 flex flex-col lg:flex-row w-full gap-3 ">
                {/* date */}

                <div className="flex flex-col mb-3 w-full lg:w-1/2 gap-2 ">
                    {/*  Dumps section */}
                    <section className={`${!darkMode ? 'bg-sky-950 text-white ' : 'bg-sky-500 text-black'} rounded-lg overflow-auto p-4`}>
                        <h2 className="text-lg font-semibold mb-2">Thoughts of the day </h2>
                        <div className="flex flex-col items- center">
                            <ul className="">
                                {dayTask.brain_dumps.length === 0 ? (
                                    <li className="my-4">There is nothing to display</li>
                                ) : (
                                    dayTask.brain_dumps.map((dump, index) => (
                                        <li key={index} className="flex flex-row items-center mb-2 ">
                                            <span>{dump}</span>
                                            {(isToday(new Date(currentDate)) || new Date(currentDate) >= new Date()) &&
                                                <span
                                                    className="text-red-500 ml-3 cursor-pointer hover:opacity-50"
                                                    onClick={() => Functions.handleRemoveBrainDump(index, setDayTask, setChangesMade)}
                                                >
                                                    X
                                                </span>
                                            }
                                        </li>
                                    ))
                                )}
                            </ul>


                        </div>
                        {(isToday(new Date(currentDate)) || new Date(currentDate) >= new Date()) &&
                            <div className="">
                                <input
                                    type="text"
                                    placeholder={`Brain Dump + `}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault(); // Prevent form submission
                                            Functions.handleAddBrainDump(inputValue, setInputValue, setDayTask, setChangesMade, dayTask);
                                        }
                                    }}
                                    className="border text-black rounded-md px-3 py-2 mr-2"
                                />
                                <button onClick={() => Functions.handleAddBrainDump(inputValue, setInputValue, setDayTask, setChangesMade, dayTask)}>+ Add</button>
                            </div>
                        }
                    </section>
                    {/* Priorities section */}
                    <div className={`${!darkMode ? 'bg-sky-950 text-white' : 'bg-sky-500 text-black'} rounded-lg priorities p-4 relative`}>
                        <section className="">
                            <h2 className="text-lg font-semibold mb-2">Priorities</h2>
                            <div className="flex flex-col justify-center">
                                <Select
                                    mode="multiple"
                                    className="bg-white rounded-lg"
                                    placeholder="Select priorities ..."
                                    size="large"
                                    maxCount={3}
                                    options={options}
                                    onChange={handleSelectChange}
                                    value={dayTask.priorities}
                                    allowClear={true}
                                    disabled={!isToday(new Date(currentDate)) && new Date(currentDate) <= new Date()} // Use isToday function here
                                />

                            </div>
                        </section>
                    </div>



                    <div className="flex justify-center items-center mb-3 gap-2">
                        {changesMade && (
                            <>
                                <button onClick={handleSaveDayTask} className="bg-green-500 text-white rounded hover:bg-green-600 p-3 ">
                                    Save
                                </button>
                                <button onClick={handleUdateDayTask} className="bg-blue-500 text-white rounded hover:bg-blue-600 p-3 ">
                                    Update
                                </button>
                            </>
                        )}
                    </div>
                </div>


                {/* Timeframes section */}
                {/* {dayTask.id && ( */}
                    {/* // <p className="text-gray-500">No dumps or priorities found on this date</p> */}
                <TimeFrames darkMode={darkMode} calendarRef={calendarRef} user={user} dayTask={dayTask} />
                {/* )} */}
                


            </div>
        </>
    );
}




const DateHeader = ({ darkMode, currentDate, setCurrentDate }) => {
    const handleDate = (operator) => {
        const dateObj = new Date(currentDate);
        const adjustedTime = new Date(dateObj);
        adjustedTime.setHours(17, 0, 0, 0);
        // Adjust the date based on the operator
        operator === '-' ? adjustedTime.setDate(adjustedTime.getDate() - 1) : adjustedTime.setDate(adjustedTime.getDate() + 1);

        const newDate = adjustedTime.toISOString().split('T')[0];
        setCurrentDate(newDate);
    };



    const resetToToday = () => {
        const today = new Date();
        today.setHours(17, 0, 0, 0);
        setCurrentDate(today.toISOString().split('T')[0]);
    };


    return (
        <div className={`flex justify-between text-center p-3  items- center  `}>

            <div className={`flex items-center  shadow-md rounded-lg p-4 ${!darkMode ? 'bg-sky-950 text-white' : 'bg-sky-500 text-black'}`}>
                <button
                    onClick={() => handleDate("-")}
                    className="px-3 border border-violet-600 hover:border-rose-600 text-white rounded  hover:text-black transition duration-300">
                    <FcPrevious
                        className="cursor-pointer"
                    />
                </button>

                <input
                    type="date"
                    value={currentDate}
                    onChange={(e) => setCurrentDate(e.target.value)}
                    className="mx-2 bg-transparent outline-none border rounded p-1 focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={() => handleDate("+")}
                    className="px-3 border border-violet-600 text-white rounded hover:border-rose-600 hover:text-black transition duration-300">
                    <FcNext
                        className="cursor-pointer"
                    />
                </button>


            </div>
            <div className={`flex items-center  shadow-md rounded-lg p-4 gap-3 ${!darkMode ? 'bg-sky-950 text-white' : 'bg-sky-500 text-black'}`}>


                {!isToday(new Date(currentDate)) && (

                    <button
                        onClick={resetToToday}
                        className=" py-0.5 px-3 border border-red-500 rounded  hover:border-fuchsia-700 hover:text-fuchsia-700 transition duration-300"
                    >
                        Today
                    </button>
                )}

                <p className="mr-3">
                    {new Date(currentDate).toLocaleDateString(undefined, {
                        weekday: "long"
                    })}
                </p>
            </div>

        </div>
    )
}

const TimeFrames = ({ darkMode, calendarRef, user, dayTask }) => {


    const [isNewOpen, setIsNewOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);

    const [calendarApi, setCalendarApi] = useState()
    const [selectedEvent, setSelectedEvent] = useState()



    const handleDateClick = (arg) => {
        message.success(arg.dateStr)
        console.log(arg)
    }

    function handleDateSelect(selectInfo) {
        setIsNewOpen(true)
        setCalendarApi(selectInfo)

    }

    function handleEventClick(clickInfo) {

        setSelectedEvent(clickInfo)
        // console.log(clickInfo)
        setIsViewOpen(true)

    }

    function handleEvents(events) {
        console.log(events)
    }

    function handleEventChange(selectInfo, eventInfo) {
        Functions.updateTimeFrame(selectInfo.event.id,selectInfo.event.startStr,selectInfo.event.endStr)
        // console.log("old", selectInfo.event._def, "new", selectInfo.oldEvent._def)
        // console.log("old", selectInfo, "new", selectInfo.oldEvent.endStr)
    }


    
    const events = [...INITIAL_EVENTS, ...dayTask.time_frames];
    return (
        <>
            <section className={` ${!darkMode ? 'bg-sky-950 text-white dark' : 'bg-sky-500'}  w-full p-4 lg:w-1/2 lg:flex-grow overflow-auto h-sreen rounded-lg`}>
                <div className="calendar bg-- white p -6">
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="timeGridDay"
                        headerToolbar={
                            user.user.role === "admin" || user.user.role === "employee"
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
                        height='auto'
                        nowIndicator={true}
                        viewClassNames='bg-blue-5 00 text- white'
                    />

                    

                </div>
            </section>

            <NewTf isOpen={isNewOpen} onClose={() => setIsNewOpen(false)} calendarApi={calendarApi} dayTask={dayTask}/>
            <ViewTf isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} event={selectedEvent} />
            {/* {newTf && <NewTf newTf={newTf} setNewTf={setNewTf} />} */}
        </>
    );
}