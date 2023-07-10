import React from "react";
import "../assets/styles/home.css";
import { MDBBtn } from "mdb-react-ui-kit";
import { message } from "antd";
import axios from 'axios';

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/actions";

export default function Home() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);

  const handleLogout = async () => {
    try {
      const response = await axios.delete('/api/logout');
      dispatch(logout());
      message.success(response.data.message);
    } catch (error) {
      console.error(error);
      message.error("Failed to logout");
    }
  }

//   console.log(userData.userData)

  return (
    <div className="home">
      <h2 className="text-bold">Home</h2>
      <p>Welcome to my Home Page</p>
      {userData?.userData && (
        <div>
          <p className="user-info">
            <span className="info-label">User:</span> {userData.userData.username}
          </p>
          <p className="user-info">
            <span className="info-label">Email:</span> {userData.userData.email}
          </p>
        </div>
      )}
      <MDBBtn onClick={handleLogout} color="danger">Log out</MDBBtn>
    </div>
  );
}
