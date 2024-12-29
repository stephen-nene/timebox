import React, { useState } from "react";
import { Select, Tag, message } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { FiClock, FiFlag, FiCheckCircle } from "react-icons/fi";

export default function Priorities({ dayTask, setDayTask }) {
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleSelect = (values) => {
    if (values.length > 3) {
      message.warning("Maximum 3 priorities allowed");
      return;
    }
    const updatedTasks = values.map((id) =>
      dayTask.brainDump.find((task) => task.id === id)
    );

    setSelectedTasks(updatedTasks);

    setDayTask((prev) => ({
      ...prev,
      priorities: updatedTasks,
    }));
  };
  const removeTask = (taskId) => {
    const updatedTasks = selectedTasks.filter((task) => task.id !== taskId);

    setSelectedTasks(updatedTasks);

    setDayTask((prev) => ({
      ...prev,
      priorities: updatedTasks,
    }));

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
    <div className="max-w-2xl mx-auto p-3 bg- white dark:bg-gr ay-800 rounded-xl ">
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
          options={dayTask.brainDump.map((task) => ({
            value: task.id,
            label: task.task,
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
                {task.task}
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
