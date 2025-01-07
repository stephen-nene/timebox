import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/index.css";
import { Analytics } from "@vercel/analytics/react";


import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
        <Analytics />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
);
