import React, { useState } from 'react';
import '../assets/styles/TopPriorities.css';
import { message } from 'antd';
import { useSelector } from 'react-redux';

export default function TopPriorities() {
  const [edit, setEdit] = useState(false);
  const [tasks, setTasks] = useState({})

    // Access top_priorities array from Redux store
    const topPriorities = useSelector(state => state.user.userData.user.top_priorities);
    // Assuming you have the selectedDate stored in Redux store
  const selectedDate = useSelector(state => state.currentDate);
  console.log(selectedDate)

  const filteredPriorities = topPriorities.filter(priority => priority.date === selectedDate);

  // Set filtered priorities to the tasks state
  useState(() => {
    setTasks(filteredPriorities);
  }, [filteredPriorities]);

  

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <div className="priorities">
      <h2 className="name">Top Priorities</h2>

      <div className={`top3 ${edit ? 'edit-mode' : ''}`}>
      {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <input type="text" readOnly={!edit} value={task.content} key={index} />
          ))
        ) : (
          <>
            <input type="text" readOnly={!edit} />
            <input type="text" readOnly={!edit} />
            <input type="text" readOnly={!edit} />
          </>
        )}
      </div>

      <div className="btns">
        <button
          onClick={handleEdit}
          className={`savebtn ${edit ? 'savebtn-active' : ''}`}>
          {edit ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
}
