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
  const [editingIndex, setEditingIndex] = useState(null);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const priorityOptions = [
    { label: "High", value: "High", icon: <FiFlag className="text-red-500" /> },
    { label: "Medium", value: "Medium", icon: <FiClock className="text-yellow-500" /> },
    { label: "Low", value: "Low", icon: <FiCheckCircle className="text-green-500" /> },
  ];

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const { task, priority } = values;

      if (editingIndex !== null) {
        const updatedTasks = [...dayTask.brainDump];
        updatedTasks[editingIndex] = {
          ...updatedTasks[editingIndex],
          task,
          priority,
        };
        setDayTask({ ...dayTask, brainDump: updatedTasks });
        message.success("Task updated successfully!");
      } else {
        const newTask = {
          id: Date.now(),
          task,
          priority: priority || "Medium",
        };
        setDayTask({ ...dayTask, brainDump: [...dayTask.brainDump, newTask] });
        message.success("Task added successfully!");
      }

      form.resetFields();
      setEditingIndex(null);
    } catch (error) {
      message.error("Failed to save task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeTask = (index) => {
    const updatedTasks = dayTask.brainDump.filter((_, i) => i !== index);
    setDayTask({ ...dayTask, brainDump: updatedTasks }); // Update parent state
    message.success("Task removed!");
  };

  const startEditing = (index) => {
    const taskToEdit = dayTask.brainDump[index];
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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
        <span>🧠</span>
        <span>Brain Dumps</span>
      </h1>

      {/* Task Form */}
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{ priority: "Medium" }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Form.Item
            name="task"
            rules={[{ required: true, message: "Please enter a task!" }]}
            className="sm:col-span-3 mb-0"
          >
            <Input
              placeholder={editingIndex !== null ? "Edit your task..." : "What's on your mind?"}
              size="large"
              disabled={isSubmitting}
              className="transition-all duration-200"
            />
          </Form.Item>
          
          <Form.Item name="priority" className="mb-0">
            <Select
              size="large"
              disabled={isSubmitting}
              className="w-full"
              options={priorityOptions}
              optionLabelProp="label"
              optionRender={(option) => (
                <div className="flex items-center gap-2">
                  {option.data.icon}
                  {option.data.label}
                </div>
              )}
            />
          </Form.Item>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isSubmitting}
          icon={editingIndex !== null ? <SaveOutlined /> : <PlusOutlined />}
          className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
        >
          {editingIndex !== null ? "Save Changes" : "Add Task"}
        </Button>
      </Form>

      {/* Task List */}
      <div className="mt-6">
        {dayTask.brainDump.length > 0 ? (
          <List
            dataSource={dayTask.brainDump}
            className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            renderItem={(item, index) => (
              <List.Item
                className={`transition-all duration-200 ${
                  editingIndex === index ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
                actions={[
                  <Button
                    key="edit"
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => startEditing(index)}
                    className="text-blue-500 hover:text-blue-600"
                  />,
                  <Button
                    key="delete"
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => removeTask(index)}
                    className="text-red-500 hover:text-red-600"
                  />,
                ]}
              >
                <Tag
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-full border-none transition-all duration-200 ${getPriorityColor(
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
          <div className="text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">Your brain dump is empty. Start adding tasks!</p>
          </div>
        )}
      </div>
    </div>
  );
}
