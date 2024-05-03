import React, { useEffect } from "react";
import Logout from "./util/logout";
import axios from "./util/axios";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
// =========== layout =========== //
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Loader from "./components/layout/Loader";
// =========== pages ============ //
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Visuals from "./pages/Visuals";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import CourseDetails from "./pages/CourseDetails";
import Audios from "./pages/Audios";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import Faqs from "./pages/Faqs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Contact from "./pages/Contact";
import JobDetails from "./pages/JobDetails";
import ApplyForJob from "./pages/ApplyForJob";
import Profile from "./pages/Profile";
import Subscribe from "./components/courses/subscription/Subscribe";
// =========== redux =========== //
import { setLogged, setToken, setUser } from "./redux/slices/authedUser";
import MyCourses from "./components/courses/dashboard/MyCourses";
import CourseDashboard from "./components/courses/dashboard/CourseDashboard";
import MySubscriptions from "./components/subscriptions/MySubscriptions";
import MyStudents from "./components/my-students/MyStudents";
import useFetchData from "./util/useFetchData ";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { setId, setIsPlaying, setSrc } from "./redux/slices/audioSrc";
import LibirarySubscribe from "./components/libirary/LibirarySubscribe";

const App = () => {
  const [cookies, , removeCookie] = useCookies();
  const refreshToken = cookies?.refreshToken;
  const { decodedToken, isExpired } = useJwt(refreshToken || "");
  const lang = useSelector((state) => state.language.lang);
  const dispatch = useDispatch();
  const loading = useFetchData(dispatch, lang);
  const currentAudio = useSelector((state) => state.audioSrc);

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
  }, [decodedToken, isExpired, dispatch, refreshToken, removeCookie]);

  return (
    <>
      <Nav />
      <main>
        <Routes>
          {/* pages */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetails />} />
          <Route path="/courses/:slug/subscripe" element={<Subscribe />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route
            path="/dashboard/:subscriptionId/*"
            element={<CourseDashboard />}
          />
          <Route path="/audios/*" element={<Audios />} />
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
          <Route path="/my-subscriptions" element={<MySubscriptions />} />
          <Route path="/my-students" element={<MyStudents />} />
          <Route path="/library-subscribe" element={<LibirarySubscribe />} />
          {/* auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* utils */}
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      {currentAudio.src && (
        <div className="audio_player_container">
          <div className="close_player">
            <i
              className="fa-regular fa-circle-xmark"
              onClick={() => {
                dispatch(setSrc(""));
                dispatch(setId(""));
                dispatch(setIsPlaying(false));
              }}
            />
          </div>
          <h5 className="audio_title">"{currentAudio.name}"</h5>
          <AudioPlayer
            autoPlay
            src={currentAudio.src}
            onEnded={() => {
              dispatch(setSrc(""));
              dispatch(setIsPlaying(false));
              dispatch(setId(""));
            }}
            onPlay={() => {
              dispatch(setIsPlaying(true));
            }}
            onPause={() => {
              dispatch(setIsPlaying(false));
            }}
          />
        </div>
      )}
      <Footer />
      {loading && <Loader />}
    </>
  );
};

export default App;
