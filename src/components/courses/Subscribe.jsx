import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants";

const Subscribe = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const courses = useSelector((state) => state.courses.courses);
  const course = courses.find((c) => c.id === +id);
  const [paymethod, setPaymethod] = useState(
    t("courseSubscribe.imeddiatePayment")
  );
  const [formData, setFormData] = useState({
    studentsNumber: "",
    courseDuration: "",
    lessonsDuration: "30",
    plan: t("courseSubscribe.monthly")
  });
  return (
    <section className="subscribe">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 p-2 order-lg-0 order-1">
            <div className="course_header">
              <h3>{course?.name}</h3>
              <p>{course?.bio}</p>
            </div>
            <form className="form-ui">
              <div className="form_group">
                <div className="input-field">
                  <label htmlFor="studentsNumber">
                    <i className="fa-solid fa-users"></i>
                    {t("courseSubscribe.subscribersNumer")}
                  </label>
                  <input
                    type="number"
                    name="studentsNumber"
                    id="studentsNumber"
                    min="1"
                    max="100"
                    value={formData.studentsNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        studentsNumber: e.target.value
                      })
                    }
                    placeholder="00"
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="courseDuration">
                    <i className="fa-light fa-calendar-days"></i>
                    {t("courseSubscribe.courseDuration")}
                  </label>
                  <input
                    type="number"
                    name="courseDuration"
                    id="courseDuration"
                    min="1"
                    max="100"
                    value={formData.courseDuration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        courseDuration: e.target.value
                      })
                    }
                    placeholder="00"
                  />
                </div>
              </div>
              <div className="form_group">
                <div className="input-field">
                  <label htmlFor="discountCopon">
                    <i className="fa-light fa-tag"></i>
                    {t("courseSubscribe.discountCopon")}
                  </label>
                  <input
                    type="text"
                    name="discountCopon"
                    id="discountCopon"
                    placeholder="Example : kid1234"
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="friendCopon">
                    <i className="fa-light fa-tag"></i>
                    {t("courseSubscribe.friendCopon")}
                  </label>
                  <input
                    type="number"
                    name="friendCopon"
                    id="friendCopon"
                    placeholder="Example : kid1234"
                  />
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="lessonsDuration">
                  <i className="fa-light fa-clock"></i>
                  {t("courseSubscribe.lessonsDuration")}
                </label>
                <div className="time-group">
                  {["30", "45", "60", "90", "120"].map((duration, index) => (
                    <label
                      htmlFor={duration + "min"}
                      key={index}
                      className="duration_check"
                    >
                      <input
                        type="radio"
                        name="duration"
                        id={duration + "min"}
                        value={duration}
                        checked={formData.lessonsDuration === duration}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            lessonsDuration: e.target.value
                          })
                        }
                      />
                      <div className="time">
                        <span>{duration} </span>
                        <span>{t("courseSubscribe.minutes")}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="lessonsDuration">
                  <i className="fa-light fa-clock"></i>
                  {t("courseSubscribe.subscriptionsPlan")}
                </label>
                <div className="time-group">
                  {[
                    t("courseSubscribe.monthly"),
                    t("courseSubscribe.quarterly"),
                    t("courseSubscribe.halfYear"),
                    t("courseSubscribe.yearly")
                  ].map((plan, index) => (
                    <label
                      htmlFor={plan}
                      key={index}
                      className="duration_check"
                    >
                      <input
                        type="radio"
                        name="plan"
                        id={plan}
                        value={plan}
                        checked={formData.plan === plan}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            plan: e.target.value
                          })
                        }
                      />
                      <div className="time">
                        <span>{plan} </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="input-filed">
                <h6>{t("courseSubscribe.additionalServices")}</h6>
                <ul>
                  {Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <li key={index}>
                        <div className="check">
                          <input
                            type="checkbox"
                            id="certificate"
                            name="certificate"
                            value="certificate"
                          />
                          <label htmlFor="certificate">
                            {t("courseSubscribe.certificate")}
                          </label>
                        </div>
                        <div className="price">
                          <span>$200</span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="input-filed">
                <h6>{t("courseSubscribe.payment")}</h6>
                <div className="time-group">
                  {[
                    t("courseSubscribe.imeddiatePayment"),
                    t("courseSubscribe.installment")
                  ].map((paymethd, index) => (
                    <label
                      htmlFor={paymethd}
                      key={index}
                      className="duration_check"
                    >
                      <input
                        type="radio"
                        name="paymethod"
                        id={paymethd}
                        value={paymethd}
                        checked={paymethod === paymethd}
                        onChange={(e) => setPaymethod(e.target.value)}
                      />
                      <div className="time">
                        <span>{paymethd} </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              {paymethod === t("courseSubscribe.imeddiatePayment") && (
                <div className="total">
                  <span className="discount">خصم 50% كوبون kito</span>
                  <div className="price">
                    <h3>{t("courseSubscribe.total")}:</h3>
                    <span>$1200</span>
                  </div>
                </div>
              )}
              {paymethod === t("courseSubscribe.installment") && (
                <div className="input-field">
                  <h6>{t("courseSubscribe.installmentDuration")}</h6>
                  <div className="time-group">
                  {[
                    t("courseSubscribe.monthly"),
                    t("courseSubscribe.quarterly"),
                    t("courseSubscribe.halfYear"),
                    t("courseSubscribe.yearly")
                  ].map((plan, index) => (
                    <label
                      htmlFor={plan}
                      key={index}
                      className="duration_check"
                    >
                      <input
                        type="radio"
                        name="plan"
                        id={plan}
                        value={plan}
                        checked={formData.plan === plan}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            plan: e.target.value
                          })
                        }
                      />
                      <div className="time">
                        <span>{plan} </span>
                      </div>
                    </label>
                  ))}
                </div>
                </div>
                
              )}
              <button className="save w-25">
                {t("courseSubscribe.subscribe")}
              </button>
            </form>
          </div>
          <div className="col-lg-4 col-12 p-2 order-lg-1 order-0">
            <div className="image">
              <img
                src={`${BASE_URL}${course?.background}`}
                alt={course?.name}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
