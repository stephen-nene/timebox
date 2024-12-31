import { Modal, Button, Form, TimePicker, Switch, Input, ColorPicker, Space, message } from 'antd';
import { useSelector } from 'react-redux';
import { generateUniqueId } from "../pages/wrappers/TimeBox/event-utils";
// import {handleCreateTframe} from '../../utils/ServerCom'

export default function NewTf({ isOpen, onClose, calendarApi, dayTask }) {
  const [form] = Form.useForm();
  const darkMode = useSelector((state) => state.app.darkMode);


  const toHex = (color) => typeof color === 'string' ? color : color.toHexString();

  // Usage within the handleSave function
const handleSave = async () => {
  try {
    const values = await form.validateFields();
    const kalai = calendarApi.view.calendar;
    const { backgroundColor, textColor, borderColor, title, description } = values;

    // Clear date selection
    kalai.unselect();

    // Convert colors to hexadecimal format
    const backgroundHex = toHex(backgroundColor);
    const textHex = toHex(textColor);
    const borderHex = toHex(borderColor);

    // Create formData object
    const formData = {
      // day_task_id: dayTask.id,
      title,
      start: calendarApi.startStr,
      end: calendarApi.endStr,
      backgroundColor: backgroundHex,
      textColor: textHex,
      borderColor: borderHex,
      description,
      allDay: true
    };
message.info('Saving event...');
    // Send data to backend
    // const response = await handleCreateTframe(formData);
    // console.log(response)
    // if (response && response.status === 201) {
    //   // Add event to calendar only if backend save succeeds
    // }
  const res = kalai.addEvent({
    id: generateUniqueId(),
    ...formData,
  });
  console.log(res)

    // Reset form fields and close modal
    form.resetFields();
    onClose();

 
  } catch (error) {
    console.error('Validation Failed:', error);
    // Handle validation errors gracefully (e.g., display error message to user)
  }
};
  

  return (
    <>
      <Modal
        backgroundColor={`black`}
        title="New Event"
        open={isOpen} // Changed to `visible` for antd Modal
        onCancel={onClose}
        footer={[
          <div key='key'>
            <Button type='primary' danger key="cancel" onClick={onClose}>
              Close
            </Button>,
            <Button className=' bg-sky-500' type="primary" key="save" onClick={handleSave}>
              Save
            </Button>,
          </div>
        ]}

      >
        <Form form={form} layout="vertical"
        >
          {/* <Form.Item name="allDay" label="All Day event?" valuePropName="checked">
            <Switch defaultChecked={true} />
          </Form.Item> */}
          <Space direction="horizontal">
            <Form.Item name="borderColor" label="Border Color" initialValue="#000000">
              <ColorPicker />
            </Form.Item>
            <Form.Item name="backgroundColor" label="Background Color" initialValue="#ffffff">
              <ColorPicker />
            </Form.Item>
            <Form.Item name="textColor" label="Text Color" initialValue="#000000">
              <ColorPicker />
            </Form.Item>
          </Space>


          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
            <Input />
          </Form.Item>
          {/* <Form.Item name="url" label="URL">
            <Input />
          </Form.Item> */}
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          {/* <Form.Item name="timeframe" label="Timeframe" rules={[{ required: true, message: 'Please select a timeframe' }]}>
            <TimePicker.RangePicker
              format="HH:mm"
              defaultValue={[moment('00:00', 'HH:mm'), moment('23:59', 'HH:mm')]}
            />
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
}
