import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import LocalizeRoute from "./pages/LocalizeRoute";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Subscriptions from "./pages/Subscriptions";
import Visuals from "./pages/Visuals";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import { useJwt } from "react-jwt";
import { setToken, setUser } from "./redux/slices/authedUser";
import axios from "./util/axios";

const App = () => {
  const [cookies, , removeCookie] = useCookies();
  const dispatch = useDispatch();
  const refreshToken = cookies?.refreshToken;
  const { decodedToken, isExpired } = useJwt(refreshToken || "");

  useEffect(() => {
    if (decodedToken && !isExpired) {
      const userId = decodedToken?.user_id;
      const setAuthorizationHeader = async (token) => {
        try {
          const res = await axios.post("/api/token/refresh/", {
            refresh: token
          });
          dispatch(setToken(res.data.access));
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.access}`;
        } catch (error) {
          console.log(error);
        }
      };
      const getAuthedUser = async () => {
        const user = await axios.get(`/list_users/?user_id=${userId}`);
        dispatch(setUser(user.data));
      };
      setAuthorizationHeader(refreshToken);
      getAuthedUser();
    } else if (isExpired) {
      removeCookie("refreshToken");
    }
  }, [decodedToken, isExpired, dispatch, refreshToken, removeCookie]);

  return (
    <>
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
    </>
  );
};

export default App;
