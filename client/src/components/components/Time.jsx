import React from 'react';
import '../assets/styles/Time.css';
import { message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addEvent, deleteEvent } from '../store/actions/actions';

function Time() {
  const wakeUpTime = "0500"; // Wake-up time in hours
  const sleepTime = "2100"; // Sleep time in hours

  const events = useSelector((state) => state.timeFrames.events);
  const dispatch = useDispatch();

  const handleAddEvent = () => {
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    const taskName = document.getElementById('task').value;

    if (!startTime || !endTime || !taskName) {
      message.error('Please fill in all event details');
      return;
    }

    const event = {
      startTime,
      endTime,
      taskName,
    };

    dispatch(addEvent(event));
  };

  const handleDeleteEvent = (index) => {
    dispatch(deleteEvent(index));
  };

  return (
    <div className="wholetime">
      <div className="calendar">
        <h2 className="name">Time-frames</h2>
        <p>
          Arises at: {wakeUpTime} hrs and slumbers at {sleepTime} hrs
        </p>

        <div className="timeframes">
          <table className="event-table">
            <thead>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>Task</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index} className="event">
                  <td>{event.startTime}</td>
                  <td>{event.endTime}</td>
                  <td>{event.taskName}</td>
                  <td>
                    <button 
                    onClick={() => handleDeleteEvent(index)}
                    >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="add-event">
          <div className="time">
            <label htmlFor="start-time">Start: </label>
            <input type="time" id="start-time" name="start-time" />

            <br />

            <label htmlFor="end-time">End: </label>
            <input type="time" id="end-time" name="end-time" />
          </div>

          <label htmlFor="task">Task: </label>
          <input type='text' placeholder='Enter a task here...' id="task" />
          {/* <select name="task" id="task">
            <option value=""></option>
            <option value="skydive">skydive</option>
            <option value="driving">driving</option>
            <option value="shopping">shopping</option>
            <option value="visiting">visiting</option>
          </select> */}

          <button onClick={handleAddEvent} className="addtask">
            add-event
          </button>
        </div>
      </div>
    </div>
  );
}

export default Time;
