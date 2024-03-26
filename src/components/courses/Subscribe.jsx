import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants";
import SubscribeForm from "./SubscribeForm";
import axios from "./../../util/axios";

const Subscribe = () => {
  const { id } = useParams();
  const courses = useSelector((state) => state.courses.courses);
  const course = courses.find((c) => c.id === +id);

  const [formData, setFormData] = useState({
    studentsNumber: 1,
    courseDuration: 1,
    price: 0.0,
    totalPrice: 0.0,
    addons: [],
    plan: course?.types[0],
    lessonsDuration: course?.duration[0]
  });
  useEffect(() => {
    if (course) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        plan: course?.types[0],
        lessonsDuration: course?.duration[0]
      }));
    }
  }, [course]);

  const [pricingPlans, setPricingPlans] = useState([]);
  useEffect(() => {
    const getPricing = async () => {
      try {
        const response = await axios.get(
          `/learningcenter/list_pricingplans/?course_slug=${course?.slug}`
        );
        setPricingPlans(response?.data?.message);
      } catch (error) {
        console.error(error);
      }
    };
    getPricing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course?.slug]);
  return (
    <section className="subscribe">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 p-2 order-lg-0 order-1">
            <div className="course_header">
              <h3>{course?.name}</h3>
              <p>{course?.bio}</p>
            </div>
            <SubscribeForm
              course={course}
              pricingPlans={pricingPlans}
              formData={formData}
              setFormData={setFormData}
            />
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
