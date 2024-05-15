import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const AddGoalModal = ({ showModal, setShowModal }) => {
  const { t } = useTranslation();
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState([]);
  const { subscriptionId } = useParams();
  const [subscriptionStudents, setSubscriptionStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/members/list_Student/?subscription_id=${subscriptionId}`
        );
        if (response.status === 200) {
          setSubscriptionStudents(response?.data?.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionId, showModal]);

  const [formData, setFormData] = useState({
    goal_id: "",
    option_id: "",
    custom_option_id: ""
  });

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(
          `/members/List_student_subs/?id=${subscriptionId}`
        );
        if (response?.status === 200) {
          const courseId = response?.data?.message[0]?.course_id;
          const response2 = await axios.get(
            `/learningcenter/List_goal/?course_id=${courseId}&student_id=${studentId}`
          );
          setGoals(response2.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGoals();
  }, [studentId, subscriptionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "")
    );
    try {
      const response = await axios.post(
        `/members/Create_student_goal/${
          subscriptionStudents.find((s) => s.student_id === +studentId)
            ?.studentclass_id
        }/`,
        filteredFormData
      );
      if (response?.status === 200) {
        toast.success(t("dashboard.goalAdded"));
        setShowModal(false);
      } else {
        toast.error(response?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(t("auth.someThingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("dashboard.addGoal")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="row m-0 form-ui gap-1">
          <div className="col-12 p-2">
            <div className="timingRow">
              <div className="input-field">
                <label htmlFor="student">{t("dashboard.student")}</label>
                <Form.Select
                  name="student"
                  value={studentId}
                  id="student"
                  onChange={(e) => setStudentId(e.target.value)}
                >
                  <option value="" disabled>
                    {t("dashboard.choose")}
                  </option>
                  {subscriptionStudents?.map((student) => {
                    return (
                      <option key={student?.id} value={student?.student_id}>
                        {student.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
              <div className="input-field">
                <label htmlFor="goal">{t("dashboard.goal")}</label>
                <Form.Select
                  name="goal"
                  id="goal"
                  value={formData.goal_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      goal_id: Number(e.target.value)
                    })
                  }
                >
                  <option value="" disabled>
                    {t("dashboard.choose")}
                  </option>
                  {goals.map((goal) => {
                    return (
                      <option key={goal.id} value={goal.id}>
                        {goal.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
              {goals?.find((g) => g.id === formData.goal_id)?.custom_options
                ?.length > 0 && (
                <div className="input-field">
                  <label htmlFor="surah">{t("dashboard.chooseSurah")}</label>
                  <Form.Select
                    name="surah"
                    id="surah"
                    value={formData.custom_option_id}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        custom_option_id: Number(e.target.value)
                      })
                    }
                  >
                    <option value="" disabled>
                      {t("dashboard.choose")}
                    </option>
                    {goals
                      .find((g) => g.id === formData.goal_id)
                      ?.custom_options.map((option) => {
                        return (
                          <option key={option.id} value={option.id}>
                            {option.option}
                          </option>
                        );
                      })}
                  </Form.Select>
                </div>
              )}
              <div className="input-field">
                <label htmlFor="goalLevel">{t("dashboard.goalLevel")}</label>
                <Form.Select
                  name="goalLevel"
                  id="goalLevel"
                  value={formData.option_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      option_id: Number(e.target.value)
                    })
                  }
                >
                  <option value="" disabled>
                    {t("dashboard.choose")}
                  </option>
                  {goals
                    .find((g) => g.id === formData.goal_id)
                    ?.options.map((option) => {
                      return (
                        <option key={option.id} value={option.id}>
                          {option.option}
                        </option>
                      );
                    })}
                </Form.Select>
              </div>
            </div>
          </div>
          <div className="col-12 p-2">
            <SubmitButton
              loading={loading}
              name={t("dashboard.addGoal")}
              className={"mt-0"}
            />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddGoalModal;
