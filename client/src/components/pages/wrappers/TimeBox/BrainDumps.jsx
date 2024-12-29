import React, { useState } from "react";
import { Form, Input, Button, List, Select, message, Tag } from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { FiFlag, FiClock, FiCheckCircle } from "react-icons/fi";

export default function BrainDumps({ dayTask, setDayTask }) {
  const [tasks, setTasks] = useState(dayTask.brainDump || []); // Initialize with tasks from parent state
  const [editingIndex, setEditingIndex] = useState(null);
  const [form] = Form.useForm();

  const priorityOptions = [
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
  ];

  const handleSubmit = (values) => {
    const { task, priority } = values;

    // Update tasks based on whether it's editing or adding a new task
    if (editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = {
        ...updatedTasks[editingIndex],
        // id: editingIndex+1,
        task,
        priority,
      };
      setTasks(updatedTasks);
      setDayTask({ ...dayTask, brainDump: updatedTasks }); // Update parent state
      setEditingIndex(null);
      message.success("Task updated!");
    } else {
      const newTask = {id: tasks.length +1 , task, priority: priority || "Medium" };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setDayTask({ ...dayTask, brainDump: updatedTasks }); // Update parent state
      message.success("Task added!");
    }

    form.resetFields();
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setDayTask({ ...dayTask, brainDump: updatedTasks }); // Update parent state
    message.success("Task removed!");
  };

  const startEditing = (index) => {
    const taskToEdit = tasks[index];
    setEditingIndex(index);
    form.setFieldsValue({
      task: taskToEdit.task,
      priority: taskToEdit.priority,
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500 dark:bg-red-800";
      case "Medium":
        return "bg-yellow-500 dark:bg-yellow-700";
      case "Low":
        return "bg-green-500 dark:bg-green-700";
      default:
        return "bg-blue-500 dark:bg-blue-700";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "High":
        return <FiFlag />;
      case "Medium":
        return <FiClock />;
      case "Low":
        return <FiCheckCircle />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-left text-gray-800 dark:text-white">
        🧠 Brain Dumps
      </h1>

      {/* Task Form */}
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{ priority: "Medium" }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <Form.Item
          name="task"
          rules={[{ required: true, message: "Please enter a task!" }]}
          className="flex-grow"
        >
          <Input
            placeholder={
              editingIndex !== null ? "Edit your task" : "What's on your mind?"
            }
            size="large"
            className="w-full"
          />
        </Form.Item>
        <Form.Item name="priority">
          <Select
            placeholder="Priority"
            options={priorityOptions}
            size="large"
            className="w-full sm:w-40"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={editingIndex !== null ? <SaveOutlined /> : <PlusOutlined />}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            {editingIndex !== null ? "Save" : "Add"}
          </Button>
        </Form.Item>
      </Form>

      {/* Task List */}
      <div className="rounded-lg shadow-lg bg-white dark:bg-sky-600 dark:text-white p">
        {tasks.length > 0 ? (
          <List
            bordered
            className="rounded-lg"
            dataSource={tasks}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <EditOutlined
                    title="Edit Task"
                    key="edit"
                    onClick={() => startEditing(index)}
                    className="text-blue-900 text-lg"
                  />,
                  <DeleteOutlined
                    title="Delete Task"
                    key="delete"
                    onClick={() => removeTask(index)}
                    className="text-red-500 text-lg"
                  />,
                ]}
              >
                <Tag
                  className={`flex border-none dark:text-white items-center gap-2 px-3 py-1 text-sm rounded-xl  ${getPriorityColor(
                    item.priority
                  )}`}
                  icon={getPriorityIcon(item.priority)}
                >
                  {item.task}
                </Tag>
              </List.Item>
            )}
          />
        ) : (
          <p className="text-center p-3">No tasks yet. Add your first one!</p>
        )}
      </div>
    </div>
  );
}
