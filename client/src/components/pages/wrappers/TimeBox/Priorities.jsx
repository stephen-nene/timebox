import React, { useEffect, useState } from "react";
import { Select, Tag, message, Button } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { FiClock, FiFlag, FiCheckCircle, FiSave } from "react-icons/fi";
import { addDayTask, getDayTask, formatDate } from "../../../../helpers/indexDb/indexedDB";

export default function Priorities({ db, dayTask, setDayTask, selectedDate }) {
  const [isSaving, setIsSaving] = useState(false);

  const handleAddDayTask = async () => {
    if (!db) return;

    setIsSaving(true);
    try {
      await addDayTask(db, dayTask);
      message.success({
        content: "Priorities saved successfully!",
        icon: <FiCheckCircle className="text-green-500" />,
      });
      await fetchDayTaskAndTimeFrames();
    } catch (error) {
      message.error("Failed to save priorities. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const fetchDayTaskAndTimeFrames = async () => {
    const task = await getDayTask(db, formatDate(selectedDate));
    setDayTask((prevState) => ({
      ...prevState,
      brainDump: task?.brainDump || [],
      priorities: task?.priorities || [],
    }));
  };

  const handleSelect = (values) => {
    if (values.length > 3) {
      message.warning("Maximum 3 priorities allowed");
      return;
    }

    const updatedTasks = values.map((id) =>
      dayTask.brainDump.find((task) => task.id === id)
    );

    setDayTask((prev) => ({
      ...prev,
      priorities: updatedTasks,
    }));
  };

  const removeTask = (taskId) => {
    const updatedTasks = dayTask.priorities.filter(
      (task) => task.id !== taskId
    );

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <span>🎯</span>
          <span>Priority Tasks</span>
        </h2>
        <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
          {3 - dayTask.priorities.length} remaining
        </span>
      </div>

      <Select
        size="large"
        mode="multiple"
        placeholder="Select up to 3 priorities..."
        value={dayTask.priorities?.map((task) => task.id)}
        onChange={handleSelect}
        maxTagCount="responsive"
        className="w-full"
        dropdownClassName="priority-dropdown"
        options={dayTask.brainDump.map((task) => ({
          value: task.id,
          label: (
            <div className="flex items-center gap-2 py-1">
              {getPriorityIcon(task.priority)}
              <span>{task.task}</span>
            </div>
          ),
          disabled:
            dayTask.priorities.length >= 3 &&
            !dayTask.priorities.find((t) => t.id === task.id),
        }))}
      />

      <div className="flex flex-wrap gap-3">
        {dayTask.priorities?.map((task) => (
          <Tag
            key={task.id}
            className={`group h-9 flex items-center gap-2 text-sm py-1.5 px-4 rounded-full transition-all duration-200 ${
              isSaving ? 'opacity-50' : ''
            }`}
            style={{ backgroundColor: getPriorityColor(task.priority) }}
            icon={getPriorityIcon(task.priority)}
            closeIcon={
              <CloseCircleFilled
                className="ml-1 opacity-60 group-hover:opacity-100 transition-opacity"
                onClick={() => !isSaving && removeTask(task.id)}
              />
            }
            closable={!isSaving}
          >
            <span className="max-w-[200px] sm:max-w-[300px] truncate">
              {task.task}
            </span>
          </Tag>
        ))}
      </div>

      {dayTask.priorities.length === 0 ? (
        <div className="p-6 rounded-lg text-center bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">
            Select your top priorities from your brain dump
          </p>
        </div>
      ) : (
        <div className="flex justify-end">
          <Button
            type="primary"
            onClick={handleAddDayTask}
            loading={isSaving}
            icon={<FiSave />}
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
          >
            Save Priorities
          </Button>
        </div>
      )}
    </div>
  );
}
