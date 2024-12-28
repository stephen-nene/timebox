import { message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Suspended = ({ darkMode }) => {
  const navigate = useNavigate();

  const darkModeStyles = {
    background: "bg-black bg-opacity-50",
    container: "bg-gray-800 text-white border-gray-800",
    heading: "text-red-500",
    text: "text-gray-300",
    subText: "text-gray-600",
    button: "bg-red-600 hover:bg-red-700 text-white",
  };

  const lightModeStyles = {
    background: "bg-gray-100",
    container: "bg-white text-gray-800 border-red-300",
    heading: "text-red-600",
    text: "text-gray-800",
    subText: "text-gray-500",
    button: "bg-red-500 hover:bg-red-600 text-white",
  };

  const styles = darkMode ? darkModeStyles : lightModeStyles;

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${styles.background}`}
    >
      <div
        className={`m-3 md:m-0 p-5 rounded-2xl text-center max-w-lg w-full border-2 ${styles.container} max-h-[90vh] overflow-y-auto`}
      >
        <div className="mb-6">
          <h1 className={`text-6xl font-bold ${styles.heading} mb-4`}>
            Account Suspended
          </h1>
          <p className={`${styles.text} my-4`}>
            Oops! Your account has been suspended.
          </p>
          <p className={`${styles.subText}`}>
            Please contact support if you believe this is an error.
          </p>
        </div>
        <button
          onClick={() => message.success("contact support comming soon")}
          className={`px-8 py-3 rounded-full ${styles.button} transition`}
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Suspended;
