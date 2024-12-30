import apiClient from "./apiClient";
import { message } from "antd";
import { loginAction, signupAction,logoutAction } from "../store/actions/userAction";

function showMessage(type, content, duration) {
  return message[type]({
    content,
    duration,
  });
}

export async function resetPassword(data) {
  try {
    const response = await apiClient.put("/auth/reset_password", data);
    showMessage("success", response.data.message);
    // console.log(response.data)
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Failed to reset password. Try again.";
    showMessage("error", errorMessage);
    throw new Error(errorMessage);
  }
}

export const getCurrentUser = async (dispatch, navigate) => {

  try {
    const response = await apiClient.get("auth/me"); 

    if (response.status === 200) {
      showMessage("success", `welcome ${response.data.username}`, 1);
      dispatch(loginAction(response.data));
      // console.log(response)
      return response.data;
    } else {
      showMessage("error", "Failed to fetch user data", 2);
      throw new Error("Failed to fetch user data");
    }
  } catch (error) {
    // console.log(error);
    // showMessage("error", error?.response?.data?.error || "An error occurred", 3);
  }
};

export const serverLogin = async (values, navigate, dispatch) => {
  const loadingMessage = message.loading("Logging in...", 0);

  try {
    const response = await apiClient.post("auth/login", values); // Use the custom Axios instance
    if (response.status === 200) {
      loadingMessage();
      showMessage("success", response?.data?.message, 2);
      dispatch(loginAction(response.data.user));
      navigate("/profile");
      return response.data;
    } else {
      loadingMessage();
      showMessage("error", "Login Failed", 2);
      throw new Error("Login failed");
    }
  } catch (error) {
    loadingMessage();
    // showMessage("error", error?.response?.data?.error, 3);
    throw error;
  } finally {
    loadingMessage();
  }
};

export const serverSignup = async (values, navigate,dispatch) => {
  const loadingMessage = message.loading("Signing up...", 0);

  try {
    const response = await apiClient.post("auth/register", values); // Use the custom Axios instance
    if (response.status === 201) {
      loadingMessage();
      showMessage("success", response?.data?.message, 3);
      // navigate("/login");
      dispatch(signupAction(response.data.user));
      return response.data;
    }
  } catch (error) {
    loadingMessage();
    // console.error("Error response:", error);
    throw error;
  } finally {
    loadingMessage();
  }
};

export const serverLogout = async (dispatch,navigate)=>{
  try {
    const response = await apiClient.delete("auth/logout"); 
    if (response.status === 200) {
      showMessage("success", response?.data?.message, 2);
      navigate("/");
      dispatch(logoutAction());
      // console.log("logout",response)
      return response.data;
    } else {
      showMessage("error", "Logout Failed", 2);
      throw new Error("Logout failed");
    }
  } catch (error) {
    showMessage("error", error?.response?.data?.error, 3);
  }
}

export const serverForgotPass = async (email) => {
  try {
    const response = await apiClient.post("auth/forgot_password",{email}); 
    if (response.status === 200) {
      // console.log(response.data)
      showMessage("success", response?.data?.message, 2);
      return response.data;
    } else {
      showMessage("error", "Failed to send password reset email", 2);
      throw new Error("Failed to send password reset email");
    }
  } catch (error) {
    showMessage("error", error?.response?.data?.error, 3);
    throw error;
  }
}