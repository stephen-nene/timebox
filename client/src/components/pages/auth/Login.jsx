import React, { useState } from "react";
import { Alert, Button, Checkbox, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { serverLogin } from "../../../helpers/auth";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  const onFinish = async (values) => {
    setLoading(true);
    setServerMessage("");
    setError("");
    try {
      await serverLogin(values, navigate, dispatch);
    } catch (error) {
      setError(error.response?.data?.error || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 rounded-xl border shadow-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
        <h1
          className="text-3xl font-bold text-center text-gray-800 dark:text-white"
        >

          {!userData
            ? "Welcome Back"
            : `Hello ${userData.role} ${userData.username}`}
        
        </h1>

        {/* Alert Messages */}
        {serverMessage && (
          <Alert
            message={serverMessage}
            type="success"
            showIcon
            className="mb-4"
            closable
          />
        )}
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mb-4"
            closable
          />
        )}

        {/* Form */}
        <Form
          name="login"
          initialValues={{ remember_me: true }}
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
              type="email"
              placeholder="Email"
              size="large"
              className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              placeholder="Password"
              size="large"
              className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
            />
          </Form.Item>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center mb-4">
            <Form.Item name="remember_me" valuePropName="checked" noStyle>
              <Checkbox className="text-gray-800 dark:text-gray-200">
                Remember me
              </Checkbox>
            </Form.Item>
            <Link
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              to="/forgot"
            >
              Forgot password?
            </Link>
          </div>

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
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </Form.Item>
        </Form>

        {/* Sign Up Prompt */}
        <div className="text-center">
          <Typography.Text className="text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Sign up
            </Link>
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default Login;
