import React, { useState } from "react";
import { Form, Input, Button, message } from "antd"; // Essential components
import { MdEmail, MdWhatsapp } from "react-icons/md";
import { FaLinkedin, FaFacebookF, FaInstagram } from "react-icons/fa"; // Social icons
import apiClient from "../../helpers/apiClient";

const { TextArea } = Input;

export default function Contact() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    // console.log("Form submitted with values:", { message: { ...values } });
    try {
      const response = await apiClient.post("/api/contact", {
        message: { ...values },
      });
      if (response.status === 200) {
        message.success(
          "Message sent successfully! We'll get back to you soon.",
          4
        );
        form.resetFields();
      }
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: <MdEmail className="text-2xl" />,
      title: "Email",
      subtitle: "Talk to me",
      value: "stevekid705@gmail.com",
      link: "mailto:stevekid705@gmail.com",
    },
    {
      icon: <MdWhatsapp className="text-2xl" />,
      title: "WhatsApp",
      subtitle: "Let's chat",
      value: "+254 741 780 970",
      link: "https://wa.me/254741780970",
    },
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin className="text-xl" />,
      href: "#",
      tooltip: "LinkedIn",
    },
    {
      icon: <FaFacebookF className="text-xl" />,
      href: "#",
      tooltip: "Facebook",
    },
    {
      icon: <FaInstagram className="text-xl" />,
      href: "#",
      tooltip: "Instagram",
    },
  ];

  return (
    <div className=" dark:text-white w-full p-12 grid lg:grid-cols-2 gap-12">
      {/* Left Section */}
      <div className="space-y-8">
        <div className="shadow-lg rounded-lg p-6 bg-white dark:bg-gray-900">
          <h2 className="text-4xl font-bold mb-4">Let's Talk</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Have a big idea or brand to develop? We'd love to hear about your
            project and provide assistance. Reach out to us through any of the
            channels below.
          </p>

          <div className="space-y-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="bg-blue-50 p-4 rounded-full">
                  {React.cloneElement(method.icon, {
                    className: "text-blue-600 text-2xl",
                  })}
                </div>
                <div>
                  <strong className="block text-lg">{method.title}</strong>
                  <span className="block text-sm text-gray-500 dark:text-gray-400">
                    {method.subtitle}
                  </span>
                  <a
                    href={method.link}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {method.value}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-4">Connect with me</h3>
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <div
                key={index}
                className="bg-blue-50 p-4 rounded-full hover:bg-blue-100 dark:hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
              >
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {React.cloneElement(social.icon, {
                    className: "text-blue-600 text-xl",
                  })}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section: Contact Form */}
      <div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
          size="large"
        >
          <h2 className="dark:text-white text-4xl font-bold mb-4">
            Send me a message
          </h2>

          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              placeholder="Your name"
              className="rounded-lg h-12 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              placeholder="Your email"
              className="rounded-lg h-12 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="subject"
            rules={[{ required: true, message: "Please enter a subject" }]}
          >
            <Input
              placeholder="Subject"
              className="rounded-lg h-12 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="message"
            rules={[
              { required: true, message: "Please enter your message" },
              { min: 10, message: "Message must be at least 10 characters" },
            ]}
          >
            <TextArea
              placeholder="Your message"
              rows={6}
              className="rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-12 text-lg rounded-lg bg-blue-500 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
              size="large"
            >
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
