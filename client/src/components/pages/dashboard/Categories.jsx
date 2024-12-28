import { message, FloatButton } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../helpers/admins";
import DashTable from "../../DashTable";
import Pagination from "../../Pagination";
import { PlusOutlined } from "@ant-design/icons";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState({});
  const dispatch = useDispatch();
  const paginatedCategories = useSelector(
    (state) => state.app.paginatedCategories
  );

  const getCategories = async (page = 1) => {
    if (paginatedCategories[page]) {
      setMeta(paginatedCategories[page].meta);
      setCategories(paginatedCategories[page].categories);
      return paginatedCategories[page];
    }

    try {
      const data = await fetchCategories(page, dispatch);
      setMeta(data.meta);
      setCategories(data.categories);
    } catch (error) {
      // console.error(error);
      message.error("Failed to get categories for page: " + page);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleEdit = (category) => {
    message.success(`Editing ${category.name}`, 1);
  };

  const handleDelete = (category) => {
    message.error(`Deleting ${category.name}`, 1);
  };

  // Define columns for categories dynamically
  const categoryColumns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      type: "status",
      sortable: true,
    },
  ];
  if (categories.some((item) => item.created_at)) {
    categoryColumns.push({
      key: "created_at",
      label: "Created At",
      sortable: true,
      renderCell: (item) => {
        const date = new Date(item.created_at);
        return (
          <div>
            <p>{date.toLocaleDateString()}</p>
            <p>{date.toLocaleTimeString()}</p>
          </div>
        );
      },
    });
  }
  return (
    <div className={`min-h-screen font-[sans-serif] overflow-x-auto`}>
      <DashTable
        data={categories}
        columns={categoryColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Pagination meta={meta} onPageChange={getCategories} />
      <FloatButton
        icon={<PlusOutlined />}
        tooltip={<div>Create New Category</div>}
        onClick={() => {
          message.success("Creating new category...");
        }}
      />
    </div>
  );
}
