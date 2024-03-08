import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
/*---------- fontawesome ----------*/
import "./assets/css/all.min.css";
/*---------- bootstrap ------------*/
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
/*---------- toastify css ---------*/
import "../node_modules/react-toastify/dist/ReactToastify.css";
/*---------- app style global -----*/
import "./assets/css/global.css";
/*---------- i18n -----*/
import "./util/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
