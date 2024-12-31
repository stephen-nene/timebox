import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  TimePicker,
  Input,
  ColorPicker,
  Space,
  message,
  Select,
  Switch,
} from "antd";
import {
  ClockCircleOutlined,
  LinkOutlined,
  FileTextOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";
import { addTimeFrame, deleteTimeFrame } from "../../helpers/indexDb/indexedDB";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const DEFAULT_COLORS = {
  backgroundColor: "#ffffff",
  borderColor: "#3788d8",
  textColor: "#000000",
};

const DISPLAY_OPTIONS = [
  { value: "auto", label: "Auto" },
  { value: "block", label: "Block" },
  { value: "list-item", label: "List Item" },
  { value: "background", label: "Background" },
  { value: "inverse-background", label: "Inverse Background" },
  { value: "none", label: "None" },
];

export default function ViewEventModal({
  isOpen,
  onClose,
  event,
  setTimeFrame,
  db,
}) {
  const [form] = Form.useForm();
  const [isDeleting, setIsDeleting] = useState(false);
  const darkMode = useSelector((state) => state.app.darkMode);
console.log(event)
  // Populate form with initial event data when modal opens
  useEffect(() => {
    if (isOpen && event) {
      const eventData = event.event._def;
      const eventInfo = event.event;

      // Populate form with initial values from event data
      form.setFieldsValue({
        dayTaskId: eventData.extendedProps.day_task_id,
        backgroundColor: eventInfo.backgroundColor,
        textColor: eventInfo.textColor || DEFAULT_COLORS.textColor,
        borderColor: eventInfo.borderColor || DEFAULT_COLORS.borderColor,
        title: eventInfo.title || "",
        description: eventData.extendedProps.description || "",
        display: eventInfo.display || "none",
        url: eventInfo.url || "",
        timeRange: [dayjs(eventInfo.startStr), dayjs(eventInfo.endStr)],
      });
    }
  }, [isOpen, event, form]);

  const toHex = (color) =>
    typeof color === "string" ? color : color.toHexString();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const {
        backgroundColor,
        textColor,
        borderColor,
        title,
        description,
        display,
        url,
        timeRange,
      } = values;

      const updatedTimeFrame = {
        day_task_id: event.event.extendedProps.day_task_id,

        id: event.event.id,
        title,
        start: timeRange[0].format(),
        end: timeRange[1].format(),
        backgroundColor: toHex(backgroundColor),
        textColor: toHex(textColor),
        borderColor: toHex(borderColor),
        description: description || "",
        url: url || "",
        display: display || "block",
        allDay: false,
        sync: false,
        timestamp: Date.now(),
      };

      try {
        console.log(values,updatedTimeFrame)
        // Update the time frame in IndexedDB using the `put` method
        const res = await addTimeFrame(db, updatedTimeFrame);
        console.log(res);

        // Update state to reflect the changes
        setTimeFrame((prevData) =>
          prevData.map((ev) =>
            ev.id === event.event.id ? updatedTimeFrame : ev
          )
        );

        message.success("Time frame updated successfully");
        form.resetFields();
        onClose();
      } catch (error) {
        message.error("Failed to update time frame");
        console.error("Update error:", error);
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Delete the event from IndexedDB (if needed)
      await deleteTimeFrame(db, event.event.id);

      // Update state to remove the event from the UI
      setTimeFrame((prevData) =>
        prevData.filter((ev) => ev.id !== event.event.id)
      );

      message.success("Time frame deleted successfully");
      onClose();
    } catch (error) {
      message.error("Failed to delete time frame");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      width={600}
      className={` ${darkMode && "dark"} rounded-lg event-modal`}
      footer={
        <div className="flex justify-between gap-4 px-4 py-2">
          <Button
            color="danger"
            variant="solid"
            className="px-6"
            onClick={handleDelete}
            loading={isDeleting}
          >
            Delete
          </Button>
          <Button
            danger
            className="px-6"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            color="primary"  
            variant="solid"
            className="bg-green-500 hover:bg-green-600 px-6"
            onClick={handleSave}
            disabled={isDeleting}
          >
            Save
          </Button>
        </div>
      }
    >
      <div className="text-xl font-semibold mb-4">Edit Time Frame</div>
      <Form form={form} layout="vertical" className="px-2">
        <div className="grid grid-cols-1 gap-1">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input
              placeholder="Enter time frame title"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="timeRange"
            label={
              <span className="flex items-center gap-2">
                <ClockCircleOutlined /> Time Range
              </span>
            }
          >
            <TimePicker.RangePicker
              className="w-full rounded-md"
              format="HH:mm"
              minuteStep={5}
            />
          </Form.Item>

          <Form.Item
            name="url"
            label={
              <span className="flex items-center gap-2">
                <LinkOutlined /> URL
              </span>
            }
          >
            <Input placeholder="Add related link" className="rounded-md" />
          </Form.Item>

          <Form.Item
            name="description"
            label={
              <span className="flex items-center gap-2">
                <FileTextOutlined /> Description
              </span>
            }
          >
            <Input.TextArea
              rows={3}
              placeholder="Add any additional details"
              className="rounded-md"
            />
          </Form.Item>

          <div className="space-y-2">
            <span className="flex items-center gap-2">
              <BgColorsOutlined />
              Colors
            </span>
            <Space className="w-full justify-between dark:bg-gray-500 bg-gray-50 p-4 rounded-lg">
              <Form.Item name="borderColor" label="Border">
                <ColorPicker />
              </Form.Item>
              <Form.Item name="backgroundColor" label="Background">
                <ColorPicker />
              </Form.Item>
              <Form.Item name="textColor" label="Text">
                <ColorPicker />
              </Form.Item>
            </Space>
          </div>

          <Form.Item name="display" label="Display Mode">
            <Select options={DISPLAY_OPTIONS} className="rounded-md" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
