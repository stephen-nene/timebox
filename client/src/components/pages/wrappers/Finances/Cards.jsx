import React, { useState } from "react";
import { FcExpand, FcCollapse } from "react-icons/fc";
import { message, Modal } from "antd";
import apiClient from "../../../../helpers/apiClient";

export default function FinanceCards({ financeData, dateToView, onDelete }) {
  const [openSections, setOpenSections] = useState({
    income: true,
    expense: false,
  });

  const formatDate = (date) => date.toISOString().split("T")[0];

  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      day: "numeric",
      month:"short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(date));
  };

  const selectedDate = formatDate(dateToView);

  const filterFinanceByType = (type) =>
    financeData
      ? financeData.filter((finance) => {
          const financeDate = finance.date_created
            ? new Date(finance.date_created).toISOString().split("T")[0]
            : null;
          return (
            finance.transaction_type === type && financeDate === selectedDate
          );
        })
      : [];

  const incomes = filterFinanceByType("income");
  const expenses = filterFinanceByType("expense");

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const toggleSection = (type) => {
    setOpenSections((prev) => ({
      income: type === "income" ? !prev.income : false,
      expense: type === "expense" ? !prev.expense : false,
    }));
  };

  const handleItemDelete = (finance) => {
    Modal.confirm({
      title: "Delete Finance Entry",
      content: `Are you sure you want to delete "${finance.title}"?`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "No, Cancel",
      onOk: async () => {
        try {
          await apiClient.delete(`/finances/${finance.id}`);
          message.success(`Successfully deleted ${finance.title}`);

          // Call the onDelete prop to trigger parent component to refresh data
          if (onDelete) {
            onDelete(finance.id);
          }
        } catch (error) {
          console.error("Error deleting finance entry:", error);
          message.error("Failed to delete the entry. Please try again.");
        }
      },
      onCancel() {
        // Do nothing when cancelled
      },
    });
  };

  const renderFinanceSection = (type, items, total) => {
    const isOpen =
      type === "income" ? openSections.income : openSections.expense;
    const bgColors = {
      income: {
        main: "bg-green-400 ",
        item: "bg-green-100 hover:bg-rose-50",
        totalText: "text-green-900",
      },
      expense: {
        main: "bg-rose-400",
        item: "bg-rose-300 hover:bg-green-50",
        totalText: "text-red-950",
      },
    }[type];

    return (
      <div
        className={`dark:text-black rounded-lg ${bgColors.main} transition-all`}
        role="accordion"
      >
        <button
          type="button"
          className="w-full text-base font-semibold text-left p-6 text-gray-800 flex items-center"
          onClick={() => toggleSection(type)}
        >
          <span className="mr-4 capitalize">{type}s</span>
          <span className={`text-md font-medium ${bgColors.totalText}`}>
            Ksh {total.toFixed(2)}
          </span>
          {isOpen ? (
            <FcCollapse className="text-2xl fill-current ml-auto shrink-0" />
          ) : (
            <FcExpand className="text-2xl fill-current ml-auto shrink-0" />
          )}
        </button>

        {isOpen && (
          <div className="pb-6 px-6">
            {items.length > 0 ? (
              items.map((finance) => (
                <div
                  key={finance.id}
                  className={`my-2 cursor-pointer  ${bgColors.item} p-2 rounded-lg group`}
                >
                  <div onClick={() => handleItemDelete(finance)}>
                    <h4 className="font-semibold">{finance.title}</h4>
                    <p>{finance.description}</p>
                    <p>
                      <strong>Amount:</strong> Ksh {finance.amount}
                    </p>
                    <p>
                      <strong>Transaction Cost:</strong> Ksh{' '}
                      {finance.transaction_cost}
                    </p>
                    {finance.recurring && (
                      <p>
                        <strong>Recurring:</strong>{" "}
                        {finance.recurring.frequency} until{" "}
                        {finance.recurring.end_date}
                      </p>
                    )}
                    <p>
                      <strong>Created At:</strong>{" "}
                      {formatDateTime(finance.date_created)}
                    </p>
                  </div>
                  {/* <div className="hidden group-hover:block text-right mt-2">
                    <button
                      className="text-red-600 hover:text-red-800 font-semibold"
                      onClick={() => handleItemDelete(finance)}
                    >
                      Delete
                    </button>
                  </div> */}
                </div>
              ))
            ) : (
              <div className="pb-6 text-center text-gray-500">
                <p>No {type} records available.</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Check if no data found for both expenses and incomes
  const noDataMessage =
    !financeData || (expenses.length === 0 && incomes.length === 0);

  return (
    <div className="font-[sans-serif] space-y-4 max-w-5xl mx-auto mt-4">
      {noDataMessage ? (
        <div className="bg-yellow-100 p-4 rounded-lg text-center text-gray-800">
          <h3>No finance data available.</h3>
          <p>
            It seems there are no expenses or incomes recorded. Please add new
            entries using the button below.
          </p>
        </div>
      ) : (
        <>
          {renderFinanceSection("income", incomes, totalIncome)}
          {renderFinanceSection("expense", expenses, totalExpenses)}

          <div className="flex items-center justify-between p-6">
            <span className="text-lg font-extrabold text-gray-80">
              Daily Summary
            </span>
            <span className="text-2xl font-semibold text-red-500">
              Ksh {new Intl.NumberFormat().format(totalIncome - totalExpenses)}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
