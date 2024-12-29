import React, { useState, useEffect } from "react";
import { Select, Tag, message } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { FiClock, FiFlag, FiCheckCircle } from "react-icons/fi";

export default function Priorities({ dayTask, setDayTask }) {
  // brainDump is passed dynamically from the parent component
  const brainDumps = dayTask.brainDump; // Use dynamic brain dumps from parent state

  const [selectedTasks, setSelectedTasks] = useState(
    dayTask.brainDump.filter((task) => task.selected)
  );

  // Update the parent component whenever the selected tasks change
  useEffect(() => {
    setDayTask((prev) => ({
      ...prev,
      brainDump: brainDumps.map((task) =>
        selectedTasks.some((selected) => selected.id === task.id)
          ? { ...task, selected: true }
          : { ...task, selected: false }
      ),
    }));
  }, [selectedTasks, brainDumps, setDayTask]);

  const handleSelect = (values) => {
    if (values.length > 3) {
      message.warning("Maximum 3 priorities allowed");
      return;
    }
    setSelectedTasks(
      values.map((id) => brainDumps.find((task) => task.id === id))
    );
  };

  const removeTask = (taskId) => {
    setSelectedTasks((prev) => prev.filter((task) => task.id !== taskId));
    message.success("Priority removed");
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#ff4d4f";
      case "Medium":
        return "#faad14";
      case "Low":
        return "#52c41a";
      default:
        return "#1890ff";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "High":
        return <FiFlag className="w-3 h-3" />;
      case "Medium":
        return <FiClock className="w-3 h-3" />;
      case "Low":
        return <FiCheckCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-3 bg-white dark:bg-gray-800 rounded-xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="text-3xl font-bold text-right text-gray-800 dark:text-white mb-4">
            🚨 Priority Tasks
          </label>

          <span className="text-xs text-gray-500 dark:text-gray-400">
            {3 - selectedTasks.length} remaining
          </span>
        </div>

        <Select
          size="large"
          mode="multiple"
          placeholder="Select up to 3 priorities..."
          value={selectedTasks.map((task) => task.id)}
          onChange={handleSelect}
          maxTagCount="responsive"
          className="w-full"
          options={brainDumps.map((task) => ({
            value: task.id,
            label: task.task, // Assuming task.title is the correct key
            disabled:
              selectedTasks.length >= 3 &&
              !selectedTasks.find((t) => t.id === task.id),
          }))}
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {selectedTasks.map((task) => (
            <Tag
              size="large"
              key={task.id}
              color={getPriorityColor(task.priority)}
              className="!m-0 h-9 !text-black text-sm py-1 px-3 flex items-center gap-2 !border-none"
              icon={getPriorityIcon(task.priority)}
              closeIcon={
                <CloseCircleFilled
                  className="ml-1 !text-lg opacity-60 hover:opacity-100 transition-opacity"
                  onClick={() => removeTask(task.id)}
                />
              }
              closable
            >
              <span className="max-w-[200px] sm:max-w-[300px] truncate">
                {task.task} {/* Make sure you use task.task */}
              </span>
            </Tag>
          ))}
        </div>

        {selectedTasks.length === 0 && (
          <div className="p-3 rounded-lg text-center shadow-lg bg-white dark:bg-sky-600 dark:text-white p">
            No priorities selected
          </div>
        )}
      </div>
    </div>
  );
}
