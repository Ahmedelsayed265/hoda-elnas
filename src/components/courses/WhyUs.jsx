import React from "react";
import arrow from "../../assets/images/arrow.svg";
import { BASE_URL } from "../../constants";

const WhyUs = ({ title, grantees }) => {
  return (
    <section className="in_course_why_us">
      <div className="container">
        <div className="title">
          <img className="arrow" src={arrow} alt="arrow" />
          <h3>{title}</h3>
        </div>
        <div className="row">
          {grantees?.map((grantee, index) => (
            <div className="col-lg-3 col-md-6 col-12 p-2" key={index}>
              <div className="grantee_card">
                <div className="icon">
                  <img src={`${BASE_URL}${grantee?.icon}`} alt="grantee" />
                </div>
                <h4>{grantee?.title}</h4>
                <p>{grantee?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
