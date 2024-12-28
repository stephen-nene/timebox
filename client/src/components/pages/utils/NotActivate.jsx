import React, { useState } from "react";
import { Input, Button, Alert, message, Form, Spin } from "antd";
import { MailOutlined, ReloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import apiClient from "../../../helpers/apiClient";

export default function NotActivated({ user, darkMode }) {
  const [error, setError] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  // Email validation logic
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  // Handle resend activation email
  const handleReactivate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous errors
    try {
      const res = await apiClient.post("/auth/resend_activation");
      setServerMessage(
        res?.data?.message || "Activation email resent successfully."
      );
    } catch (err) {
      // console.error(err.response);
      setError(
        err?.response?.data?.message ||
          "Failed to resend activation email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  // Handle update email address
  const handleUpdateEmail = async () => {
    const validationError = validateEmail(newEmail);
    if (validationError) {
      message.error(validationError, 4);
      return;
    }

    setIsLoading(true);
    setError(""); // Clear previous errors
    try {
      const res = await apiClient.post("/auth/resend_activation", {
        new_email: newEmail,
      });
      setServerMessage(
        res?.data?.message ||
          `Email updated to ${newEmail}. Please check your inbox.`
      );
      setNewEmail("");
    } catch (err) {
      // console.error(err.response);
      const serverErrors = err.response?.data?.error || [
        "An unknown error occurred",
      ];
      if (Array.isArray(serverErrors)) {
        setError(` ${serverErrors.join(", ")}`);
      } else {
        setError(` ${serverErrors}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex justify-center items-center min-h-screen ">
      <div className="max-w-lg w-full p-6 dark:text-white text-black">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Account Not Activated
        </h1>

        {serverMessage ? (
          <Alert
            message="Success"
            description={serverMessage}
            type="success"
            showIcon
            className="mb-4"
          />
        ) : (
          <>
            <Alert
              message={
                <div>
                  <p className="font-semibold">
                    Hello {user?.email || "(No email provided)"}
                  </p>
                </div>
              }
              description={
                <p className="text-md">
                  An activation link was sent to this email address on sign-up:
                </p>
              }
              type="warning"
              showIcon
            />

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
              Didn&apos;t receive it? You can resend the link or update your
              email address below if it was wrong.
            </p>
          </>
        )}

        {!serverMessage && (
          <div className="space-y-4 mt-6">
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              loading={isLoading}
              onClick={handleReactivate}
              block
              className="h-10"
            >
              Resend Activation Email
            </Button>

            <Form layout="vertical">
              <Form.Item
                label="Update Email Address"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email address",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="Enter new email address"
                  size="large"
                  value={newEmail}
                  onChange={handleEmailChange}
                />
              </Form.Item>

              <Button
                type="default"
                onClick={handleUpdateEmail}
                block
                className="h-10"
                loading={isLoading}
              >
                Update Email Address
              </Button>
            </Form>
          </div>
        )}

        {error && (
          <Alert message={error} type="error" showIcon className="mt-4" />
        )}
      </div>
    </div>
  );
}
