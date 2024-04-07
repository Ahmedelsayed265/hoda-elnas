import React from "react";
import man from "../../../../assets/images/man.svg";
import woman from "../../../../assets/images/woman.svg";

const InstructorCard = ({ instructor, formData, setFormData }) => {
  return (
    <label htmlFor={instructor?.instructor_id} className="instructor-card">
      <input
        type="radio"
        name="instructor"
        id={instructor?.instructor_id}
        onChange={() =>
          setFormData({ ...formData, instructor_id: instructor?.instructor_id })
        }
      />
      <div className="content">
        <div className="img">
          <img
            src={instructor?.gender === "male" ? man : woman || man}
            alt=""
          />
        </div>
        <h6>{instructor?.name}</h6>
        <p>{instructor?.bio}</p>
        <ul>
          {instructor?.subjects?.map((subject) => (
            <li key={subject.name}>{subject.name}</li>
          ))}
        </ul>
      </div>
    </label>
  );
};

export default InstructorCard;
