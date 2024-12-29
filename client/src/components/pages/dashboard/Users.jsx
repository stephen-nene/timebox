import { message, FloatButton } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../helpers/admins";
import DashTable from "../../DashTable";
import Pagination from "../../Pagination";
import { PlusOutlined } from "@ant-design/icons";

export default function Users({ darkMode }) {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({});
  const dispatch = useDispatch();
  const paginatedUsers = useSelector((state) => state.app.paginatedUsers);

  const getUsers = async (page = 1) => {
    if (paginatedUsers[page]) {
      setMeta(paginatedUsers[page].meta);
      setUsers(paginatedUsers[page].users);
      return paginatedUsers[page];
    }

    try {
      const data = await fetchUsers(page, dispatch);
      setMeta(data.meta);
      setUsers(data.users);
    } catch (error) {
      // console.error(error);
      message.error("Failed to get users for page:", page);
    }
  };
  // console.log(meta)

  useEffect(() => {
    getUsers();
  }, []);
  // console.log("Fetched Users:", users);

  const handleEdit = (user) => {
    message.success(`editing ${user?.username}`, 1);
  };

  const handleDelete = (user) => {
    message.error(`deleting ${user?.username}`, 1);
  };

  // Define columns for users dynamically
  const userColumns = [
    {
      key: "name",
      label: "Name",
      // sortable: true,
      renderCell: (item) => (
        <div className="flex items-center cursor-pointer w-max">
          <img
            src={`https://img.daisyui.com/images/profile/demo/${
              (item.id % 4) + 1
            }@94.webp`}
            className="w-9 h-9 rounded-full shrink-0"
            alt={`${item.first_name}'s avatar`}
          />
          <div className="ml-4">
            <p className="text-sm">{`${item.first_name} ${item.last_name}`}</p>
            <p className="text-xs mt-0.5 text-gray-500">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      type: "status",
      sortable: true,

    },
    {
      key: "status",
      label: "Status",
      type: "status",
      sortable: true,
    },
  ];

  return (
    <div
      className={`min-h-screen font-[sans-serif] overflow-x-auto `}
    >
      <DashTable
        data={users}
        columns={userColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Pagination meta={meta} onPageChange={getUsers} />
      <FloatButton
        icon={<PlusOutlined />}
        tooltip={<div>Create New User</div>}
        onClick={() => {
          message.success("Creating new user...");
        }}
      />
    </div>
  );
}
