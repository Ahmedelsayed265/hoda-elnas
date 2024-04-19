import React from "react";
import { Link, useParams } from "react-router-dom";

const GoalCard = ({ goal }) => {
  const { subscriptionId } = useParams();
  return (
    <Link
      className="goal_card"
      to={`/dashboard/${subscriptionId}/goals/${goal?.goal_detail.studentgoal_id}`}
    >
      <div className="content">
        <h6>{goal?.goal_detail?.name}</h6>
        <p>
          اجعل القرءان صاحبًا لك. معلمين مؤهّلين لتعليمك القرآن وحب القرآن
          والتعلق بالقرآن، مهمتنا هو أن نجعل القرآن جزءًا من يومك.
        </p>
      </div>
      <div className="icon">
        <i className="fa-regular fa-arrow-left-long"></i>
      </div>
    </Link>
  );
};

export default GoalCard;
