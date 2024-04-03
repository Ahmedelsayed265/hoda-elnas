import React, { useEffect, useState } from "react";
import availableCoursesIcon from "../../../assets/images/availableCourses.svg";
import inReview from "../../../assets/images/inReview.svg";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "./../../../util/axios";

const MyCourses = () => {
  const lang = useSelector((state) => state.language.lang);
  const user = useSelector((state) => state.authedUser.user);
  const [myCourses, setMyCourses] = useState([]);
  const [orders, setOrders] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // handle protected route
  useEffect(() => {
    if (user?.logged === false) {
      navigate("/login");
    }
  }, [user?.logged, navigate]);

  // get data
  useEffect(() => {
    const getMyCourses = async () => {
      try {
        const response = await axios.get(
          `/members/List_student_subs/?user_id=${user.id}`
        );
        if (response.status === 200) {
          setMyCourses(response?.data?.message);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const getOrders = async () => {
      try {
        const response = await axios.get(
          `/members/List_order/?user_id=${user.id}&pending=true`
        );
        if (response.status === 200) {
          setOrders(response?.data?.message);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getMyCourses();
    getOrders();
  }, [user?.id, lang]);

  return (
    <section className="my_courses">
      <div className="container">
        {myCourses?.length > 0 && orders?.length > 0 ? (
          <>
          {
            
          }
            <div className="row m-0 mb-5">
              <div className="col-12 p-2 mb-2">
                <div className="my_courses_title">
                  <img src={availableCoursesIcon} alt="available courses" />
                  <h2>{t("availableCourses")}</h2>
                </div>
              </div>
            </div>
            <div className="row m-0 mb-2">
              <div className="col-12 p-2">
                <div className="my_courses_title">
                  <img src={inReview} alt="available courses" />
                  <h2>{t("inReviewCourses")}</h2>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="row m-0 justify-content-center">
            <div className="col-lg-6 col-12 p-2">
              <div className="noCourses">
                <h3>{t("nocoursesFound")}</h3>
                <Link to={"/courses"}>{t("browseAndStartLearning")}</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyCourses;
