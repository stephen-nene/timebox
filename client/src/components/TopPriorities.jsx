import React, { useState } from 'react';
import '../assets/styles/TopPriorities.css';
import { message } from 'antd';

export default function TopPriorities() {
  const [edit, setEdit] = useState(false);
  const [taks, setTasks] = useState({})

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <div className="priorities">
      <h2 className="name">Top Priorities</h2>

      <div className={`top3 ${edit ? 'edit-mode' : ''}`}>
        <input type="text" readOnly={!edit} />
        <input type="text" readOnly={!edit} />
        <input type="text" readOnly={!edit} />
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
