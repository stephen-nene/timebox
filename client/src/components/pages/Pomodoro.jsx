import React, { useState, useEffect } from "react";
import { Button } from "antd";
import {
  FaPlay,
  FaPause,
  FaRedo,
  FaClock,
  FaCoffee,
  FaBed,
} from "react-icons/fa";

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("study");

  const modes = {
    study: { time: 25, label: "Study Time", icon: <FaClock /> },
    shortBreak: { time: 5, label: "Short Break", icon: <FaCoffee /> },
    longBreak: { time: 15, label: "Long Break", icon: <FaBed /> },
  };

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            clearInterval(interval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const resetTimer = (newMode) => {
    setMode(newMode);
    setMinutes(modes[newMode].time);
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div className="min-h-scree flex items-center justify-center ">
      <div className=" p-8 rounded-2xl bg-gray-800 border-2 border-green-500">
        <h1 className="text-3xl text-green-500 text-center mb-8 font-mono">
          Pomodoro Timer
        </h1>

        <div className="text-7xl text-gray-100 text-center font-mono mb-8">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <Button
            type="primary"
            className="bg-green-500 hover:bg-green-600"
            size="large"
            onClick={() => setIsActive(!isActive)}
            icon={isActive ? <FaPause /> : <FaPlay />}
          >
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button
            size="large"
            onClick={() => resetTimer(mode)}
            icon={<FaRedo />}
          >
            Reset
          </Button>
        </div>

        <div className="flex justify-between gap-2">
          {Object.entries(modes).map(([key, value]) => (
            <Button
              key={key}
              className={`flex-1 ${
                mode === key ? "bg-green-500 text-white" : ""
              }`}
              onClick={() => resetTimer(key)}
              icon={value.icon}
            >
              {value.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
