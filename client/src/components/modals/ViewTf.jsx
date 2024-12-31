import {
  Modal,
  Button,
  Form,
  TimePicker,
  Switch,
  Input,
  ColorPicker,
  Space,
  message,
} from "antd";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
// import { handleDeleteTframe } from "../../utils/ServerCom";
import moment from "moment";

export default function ViewTf({ isOpen, onClose, event }) {
  const [form] = Form.useForm();
  const darkMode =true

  useEffect(() => {
    if (isOpen && event) {
      const eventData = event.event._def;
      const color = event.event;

      // Populate form with initial values from event data
      form.setFieldsValue({
        backgroundColor: color.backgroundColor || "", // Provide default value if backgroundColor is undefined
        textColor: event.event.textColor || "", // Provide default value if textColor is undefined
        borderColor: event.event.borderColor || "",
        title: eventData.title || "", // Provide default value if title is undefined
        description: eventData.extendedProps?.description || "", // Provide default value if description is undefined
        // timeframe: [
        //   moment(event.event.start, 'YYYY-MM-DDTHH:mm:ss'),
        //   moment(event.event.endStr, 'YYYY-MM-DDTHH:mm:ss')
        // ],
        // Add more fields as needed
      });
    }
  }, [isOpen, event]);
  // console.log(event.event.startStr);

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        console.log("Received values:", values);
        onClose(); // Close the modal
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  const handleDelete = async () => {
    if (
      confirm(
        `Are you sure you want to delete the event '${event.event.title}'`
      )
    ) {
      try {
        message.error("Event deleted successfully");
        // await handleDeleteTframe(event.event.id);

        form.resetFields();
        event.event.remove();
        onClose();
      } catch (error) {
        console.error("Error deleting time frame:", error);
        // Handle error if needed
      }
    }
  };
  return (
    <>
      <Modal
        title="View Event"
        open={isOpen} // Changed to `visible` for antd Modal
        onCancel={onClose}
        footer={[
          <div className="flex justify-evenly" key="key">
            <div className="start">
              <Button
                className=" b g-rose-500"
                danger
                key="save"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
            <div className="end">
              <Button type="primary" danger key="cancel" onClick={onClose}>
                Close
              </Button>
              ,
              {/* <Button className=' bg-sky-500' type="primary" key="save" onClick={handleUpdate}>
                Update
              </Button>, */}
            </div>
          </div>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Space direction="horizontal">
            <Form.Item name="borderColor" label="Border Color">
              <ColorPicker />
            </Form.Item>
            <Form.Item name="backgroundColor" label="Background Color">
              <ColorPicker />
            </Form.Item>
            <Form.Item name="textColor" label="Text Color">
              <ColorPicker />
            </Form.Item>
          </Space>

          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          {/* <Form.Item
            name="timeframe"
            label="Timeframe"
            // rules={[{ required: true, message: "Please select a timeframe" }]}
          >
            <TimePicker.RangePicker
              format="HH:mm"
            />
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
}
