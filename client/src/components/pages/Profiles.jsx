import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverLogout } from "../../helpers/auth";
import { CiLogout, CiSaveDown2 } from "react-icons/ci";
import { FaPencilAlt } from "react-icons/fa";

export const Profiles = () => {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initial state for form data
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    middle_name: user?.middle_name || "",
    last_name: user?.last_name || "",
    username: user?.username || "",
    email: user?.email || "",
    phonenumber: user?.phonenumber || "",
    street: user?.addresses?.[0]?.street || "",
    city: user?.addresses?.[0]?.city || "",
    state: user?.addresses?.[0]?.state || "",
    country: user?.addresses?.[0]?.country || "",
    role: user?.role || "",
    salary: user?.salary || "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handling input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Updated Profile Data:", formData);
    setIsEditing(false);
  };

  // Checking if the user data is available
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    // <div className="p-8 min-h-screen ">
    <div className="p-8 container mx-auto px-4 max-w-6xl">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gray-200 dark:bg-gray-700 px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-800 dark:text-purple-300">
            My Profile
          </h1>
          <div className="flex items-center space-x-4">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <FaPencilAlt size={18} />
                {/* <span>Edit Profile</span> */}
              </button>
            ) : (
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <CiSaveDown2 className="text-3xl text-black" size={20} />
                  {/* <span>Save Changes</span> */}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6 space-y-6">
          {/* Personal Information Section */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Personal Information
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  name: "first_name",
                  label: "First Name",
                  type: "text",
                },
                {
                  name: "middle_name",
                  label: "Middle Name",
                  type: "text",
                },
                {
                  name: "last_name",
                  label: "Last Name",
                  type: "text",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 rounded-lg ${
                      isEditing
                        ? "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                        : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-500"
                    } transition-colors duration-200`}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Role and Salary */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Role and Salary
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  name: "role",
                  label: "Role",
                  type: "text",
                  editable: false,
                },
                {
                  name: "salary",
                  label: "Salary",
                  type: "number",
                  editable: true,
                },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    disabled={!isEditing || !field.editable}
                    className={`w-full px-3 py-2 rounded-lg ${
                      isEditing
                        ? "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                        : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-500"
                    } transition-colors duration-200`}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Contact Information Section */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Contact Information
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: "email", label: "Email", type: "email" },
                { name: "phonenumber", label: "Phone Number", type: "tel" },
                { name: "username", label: "Username", type: "text" },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 rounded-lg ${
                      isEditing
                        ? "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                        : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-500"
                    } transition-colors duration-200`}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Profile Picture */}
          <section className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Profile Picture
            </h2>
            <img
              src={user.profile_pic || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover shadow-lg"
            />
          </section>

          {/* Logout Button */}
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={() => serverLogout(dispatch, navigate)}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <CiLogout size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </form>
    </div>
    // </div>
  );
};

export default Profiles;
