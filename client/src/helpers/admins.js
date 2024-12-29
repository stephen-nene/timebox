import apiClient from "./apiClient.js";
import { message } from "antd";
import {
  setUserPageData,
  setFinancesPageData,
  setCategoriesPageData
} from "../store/actions/appAction.js";

function showMessage(type, content, duration) {
  return message[type]({
    content,
    duration,
  });
}

export async function fetchUsers(page = 1, dispatch) {
  const loadingMessage = showMessage("loading", "fetching users", 0);
  try {
    const response = await apiClient.get(`/users?page=${page}`);
    if (response.status === 200) {
      dispatch(setUserPageData(page, response.data));
      return response.data;
    } else {
      // console.error("Failed to fetch users:", response.data);
      showMessage("error", "Failed to fetch users. Please try again.", 3);
      throw new Error("Failed to fetch users.");
    }
  } catch (error) {
    // console.error("Error fetching users:", error);
    showMessage("error", "Failed to fetch users. Please try again.", 3);
    throw error;
  } finally {
    loadingMessage();
  }
}

export async function fetchMeetings(page = 1, dispatch) {
  const loadingMessage = showMessage("loading", "fetching meetings", 0);
  try {
    const response = await apiClient.get(`/meetings?page=${page}`);
    if (response.status === 200) {
      dispatch(setMeetingsPageData(page, response.data));
      return response.data;
    } else {
      // console.error("Failed to fetch meetings:", response.data);
      showMessage("error", "Failed to fetch meetings. Please try again.", 3);
      throw new Error("Failed to fetch meetings.");
    }
  } catch (error) {
    // console.error("Error fetching meetings:", error);
    showMessage("error", "Failed to fetch meetings. Please try again.", 3);
    throw error;
  } finally {
    loadingMessage();
  }
}

export async function fetchScholarships(page, dispatch) {
  const loadingMessage = showMessage("loading", "fetching scholarships", 0);
  try {
    const response = await apiClient.get(`/scholarships?page=${page}`);
    if (response.status === 200) {
      dispatch(setScholarshipPageData(page, response.data));
      return response.data;
    } else {
      // console.error("Failed to fetch scholarships:", response.data);
      showMessage(
        "error",
        "Failed to fetch scholarships. Please try again.",
        3
      );
      throw new Error("Failed to fetch scholarships.");
    }
  } catch (error) {
    // console.error("Error fetching scholarships:", error);
    showMessage("error", "Failed to fetch scholarships. Please try again.", 3);
    throw error;
  } finally {
    loadingMessage();
  }
}

export async function fetchFinances(page = 1, dispatch, viewMyRecords = false) {
  const loadingMessage = showMessage("loading", "fetching finances", 0);
  try {
    const response = await apiClient.get(
      `/finances?page=${page}&only_my_records=${viewMyRecords}`
    );
    if (response.status === 200) {
      dispatch(setFinancesPageData(page, response.data, viewMyRecords));
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
  } finally {
    loadingMessage();
  }
}

export async function fetchCategories(page = 1, dispatch) {
  const loadingMessage = showMessage("loading", "fetching categories", 0);
  try {
    const response = await apiClient.get(`/categories?page=${page}`);
    if (response.status === 200) {
      dispatch(setCategoriesPageData(response.data));
      return response.data;
    } else {
      // console.error("Failed to fetch categories:", response.data);
      showMessage("error", "Failed to fetch categories. Please try again.", 3);
      throw new Error("Failed to fetch categories.");
    }
  } catch (error) {
    // console.error("Error fetching categories:", error);
    showMessage("error", "Failed to fetch categories. Please try again.", 3);
    throw error;
  } finally {
    loadingMessage();
  }
}
