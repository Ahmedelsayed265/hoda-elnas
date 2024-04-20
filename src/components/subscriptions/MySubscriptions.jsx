import React, { useEffect, useState } from "react";
import subsIcon from "../../assets/images/subs.svg";
import { useTranslation } from "react-i18next";
import axios from "./../../util/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CourseSubCard from "./CourseSubCard";
import DataLoader from "../ui/DataLoader";

const MySubscriptions = () => {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.language.lang);
  const user = useSelector((state) => state.authedUser.user);
  const logged = useSelector((state) => state.authedUser.logged);
  const [mySubscriptions, setMySubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // handle protected route
  useEffect(() => {
    if (!user) {
      return;
    }
    if (!logged) {
      navigate("/login");
    }
  }, [logged, navigate, user]);
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
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSupscriptions();
  }, [user?.id, lang]);

  return (
    <section className="my-subscriptions">
      <div className="container">
        <div className="row m-0">
          <div className="col-12 p-2">
            <div className="section_title">
              <div className="img">
                <img src={subsIcon} alt="subs" />
              </div>
              <h2>{t("coursesSubs")}</h2>
            </div>
          </div>
          {loading ? (
            <DataLoader />
          ) : (
            <>
              {mySubscriptions?.map((subscription) => (
                <div
                  className="col-lg-4 col-md-6 col-12 p-2"
                  key={subscription?.id}
                >
                  <CourseSubCard subscription={subscription} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MySubscriptions;
