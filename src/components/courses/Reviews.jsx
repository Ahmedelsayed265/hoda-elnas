import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "./../../util/axios";
import ReviewsSlider from "./ReviewsSlider";
import { useParams } from "react-router-dom";

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = React.useState([]);
  const titles = useSelector((state) => state.sectionsTitles.titles);
  const getCourseReviews = async () => {
    const response = await axios.get(
      `/landingpages/List_reviews/?status=published&course_id=${id}`
    );
    if (response.status === 200) {
      setReviews(response?.data?.message);
    }
  };

  useEffect(() => {
    getCourseReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="course_reviews">
      <div className="container">
        <div className="title">
          <h3>{titles?.review_title}</h3>
          {titles?.review_sub_title && <p>{titles?.review_sub_title}</p>}
        </div>
        <ReviewsSlider reviews={reviews} />
      </div>
    </section>
  );
};

export default Reviews;
