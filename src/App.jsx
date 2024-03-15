import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Visuals from "./pages/Visuals";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import { useJwt } from "react-jwt";
import { setLogged, setToken, setUser } from "./redux/slices/authedUser";
import axios from "./util/axios";
import Logout from "./util/logout";
import CourseDetails from "./pages/CourseDetails";
import Acoustics from "./pages/Acoustics";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import Faqs from "./pages/Faqs";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import JobDetails from "./pages/JobDetails";
import ApplyForJob from "./pages/ApplyForJob";
import { setCourses } from "./redux/slices/courses";
import Profile from "./pages/Profile";

const App = () => {
  const [cookies, , removeCookie] = useCookies();
  const dispatch = useDispatch();
  const refreshToken = cookies?.refreshToken;
  const { decodedToken, isExpired } = useJwt(refreshToken || "");

  const getAllData = async () => {
    const courses = axios.get("/learningcenter/list_courses/");
    const [coursesData] = await Promise.all([courses]);
    dispatch(setCourses(coursesData.data));
  };

  useEffect(() => {
    if (decodedToken && !isExpired) {
      const userId = decodedToken?.user_id;
      const token = axios.post(`/api/token/refresh/`, {
        refresh: refreshToken
      });
      token
        .then((res) => {
          dispatch(setToken(res.data.access));
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.access}`;
          dispatch(setLogged(true));
          const user = axios.get(`/accounts/list_users/?user_id=${userId}`);
          user
            .then((res) => {
              dispatch(setUser(res.data.message[0]));
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (isExpired) {
      removeCookie();
    }
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decodedToken, isExpired, dispatch, refreshToken, removeCookie]);

  return (
    <>
      <Nav />
      <main>
        <Routes>
          {/* pages */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/acoustics" element={<Acoustics />} />
          <Route path="/visuals" element={<Visuals />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/jobs/:id/apply" element={<ApplyForJob />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<Contact />} />
          {/* auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* utils */}
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
