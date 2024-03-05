import React from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import LocalizeRoute from "./pages/LocalizeRoute";
import Home from "./pages/Home";
import { store } from "./redux/store";

const App = () => {
  return (
    <div className="App">
      <CookiesProvider>
        <Provider store={store}>
          <Routes>
            <Route path="/:locale/*" element={<LocalizeRoute />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Provider>
      </CookiesProvider>
    </div>
  );
};

export default App;
