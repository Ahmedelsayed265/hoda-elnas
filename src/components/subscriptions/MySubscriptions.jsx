import React, { useEffect, useState } from "react";
import axios from "./../../util/axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import RenewModal from "./RenewModal";
import DataLoader from "../ui/DataLoader";
import { useSelector } from "react-redux";
import CourseSubCard from "./CourseSubCard";
import { useNavigate } from "react-router-dom";
import subsIcon from "../../assets/images/subs.svg";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModal";

const MySubscriptions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language.lang);
  const user = useSelector((state) => state.authedUser.user);
  const logged = useSelector((state) => state.authedUser.logged);

  const [showModal, setShowModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [mySubscriptions, setMySubscriptions] = useState([]);
  const [courseId, setCourseId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(false);

  const [orderData, setOrderData] = useState({
    subscription_id: null,
    recipt: null,
    amount: null,
    paymentMethods: []
  });

  // check if user is logged
  useEffect(() => {
    if (!user) {
      return;
    }
    if (!logged) {
      navigate("/login");
    }
  }, [logged, navigate, user]);

  // fetch course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setCourseLoading(true);
        const res = await axios.get(
          `/learningcenter/list_courses/?id=${courseId}`
        );
        if (res.status === 200) {
          setOrderData((prev) => ({
            ...prev,
            paymentMethods: res?.data?.message[0]?.payment_methods
          }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setCourseLoading(false);
      }
    };
    if (courseId) {
      fetchCourse();
    }
  }, [courseId, showRenewModal]);

  // fetch subscriptions
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

  // cancel subscription
  const handleCancelSubscription = (subscriptionId) => {
    setSubscriptionId(subscriptionId);
    setShowModal(true);
  };
  const deleteHandler = async () => {
    try {
      const response = await axios.put(
        `/members/Cancel_Memebrship/${subscriptionId}/`
      );
      if (response.status === 200) {
        setShowModal(false);
        toast.success(t("cancelSubSuccess"));
        setMySubscriptions(
          mySubscriptions.map((subscription) => {
            if (subscription.id === subscriptionId) {
              return { ...subscription, status: response.data.object.status };
            }
            return subscription;
          })
        );
      } else {
        toast.error(t("auth.someThingWentWrong"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // renew subscription
  const renewOrder = (subscriptionId) => {
    const subscriptionToRenew = mySubscriptions.find(
      (s) => s.id === subscriptionId
    );
    if (subscriptionToRenew) {
      setSubscriptionId(subscriptionId);
      setShowRenewModal(true);
      setCourseId(subscriptionToRenew?.course_id);
      setOrderData({
        subscription_id: subscriptionId,
        totalPrice: subscriptionToRenew?.amount,
        startDate: subscriptionToRenew?.startdate,
        studentsNumber: subscriptionToRenew?.student_number,
        courseDuration: subscriptionToRenew?.cpw,
        lessonsDuration: subscriptionToRenew?.duration
      });
    } else {
      console.log("Subscription not found.");
    }
  };

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
                  <CourseSubCard
                    subscription={subscription}
                    onRenewOrder={() => renewOrder(subscription?.id)}
                    onCancel={() => handleCancelSubscription(subscription?.id)}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <ConfirmDeleteModal
        setShowModal={setShowModal}
        showModal={showModal}
        onDelete={deleteHandler}
        buttonText={t("cancelSub")}
        text={t("areYouSureYouWantCancelSub")}
      />
      <RenewModal
        formData={orderData}
        courseLoading={courseLoading}
        setFormData={setOrderData}
        showModal={showRenewModal}
        setShowModal={setShowRenewModal}
      />
    </section>
  );
};

export default MySubscriptions;
