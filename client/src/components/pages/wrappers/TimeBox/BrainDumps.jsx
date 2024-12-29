import React, { useState } from "react";
import { Form, Input, Button, List, message } from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";

export default function BrainDumps() {
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Track the index of the task being edited
  const [form] = Form.useForm(); // Ant Design form instance

  // Function to handle adding a task
  const addTask = (values) => {
    const { task } = values;
    if (task.trim()) {
      setTasks([...tasks, task]);
      form.resetFields(); // Clear the input field
      message.success("Task added!");
    } else {
      message.error("Task cannot be empty!");
    }
  };

  // Function to handle removing a task
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    message.success("Task removed!");
  };

  // Function to handle editing a task
  const startEditing = (index) => {
    setEditingIndex(index);
    form.setFieldsValue({ task: tasks[index] }); // Populate the input field with the task to edit
  };

  // Function to save the edited task
  const saveTask = (values) => {
    const { task } = values;
    if (task.trim()) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = task;
      setTasks(updatedTasks);
      setEditingIndex(null); // Exit editing mode
      form.resetFields(); // Clear the input field
      message.success("Task updated!");
    } else {
      message.error("Task cannot be empty!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-xl ">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        🧠 Brain Dumps
      </h1>

      {/* Form for adding or editing tasks */}
      <Form
        form={form}
        onFinish={editingIndex !== null ? saveTask : addTask} // Use saveTask if editing, otherwise addTask
        className="flex flex-col sm:flex-row gap-4 mb-3"
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

      {/* Render task list */}
      <div className="rounded-lg shadow-lg bg-white dark:bg-sky-800 dark:text-white ">
        {tasks.length > 0 ? (
          <List
            bordered
            className="rounded-lg "
            dataSource={tasks}
            renderItem={(task, index) => (
              <List.Item
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => startEditing(index)}
                    className="text-blue-500 text-lg"
                  />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => removeTask(index)}
                    className="text-red-500 text-lg"
                  />,
                ]}
                className="text-gray-800 dark:text-gray-100 ga p-4"
              >
                {task}
              </List.Item>
            )}
          />
        ) : (
          <p className=" text-center p-4">
            No tasks yet. Add your first one!
          </p>
        )}
      </div>
    </div>
  );
}
