import React, { useEffect, useState } from "react";
import axios from "./../../../util/axios";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OrderCourseCard from "./cards/OrderCourseCard";
import AvailableCourse from "./cards/AvailableCourse";
import inReview from "../../../assets/images/inReview.svg";
import availableCoursesIcon from "../../../assets/images/availableCourses.svg";
import DataLoader from "../../ui/DataLoader";
import { useCookies } from "react-cookie";

const MyCourses = () => {
  const lang = useSelector((state) => state.language.lang);
  const user = useSelector((state) => state.authedUser.user);
  const [mySubscriptions, setMySubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cookies] = useCookies(["refreshToken"]);
  const isAuthenticated = cookies.refreshToken ? true : false;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // get data
  useEffect(() => {
    const fetchSupscriptions = async () => {
      try {
        setLoading(true);
        const subscriptionsResponse = await axios.get(
          `/members/List_student_subs/?user_id=${user.id}`
        );
        if (subscriptionsResponse.status === 200) {
          setMySubscriptions(subscriptionsResponse?.data?.message);
        }
        const ordersResponse = await axios.get(
          `/members/List_order/?user_id=${user.id}&pending=true`
        );
        if (ordersResponse.status === 200) {
          setOrders(ordersResponse?.data?.message);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSupscriptions();
  }, [user?.id, lang]);

  return (
    <section className="my_courses">
      <div className="container">
        {loading ? (
          <DataLoader />
        ) : (
          <>
            {mySubscriptions?.length === 0 && orders?.length === 0 ? (
              <div className="row m-0 justify-content-center">
                <div className="col-lg-6 col-12 p-2">
                  <div className="noCourses">
                    <h3>{t("nocoursesFound")}</h3>
                    <Link to={"/courses"}>{t("browseAndStartLearning")}</Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {mySubscriptions?.length > 0 && (
                  <div className="row m-0 mb-5">
                    <div className="col-12 p-2 mb-2">
                      <div className="my_courses_title">
                        <img
                          src={availableCoursesIcon}
                          alt="available courses"
                        />
                        <h2>{t("availableCourses")}</h2>
                      </div>
                    </div>
                    {mySubscriptions?.map((suscription) => (
                      <div
                        className="col-lg-4 col-md-6 col-12 p-2"
                        key={suscription?.id}
                      >
                        <AvailableCourse subscription={suscription} />
                      </div>
                    ))}
                  </div>
                )}
                {orders?.length > 0 && (
                  <div className="row m-0 mb-2">
                    <div className="col-12 p-2">
                      <div className="my_courses_title">
                        <img src={inReview} alt="available courses" />
                        <h2>{t("inReviewCourses")}</h2>
                      </div>
                    </div>
                    {orders?.map((order) => (
                      <div
                        className="col-lg-3 col-md-4 col-12 p-2"
                        key={order?.id}
                      >
                        <OrderCourseCard order={order} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default MyCourses;
