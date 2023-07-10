import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FcDeleteRow, FcPlus } from 'react-icons/fc';
import { message } from 'antd';
import { addBrainDump, deleteBrainDump } from '../store/actions/actions';
import '../assets/styles/BrainDump.css';

export default function BrainDump() {
  const tasks = useSelector((state) => state.brainDump.tasks);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  

  const handleAddDump = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      dispatch(addBrainDump(inputValue));
      setInputValue('');
    } else {
      message.error('Cannot add empty brain wave...');
    }
  };

  const handleDelete = (index) => {
    dispatch(deleteBrainDump(index));
  };

  return (
    <>
      <div className="dumps">
        <h2 className="name">Brain Dump</h2>
        {tasks.length > 0 ? (
          <div className="ideas">
            <ol>
              {tasks.map((task, index) => (
                <li key={index} className="task">
                  <p>{task}</p>
                  <span className="delicon" onClick={() => handleDelete(index)}>
                    <FcDeleteRow />
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <p>No tasks available.</p>
        )}

        <form onSubmit={handleAddDump} className="addtask">
          <input
            type="text"
            placeholder="Write an idea for the day..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <FcPlus onClick={handleAddDump} />
        </form>
      </div>
    </>
  );
}
