import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../assets/styles/Logo.css';
import { updateDate } from '../store/actions/actions';
import {message } from "antd"

export default function Logo() {
  const currentDate = useSelector((state) => state.currentDate);
  const dispatch = useDispatch();

  const changeDate = (amount) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + amount);
    dispatch(updateDate(newDate));
  };

  const account = ()=>{
    message.info("account handle comming soon")
  }

  const formattedDate = currentDate.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    weekday: 'short'
  });

  return (
    <nav className="nav-logo sticky-top">
      <div className="logo">

        <h3 onClick={account}>Time-Box</h3>


        <p>{formattedDate}</p>
        <div className="date-navigation">
          <button onClick={() => changeDate(-1)}>Prev</button>
          <button onClick={() => dispatch(updateDate(new Date()))}>Today</button>
          <button onClick={() => changeDate(1)}>Next</button>
        </div>

      </div>
    </nav>
  );
}
