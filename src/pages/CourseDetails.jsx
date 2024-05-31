import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../constants";
import VideoModal from "../components/ui/VideoModal";
import CourseFaqs from "../components/courses/course-details/CourseFaqs";
import WhyUs from "../components/courses/course-details/WhyUs";
import Reviews from "../components/courses/course-details/Reviews";
import Plans from "../components/courses/course-details/Plans";
import RoadMap from "../components/courses/course-details/RoadMap";

const CourseDetails = () => {
  const [showModal, setShowModal] = React.useState(false);
  const { t } = useTranslation();
  const { slug } = useParams();
  const logged = useSelector((state) => state.authedUser.logged);
  const courses = useSelector((state) => state.courses.courses);
  const course = courses.find((c) => c.slug === slug);
  const plansRef = React.useRef(null);

  const scrollToPlans = () => {
    if (plansRef.current) {
      const top =
        plansRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="course-details">
        <div className="container">
          <div className="row m-0">
            <div className="col-lg-8 col-12 p-2 ps-lg-4 ps-2 order-lg-0 order-1">
              <div className="content">
                <h4>{course?.name}</h4>
                <p>{course?.description}</p>
                <h6>{t("courseGoals")}</h6>
                <ul>
                  {course?.outcome?.split("\r\n").map((outcome, index) => (
                    <li key={index}>{outcome}</li>
                  ))}
                </ul>
                <h6>{t("thiCourseIncludes")}</h6>
                <ul className="iconCheck">
                  {course?.benefits?.split("\r").map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-12 p-2 order-lg-1 order-0">
              <div
                className="video_wrapper"
                style={{
                  backgroundImage: `url(${BASE_URL}${course?.background})`
                }}
              >
                {course?.installment && <span>{t("installment")}</span>}
                {course?.promo && (
                  <div className="play-btn" onClick={() => setShowModal(true)}>
                    <i className="fa-light fa-play"></i>{" "}
                    <div className="waves-block">
                      <div className="waves wave-1"></div>
                      <div className="waves wave-2"></div>
                      <div className="waves wave-3"></div>
                    </div>
                  </div>
                )}
              </div>
              {course?.same_page_checkout ? (
                <button className="btn" onClick={scrollToPlans}>
                  {t("subscribe")}
                </button>
              ) : (
                <Link className="btn" to={`/courses/${slug}/subscripe`}>
                  {t("subscribe")}
                </Link>
              )}
              {!logged && (
                <p className="alreadySub">
                  {t("alreadySubscribed")}
                  <Link to="/login">{t("login")}</Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      <WhyUs grantees={course?.grantees} title={course?.grantees_title} />
      <RoadMap learningPath={course?.LearningPath} />
      {course?.same_page_checkout && (
        <Plans
          ref={plansRef}
          slug={course?.slug}
          paymentMethods={course?.payment_methods}
          requiresLogin={course?.requires_login}
          course={course}
        />
      )}
      <CourseFaqs faqs={course?.FAQ} />
      <Reviews />
      <VideoModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default CourseDetails;
