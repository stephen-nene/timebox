import React, { useState } from "react";
import { Button, Form, Input, Typography, Alert } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../../helpers/auth.js"
import { useSelector } from "react-redux";

export default function Reset() {
  const { token } = useParams(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [error, setError] = useState("");

  const darkMode = useSelector((state) =>state.app.darkMode)

  const onFinish = async (values) => {
    const { password, confirmPassword } = values;

    // Clear previous messages
    setServerMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword({
        token,
        password,
        password_confirm: confirmPassword,
      });
      setServerMessage(response.message);
      setTimeout(() => {
        navigate("/login"); 
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formStyles = darkMode
    ? "bg-gray-800 border-gray-700 text-white"
    : "bg-white border-gray-300 text-gray-800";

  const textColor = darkMode ? "text-white" : "text-gray-800";

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 space-y-6 rounded-xl border shadow-lg ${formStyles}`}
      >
        <Typography.Title level={2} className={`text-center mb-6 ${textColor}`}>
          Reset Password
        </Typography.Title>

        {/* Alert Messages */}
        {serverMessage && (
          <Alert
            message={serverMessage}
            type="success"
            showIcon
            className="mb-4"
          />
        )}
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mb-4"
          />
        )}

        <Form name="reset-password" onFinish={onFinish} layout="vertical">
          {/* Password Field */}
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your new password",
              },
            ]}
          >
            <Input.Password
              placeholder="New Password"
              size="large"
              className={`${darkMode ? "bg-gray-700 border-gray-600 " : ""}`}
            />
          </Form.Item>

          {/* Confirm Password Field */}
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your password",
              },
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              size="large"
              className={`${darkMode ? "bg-gray-700 border-gray-600 " : ""}`}
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
