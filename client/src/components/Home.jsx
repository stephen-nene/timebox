import React from "react";
import "../assets/styles/home.css"
import { MDBBtn } from "mdb-react-ui-kit";
import { message } from "antd";

import { useDispatch } from "react-redux";
import { logout } from "../store/actions/actions";

export default function Home()  {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        message.success("logging out ......")
        
    }

    return (
       <div className="home">
        <h2 className="text-bold">home</h2>
        <p >Welcome to my home Page</p>
        <MDBBtn onClick={handleLogout} color="danger">log-out</MDBBtn>
       </div>
    );
}