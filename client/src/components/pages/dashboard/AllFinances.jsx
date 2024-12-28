import { message, FloatButton, Switch } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFinances } from "../../../helpers/admins"; // Adjust path if needed
import DashTable from "../../DashTable";
import Pagination from "../../Pagination";
import { PlusOutlined } from "@ant-design/icons";

export default function AllFinances() {
  const [finances, setFinances] = useState([]);
  const [meta, setMeta] = useState({});
  const [viewMyRecords, setViewMyRecords] = useState(false); // Toggle for fetching user-specific records
  const dispatch = useDispatch();
  const paginatedFinances = useSelector((state) => state.app.paginatedFinances); // Assume Redux state holds paginated finances

  const getFinances = async (page = 1) => {
    if (paginatedFinances[page]?.viewMyRecords === viewMyRecords) {
      setMeta(paginatedFinances[page].meta);
      setFinances(paginatedFinances[page].finances);
      return paginatedFinances[page];
    }

    try {
      const data = await fetchFinances(page, dispatch, viewMyRecords);
      setMeta(data.meta);
      setFinances(data.finances);
    } catch (error) {
      // console.error("Failed to fetch finances:", error);
    }
  };

  useEffect(() => {
    getFinances();
  }, [viewMyRecords]);

  const handleEdit = (finance) => {
    message.success(`Editing finance record: ${finance?.title}`, 1);
  };

  const handleDelete = (finance) => {
    message.error(`Deleting finance record: ${finance?.title}`, 1);
  };

  // Define columns for the finances table
  const financeColumns = [
    {
      key: "title_and_description",
      label: "Title & Description",
      sortable: true,
      renderCell: (item) => (
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{item.title}</p>
          <p className="text-xs text-gray-500">
            {item.description?.slice(0, 30)}
            {item.description && item.description.length > 30 ? " ..." : ""}
          </p>
        </div>
      ),
    },
    {
      key: "transaction_type",
      label: "Type",
      type: "status",
      sortable: true,
    },
    {
      key: "amount_and_gasfee",
      label: "Amount & Gas Fee",
      sortable: true,
      renderCell: (item) => (
        <div className="flex flex-col">
          <p className="text-sm font-semibold">
            {item.transaction_type === "income"
              ? `Ksh ${Math.abs(item.amount).toFixed(2)}`
              : `-Ksh ${Math.abs(item.amount).toFixed(2)}`}
          </p>
          <p className="text-xs text-gray-500">
            Gas Fee: Ksh{" "}
            {item.transaction_cost ? item.transaction_cost.toFixed(2) : "0.00"}
            {" "}bob
          </p>
        </div>
      ),
    },
  ];

  if (finances.some((item) => item.created_at)) {
    financeColumns.push({
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
    <div className="min-h-screen font-[sans-serif] overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <Switch
          checked={viewMyRecords}
          onChange={(checked) => setViewMyRecords(checked)}
          checkedChildren="My Records"
          unCheckedChildren="All Records"
        />
      </div>
      <DashTable
        data={finances}
        columns={financeColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Pagination meta={meta} onPageChange={getFinances} />
      <FloatButton
        icon={<PlusOutlined />}
        tooltip={<div>Create New Finance Record</div>}
        onClick={() => {
          message.success("Creating new finance record...");
        }}
      />
    </div>
  );
}
