import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./util/i18n";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { CookiesProvider } from "react-cookie";
import ToTopOnNavigation from "./util/ToTopOnNavigation";

/*---------- styles ----------*/
/*----------------------------*/
/*----------------------------*/
/*----------------------------*/
/*---------- fontawesome ----------*/
import "./assets/css/all.min.css";
/*---------- bootstrap ------------*/
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
/*---------- toastify css ---------*/
import "../node_modules/react-toastify/dist/ReactToastify.css";
/*---------- app style global -----*/
import "./assets/css/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CookiesProvider>
      <ToastContainer />
      <Provider store={store}>
        <ToTopOnNavigation />
        <App />
      </Provider>
    </CookiesProvider>
  </BrowserRouter>
);
