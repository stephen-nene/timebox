import apiClient from "./apiClient";
import { message } from "antd";

function showMessage(type, content, duration) {
  return message[type]({
    content,
    duration,
  });
}

export async function fetchFinances(page = 1,setFinanceData,setLastFetcheddate,viewMyRecords = true){
    try {
      const response = await apiClient.get(`/finances?page=${page}&only_my_records=${viewMyRecords}`);
      if (response.status === 200) {
        setFinanceData((prevData) => {
          // If prevData is not an array, default it to an empty array
          const dataToAppend = Array.isArray(prevData) ? prevData : [];
          
          // Filter out any duplicates based on a unique identifier (e.g., id)
          const newData = response?.data?.finances || [];
          const filteredNewData = newData.filter(item => !dataToAppend.some(existingItem => existingItem.id === item.id));
  
          // Append the filtered new data (without duplicates) to the existing data
          return [...dataToAppend, ...filteredNewData];
        });
  
        // setFinanceData(response?.data?.finances)
        const lastItem = response?.data?.finances[response.data.finances.length - 1];
        // console.log(lastItem)
        setLastFetcheddate(new Date(lastItem?.created_at));

        return response.data;
      } else {
        // console.error("Failed to fetch finances:", response.data);
        showMessage("error", "Failed to fetch finances. Please try again.", 3);
        throw new Error("Failed to fetch finances.");
      }
    } catch (error) {
      // console.error("Error fetching finances:", error);
      showMessage("error", "Failed to fetch finances. Please try again.", 3);
      throw error;
    }
}