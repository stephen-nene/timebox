import { Button } from "antd";
import { MDBBtn } from "mdb-react-ui-kit";
import React from "react";

export default function Home()  {
    return (
       <div className="home">
        <h2 className="text-white">home</h2>
        <p >home</p>
        <Button danger type="primary">logout</Button>
        <MDBBtn color="danger">log-out</MDBBtn>
       </div>
    );
}