import React, { useState } from "react";
import { Button, Form, Input, Typography, Alert } from "antd";
import { Link } from "react-router-dom";
import { serverForgotPass } from "../../../helpers/auth";

export const Forgot = () => {
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    setLoading(true);
    setServerMessage("");
    setError("");
    try {
      const response = await serverForgotPass(values.email);
      setServerMessage(response?.message || "Password reset link sent!");
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error || "Failed to send password reset email.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 rounded-xl border shadow-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
        <Typography.Title
          level={2}
          className="text-center text-gray-800 dark:text-white"
        >
          Forgot Password
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
          <Alert message={error} type="error" showIcon className="mb-4" />
        )}

        {/* Form */}
        <Form
          name="forgot-password"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          {/* Email Field */}
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input
              placeholder="Enter your email"
              size="large"
              className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
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
              className="bg-blue-600 hover:bg-blue-700 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-white transition-colors duration-300"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </Form.Item>
        </Form>

        {/* Back to Login Prompt */}
        <div className="text-center">
          <Typography.Text className="text-gray-600 dark:text-gray-400">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Log in
            </Link>
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
