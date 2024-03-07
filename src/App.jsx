import React from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import LocalizeRoute from "./pages/LocalizeRoute";
import { store } from "./redux/store";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Subscriptions from "./pages/Subscriptions";
import Visuals from "./pages/Visuals";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <Nav />
        <main>
          <Routes>
            <Route path="/:locale/*" element={<LocalizeRoute />} />
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/visuals" element={<Visuals />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </Provider>
    </CookiesProvider>
  );
};

export default App;
