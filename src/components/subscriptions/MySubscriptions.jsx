import React, { useEffect, useState } from "react";
import axios from "./../../util/axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import RenewModal from "./renew/RenewModal";
import DataLoader from "../ui/DataLoader";
import CourseSubCard from "./CourseSubCard";
import subsIcon from "../../assets/images/subs.svg";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModal";
import UpgradeModal from "./upgrade/UpgradeModal";

const MySubscriptions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language.lang);
  const user = useSelector((state) => state.authedUser.user);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [librarySubs, setLibrarySubs] = useState([]);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [mySubscriptions, setMySubscriptions] = useState([]);
  const [courseId, setCourseId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseLoading, setCourseLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const [subStudents, setSubStudents] = useState([]);
  const [cookies] = useCookies(["refreshToken"]);
  const isAuthenticated = cookies.refreshToken ? true : false;

  const [dataForCompare, setDataForCompare] = useState({
    plan_id: null,
    student_number: null,
    addonLength: null
  });

  const [orderData, setOrderData] = useState({
    subscription_id: null,
    recipt: null,
    amount: null,
    paymentMethods: []
  });

  const [upgradeOrderData, setUpgradeOrderData] = useState({
    subscription_id: null,
    plan_id: null,
    student_number: null,
    active_student_id: [],
    recipt: null,
    amount: null,
    paymentMethods: [],
    addons: [],
    courseDuration: "",
    studentsNumber: "",
    plan: course?.types[0],
    lessonsDuration: course?.duration[0]
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (subscriptionId) {
      let sub = mySubscriptions.find((sub) => sub.id === +subscriptionId);
      setUpgradeOrderData((prev) => ({
        ...prev,
        subscription_id: sub?.id,
        studentsNumber: sub?.student_number,
        plan: sub?.plan_type,
        courseDuration: sub?.cpw,
        addons: sub?.addons,
        lessonsDuration: parseFloat(sub?.duration).toFixed(1)
      }));
      setDataForCompare((prev) => ({
        ...prev,
        plan_id: sub?.plan_id,
        student_number: sub?.student_number,
        addonLength: sub?.addons.length
      }));
      setSubStudents(sub?.enrolled_students);
    }
    if (course) {
      setUpgradeOrderData((prevFormData) => ({
        ...prevFormData,
        paymentMethods: course?.payment_methods
      }));
    }
  }, [course, mySubscriptions, subscriptionId]);

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
          setUpgradeOrderData((prev) => ({
            ...prev,
            paymentMethods: res?.data?.message[0]?.payment_methods
          }));
          setCourse(res?.data?.message[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setCourseLoading(false);
      }
    };
    if (courseId && (showRenewModal || showUpgradeModal)) {
      fetchCourse();
    }
  }, [courseId, showRenewModal, showUpgradeModal]);
  // fetch subscriptions
  useEffect(() => {
    const fetchSupscriptions = async () => {
      try {
        setLoading(true);
        const subscriptionsResponse = await axios.get(
          `/members/List_student_subs/?user_id=${user.id}`
        );
        const libraryRes = await axios.get(
          `/members/List_order/?user_id=${user.id}&approved=true&service=library`
        );
        if (subscriptionsResponse.status === 200) {
          setMySubscriptions(subscriptionsResponse?.data?.message);
        }
        if (libraryRes.status === 200) {
          setLibrarySubs(libraryRes?.data?.message);
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
      if (response?.status === 200) {
        setShowModal(false);
        toast.success(t("cancelSubSuccess"));
        setMySubscriptions(
          mySubscriptions.map((subscription) => {
            if (subscription.id === subscriptionId) {
              return {
                ...subscription,
                status: response?.data?.object?.status,
                status_check: "cancelled",
                status_color: response?.data?.object?.status_color
              };
            }
            return subscription;
          })
        );
      } else {
        toast.error(response?.response?.data?.message);
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
  // upgrade subscription
  const upgradeOrder = (subscriptionId) => {
    const subscriptionToUpgrade = mySubscriptions.find(
      (s) => s.id === subscriptionId
    );
    if (!subscriptionToUpgrade) {
      console.log("Subscription not found.");
      return;
    } else {
      setShowUpgradeModal(true);
      setSubscriptionId(subscriptionId);
      setCourseId(subscriptionToUpgrade?.course_id);
      setOrderData({
        subscription_id: subscriptionId,
        totalPrice: subscriptionToUpgrade?.amount,
        startDate: subscriptionToUpgrade?.startdate,
        studentsNumber: subscriptionToUpgrade?.student_number,
        courseDuration: subscriptionToUpgrade?.cpw,
        lessonsDuration: subscriptionToUpgrade?.duration
      });
    }
  };

  return isAuthenticated ? (
    <section className="my-subscriptions">
      <div className="container">
        <div className="row m-0">
          {!loading && (
            <>
              {librarySubs.length < 1 && (
                <div className="col-12 p-2">
                  <div className="librarySubLink">
                    <Link to="/library-subscribe">
                      {t("librarySubAds")}{" "}
                      <i className="fa-regular fa-arrow-up-right-from-square"></i>
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
          {loading ? (
            <DataLoader />
          ) : (
            <>
              {librarySubs.length > 0 ? (
                <>
                  <div className="col-12 p-2 ">
                    <div className="section_title">
                      <div className="img">
                        <img src={subsIcon} alt="subs" />
                      </div>
                      <h2>{t("coursesSubs")}</h2>
                    </div>
                  </div>
                  {mySubscriptions?.map((subscription) => (
                    <div
                      className="col-lg-4 col-md-6 col-12 p-2"
                      key={subscription?.id}
                    >
                      <CourseSubCard
                        subscription={subscription}
                        onRenewOrder={() => renewOrder(subscription?.id)}
                        onUpgradeOrder={() => upgradeOrder(subscription?.id)}
                        onCancel={() =>
                          handleCancelSubscription(subscription?.id)
                        }
                      />
                    </div>
                  ))}
                </>
              ) : (
                <div className="col-12 p-2">
                  <div className="noSubs">
                    <h1>{t("noSubs")}</h1>
                    <Link to="/courses">{t("browseAndStartLearning")}</Link>
                  </div>
                </div>
              )}
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
        sub={mySubscriptions?.find((sub) => sub?.id === subscriptionId)}
        setShowModal={setShowRenewModal}
      />
      <UpgradeModal
        dataForCompare={dataForCompare}
        subStudents={subStudents}
        formData={upgradeOrderData}
        courseLoading={courseLoading}
        setFormData={setUpgradeOrderData}
        courseObj={course}
        showModal={showUpgradeModal}
        setShowModal={setShowUpgradeModal}
      />
    </section>
  ) : null;
};

export default MySubscriptions;
