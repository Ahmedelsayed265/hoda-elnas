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
import Acoustics from "./pages/Acoustics";
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
import { setCourses } from "./redux/slices/courses";
import { setHighLightedCourses } from "./redux/slices/highlightedCourses";
import { setHomeIntro } from "./redux/slices/homeIntro";
import { setStatistics } from "./redux/slices/statistics";
import { setWhyUs } from "./redux/slices/whyUs";
import { setFaqs } from "./redux/slices/faqs";
import { setTermsConditions } from "./redux/slices/termsConditions";
import { setPrivacy } from "./redux/slices/privacy";
import { setGrantees } from "./redux/slices/granteesObj";
import { setBody, setHeader } from "./redux/slices/comparsion";
import { setFeedBacks } from "./redux/slices/feedBacks";
import { setTitles } from "./redux/slices/sectionsTitles";
import MyCourses from "./components/courses/dashboard/MyCourses";
import CourseDashboard from "./components/courses/dashboard/CourseDashboard";
import MySubscriptions from "./components/subscriptions/MySubscriptions";
import MyStudents from "./components/my-students/MyStudents";

const App = () => {
  const lang = useSelector((state) => state.language.lang);
  const [loading, setLoading] = React.useState(true);
  const [cookies, , removeCookie] = useCookies();
  const dispatch = useDispatch();
  const refreshToken = cookies?.refreshToken;
  const { decodedToken, isExpired } = useJwt(refreshToken || "");

  const getAllData = async () => {
    setLoading(true);
    // end points
    const courses = axios.get("/learningcenter/list_courses/");
    const highlightedCourses = axios.get(
      "/learningcenter/list_courses/?highlight=true"
    );
    const homeIntro = axios.get("/landingpages/List_web_header/");
    const statistics = axios.get("/landingpages/List_statistics_section/");
    const whyUs = axios.get("/landingpages/List_why_you_join_us/");
    const faqs = axios.get("/landingpages/List_FAQ/");
    const termsConditions = axios.get("/landingpages/List_TermsAndConditions/");
    const privacyPolicy = axios.get("/landingpages/List_TermsAndConditions/");
    const grantees = axios.get("/landingpages/List_grantees/");
    const comparsionHeader = axios.get("/landingpages/List_comparsion_header/");
    const comparsionBody = axios.get("/landingpages/List_comparsion_body/");
    const feedBacks = axios.get(
      "/landingpages/List_reviews/?type=audio&status=published"
    );
    const titles = axios.get("/landingpages/List_sections_title/");

    // fetch all
    const [
      coursesData,
      homeIntroData,
      highlightedCoursesData,
      statisticsData,
      whyUsData,
      faqsData,
      termsConditionsData,
      privacyPolicyData,
      granteesData,
      comparsionHeaderData,
      comparsionBodyData,
      feedBacksData,
      titlesData
    ] = await Promise.all([
      courses,
      homeIntro,
      highlightedCourses,
      statistics,
      whyUs,
      faqs,
      termsConditions,
      privacyPolicy,
      grantees,
      comparsionHeader,
      comparsionBody,
      feedBacks,
      titles
    ]);

    // dispatch
    dispatch(setCourses(coursesData?.data?.message));
    dispatch(setHomeIntro(homeIntroData?.data?.message[0]));
    dispatch(setHighLightedCourses(highlightedCoursesData?.data?.message));
    dispatch(setStatistics(statisticsData?.data?.message));
    dispatch(setWhyUs(whyUsData?.data?.message));
    dispatch(setFaqs(faqsData?.data?.message));
    dispatch(setTermsConditions(termsConditionsData?.data?.message));
    dispatch(setPrivacy(privacyPolicyData?.data?.message));
    dispatch(setGrantees(granteesData?.data?.message[0]));
    dispatch(setHeader(comparsionHeaderData?.data?.message[0]));
    dispatch(setBody(comparsionBodyData?.data?.message));
    dispatch(setFeedBacks(feedBacksData?.data?.message));
    dispatch(setTitles(titlesData?.data?.message[0]));
    setLoading(false);
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
  }, [decodedToken, isExpired, dispatch, refreshToken, removeCookie]);

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

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
          <Route path="/my-subscriptions" element={<MySubscriptions />} />
          <Route path="/my-students" element={<MyStudents />} />

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
      {loading && <Loader />}
    </>
  );
};

export default App;
