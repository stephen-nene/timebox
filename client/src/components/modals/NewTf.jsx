import React from 'react';
import { Modal, Button, Form, TimePicker, Input } from "antd";
import { Alert, ColorPicker, Space, message, Select, Switch } from "antd";
import {
  ClockCircleOutlined,
  LinkOutlined,
  FileTextOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";
import { generateUniqueId } from "../pages/wrappers/TimeBox/event-utils";
import { addTimeFrame } from "../../helpers/indexDb/indexedDB";
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

export default function TimeFrameModal({
  isOpen,
  onClose,
  calendarApi,
  dayTask,
  setTimeFrame,
  db,
}) {
  const [form] = Form.useForm();

  const darkMode = useSelector((state) => state.app.darkMode);
  const toHex = (color) =>
    typeof color === "string" ? color : color.toHexString();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const calendar = calendarApi.view.calendar;

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

      calendar.unselect();

      // Use provided time range or default to calendar selection
      const startTime = timeRange
        ? timeRange[0].format()
        : calendarApi.startStr;
      const endTime = timeRange ? timeRange[1].format() : calendarApi.endStr;

      const timeFrame = {
        id: generateUniqueId(),
        day_task_id: dayTask.id,
        title,
        start: startTime,
        end: endTime,
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
        await addTimeFrame(db, timeFrame);
        calendar.addEvent(timeFrame);
        setTimeFrame &&
          setTimeFrame((prevFrames) => [...prevFrames, timeFrame]);
        message.success("Time frame saved successfully");
        form.resetFields();
        onClose();
      } catch (error) {
        message.error("Failed to save time frame");
        console.error("Save error:", error);
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const [display, setDisplay] = React.useState(null);

  // Triggered whenever form values change
  const onValuesChange = (changedValues) => {
    if (changedValues.display === "background") {
      // Show message when "background" is selected
      message.info("Background events are not editable");
    }
    setDisplay(changedValues.display);
  };
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      width={600}
      className={` ${darkMode && "dark"} rounded-lg event-modal`}
      footer={
        <div className="flex justify-end gap-4 px-4 py-2">
          <Button danger className="px-6" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="primary"
            className="bg-blue-500 hover:bg-blue-600 px-6"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      }
    >
      <div className="text-xl font-semibold mb-4">New Time Frame</div>
      <Form
        form={form}
        layout="vertical"
        className="px-2"
        initialValues={{
          backgroundColor: DEFAULT_COLORS.backgroundColor,
          borderColor: DEFAULT_COLORS.borderColor,
          textColor: DEFAULT_COLORS.textColor,
          display: "block",
          timeRange: [dayjs(calendarApi.startStr), dayjs(calendarApi.endStr)],
          url: "https://timebox-nene.vercel.app/timebox",
        }}
        onValuesChange={onValuesChange}
      >
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
                <ClockCircleOutlined />
                Time Range
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
                <LinkOutlined />
                URL
              </span>
            }
          >
            <Input placeholder="Add related link" className="rounded-md" />
          </Form.Item>

          <Form.Item
            name="description"
            label={
              <span className="flex items-center gap-2">
                <FileTextOutlined />
                Description
              </span>
            }
          >
            <Input.TextArea
              rows={3}
              placeholder="Add any additional details"
              className="rounded-md"
            />
          </Form.Item>

          <div className="space-y-2 mb-3">
            <span className="flex items-center gap-2 ">
              <BgColorsOutlined />
              Colors
            </span>
            <div className="w-full flex justify-between dark:bg-gray-500 bg-gray-50 px-4 py-1 rounded-lg">
              <Form.Item name="borderColor" label="Border">
                <ColorPicker />
              </Form.Item>
              <Form.Item name="backgroundColor" label="Background">
                <ColorPicker />
              </Form.Item>
              <Form.Item name="textColor" label="Text">
                <ColorPicker />
              </Form.Item>
            </div>
          </div>
          {/* Display mode selector */}
          {display === "background" && (
            <Alert
              description="Background events are not editable, yet!!"
              type="warning"
              className="mb-3"
              showIcon
            />
          )}
          <Form.Item name="display" label="Display Mode">
            <Select options={DISPLAY_OPTIONS} className="rounded-md" />
          </Form.Item>

          {/* Conditional Alert for 'Background' selection */}

          <Form.Item
            name="overlapping"
            label="Allow Overlapping"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
