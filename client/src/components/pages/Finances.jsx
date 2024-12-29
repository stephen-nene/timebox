import React, { useState, useEffect } from "react";
import { FloatButton, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { fetchFinances } from "../../helpers/normal";
import Cards from "./wrappers/Finances/Cards";
import DateChanger from "./wrappers/Finances/DateChanger.jsx";
import { Link } from "react-router-dom";

export default function Finances() {
  const [financeData, setFinanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [lastFetchedDate, setLastFetchedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [serverResponse, setServerResponse] = useState(null); // New state to track server response

  const formatDate = (date) => {
    if (date && !isNaN(new Date(date))) {
      return new Date(date).toISOString().split("T")[0];
    }
    return "";
  };
  const handleDeleteFinance = (deletedId) => {
    // Remove the deleted item from the local state
    setFinanceData((prev) => prev.filter((item) => item.id !== deletedId));
  };

  const getFinances = async (page = 1) => {
   const serverRes = await fetchFinances(page, setFinanceData, setLastFetchedDate);
   setServerResponse(serverRes)
    setCurrentPage(page);
  };

  const selectedDateObj = formatDate(selectedDate);
  const lastFetchedDateObj = formatDate(lastFetchedDate);

  useEffect(() => {
    // console.log(!serverResponse?.meta,serverResponse?.meta)
    if (!serverResponse?.meta) {
      getFinances(1); // Fetch the first page if no data exists yet
    }

    if (lastFetchedDate && selectedDateObj <= lastFetchedDateObj) {
      setCurrentPage((prevPage) => prevPage + 1);
      getFinances(currentPage + 1);
    }
  }, [selectedDate]);

  return (
    <div className="p-6 font-sans">
      <DateChanger
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Cards
        financeData={financeData}
        dateToView={selectedDate}
        onDelete={handleDeleteFinance}
      />
      <Link to="/finances/new">
        <FloatButton
          icon={<PlusOutlined />}
          tooltip="Create New Category"
          // onClick={() => message.success("Creating new category...")}
        />
      </Link>
    </div>
  );
}
