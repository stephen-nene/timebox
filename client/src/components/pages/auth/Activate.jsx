import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../../helpers/apiClient";

export default function Activate() {
  const { token } = useParams(); 
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        if (!token) {
          setError("Activation token is missing.");
          return;
        }

        const response = await apiClient.patch(
          `/auth/activate/${token}`, 
          {}
        );

        setMessage(response.data.message);
        // console.log(response.data)
        // Optional: Navigate to login or dashboard after activation
        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.error || "An error occurred.");
        } else {
          setError("Failed to connect to the server.");
        }
      }
    };

    activateAccount();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md text-center">
        {message ? (
          <div className="text-green-600 text-lg font-bold">{message}</div>
        ) : error ? (
          <div className="text-red-600 text-lg font-bold">{error}</div>
        ) : (
          <div className="text-blue-600 text-lg font-bold">
            Activating your account...
          </div>
        )}
      </div>
    </div>
  );
}
