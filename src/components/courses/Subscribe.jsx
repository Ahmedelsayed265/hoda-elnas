import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants";
import SubscribeForm from "./SubscribeForm";
import axios from "./../../util/axios";
import CourseBenifits from "./CourseBenifits";

const Subscribe = () => {
  const courses = useSelector((state) => state.courses.courses);
  const lang = useSelector((state) => state.language.lang);
  const [pricingPlans, setPricingPlans] = useState([]);
  const [benifits, setBenifits] = useState("");
  const { id } = useParams();
  const course = courses.find((c) => c.id === +id);

  const [formData, setFormData] = useState({
    studentsNumber: 1,
    courseDuration: 1,
    planId: null,
    price: 0.0,
    totalPrice: 0.0,
    addons: [],
    plan: course?.types[0],
    lessonsDuration: course?.duration[0],
    validCopun: false,
    copun_type: "",
    copun_name: "",
    discont_percent: 0,
    paymentMethods: []
  });

  useEffect(() => {
    if (course) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        paymentMethods: course?.payment_methods,
        plan: course?.types[0],
        lessonsDuration: course?.duration[0]
      }));
    }
  }, [course]);

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
  }, [course?.slug, lang]);

  return (
    <section className="subscribe">
      <div className="container">
        <div className="row m-0 justify-content-between">
          <div className="col-lg-7 col-12 p-2 order-lg-0 order-1">
            <SubscribeForm
              course={course}
              pricingPlans={pricingPlans}
              formData={formData}
              setFormData={setFormData}
              setBenefits={setBenifits}
            />
          </div>
          <div className="col-lg-4 col-12 p-2 order-lg-1 order-0">
            <div className="image">
              <img
                src={`${BASE_URL}${course?.background}`}
                alt={course?.name}
              />
            </div>
            <div className="course_header">
              <h3>{course?.name}</h3>
              <p>{course?.bio}</p>
            </div>
            {benifits && <CourseBenifits benefits={benifits} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
