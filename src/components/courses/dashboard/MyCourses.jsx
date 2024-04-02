import React from "react";
import availableCoursesIcon from "../../../assets/images/availableCourses.svg";
import inReview from "../../../assets/images/inReview.svg";
import { useTranslation } from "react-i18next";
import CourseCard from "../../layout/CourseCard";

const MyCourses = () => {
  const { t } = useTranslation();
  const course = {
    id: 1,
    name: "Holy Qur'aan Class for women",
    bio: "Embark on your Quranic journey with us today! Enjoy live lessons with top female instructors, designed specially for women, and tailored to your schedule and learning style.",
    description:
      "Experience the beauty of Quranic learning through our specially designed lessons for women. Join our personalized one-on-one sessions with your dedicated female instructor. Define your goals, and we'll create a tailored plan to meet your needs. Our team provides direct support to ensure your continued progress in your educational journey. Take full control through our platform to schedule sessions, review reports, submissions, and track your progress automatically.",
    outcome:
      "Recitation (Tajweed): Learn proper Quranic pronunciation and intonation.\r\nMemorization (Hifz): Memorize portions or the entirety of the Quran.\r\nUnderstanding (Tafsir): Study meanings and interpretations of Quranic verses.\r\nIslamic Studies: Cover broader topics\r\nSpiritual Development: Reflect on Quranic teachings for personal growth.\r\nApplication in Worship: Apply Quranic principles in daily acts of worship.",
    benefits:
      "A plan tailored specifically for you\r\nFlexibility to change schedules\r\nExpert instructors carefully selected and certified\r\nAutomatic tracking through our platform\r\nDirect follow-up from our team ensures your continuity\r\nDetailed report after each session\r\nMonthly review session\r\nTracking your progress in your journey to achieve your goal\r\nA specially designed library to support you with audio and visual materials",
    skilllevel: null,
    type: "One To One",
    session: "Live",
    slug: "holyquranfemale",
    category_id: 1,
    category_naem: "The  Holy Qur'aan",
    installment: true,
    duration: ["30.0", "45.0", "60.0"],
    types: ["monthly", "quarterly", "semiannually", "annually"],
    grantees_title: "ليه احنا مش غيرنا",
    grantees: [
      {
        icon: "/media/icons/courses/cf42e3b9c7f6f070158123e3f1f86db1.jpg",
        title: "Money Back Grantee",
        subtitle:
          "We guarantee a refund if you are not satisfied with the experience.",
        description:
          '"Retrieve the amount according to the refund policy if you are not satisfied with the experience and replace the teacher with the click of a button.'
      },
      {
        icon: "/media/icons/courses/WhatsApp_Image_2023-06-12_at_12.26.14.jpg",
        title: "Experts",
        subtitle: "We accept only 2% of instructors",
        description:
          "we have a tests and series of interviews that filter all instructors and we get the best 8% of applicants"
      },
      {
        icon: "/media/icons/courses/WhatsApp_Image_2023-06-12_at_12.26.14_piOS79C.jpg",
        title: "Always in here for you",
        subtitle: "We just a click a way",
        description:
          "we're always active for you, you can get to us any time and we will try to solve it asap"
      },
      {
        icon: "/media/icons/courses/WhatsApp_Image_2023-06-12_at_12.26.14_Jhmy1rS.jpg",
        title: "Commitment",
        subtitle:
          "our instructors is commited for the first day, we grantee that",
        description:
          "We make every effort to assure our tutors are profoundly committed and serious about helping your child reach their goals throughout your entire journey with us."
      }
    ],
    FAQ: [
      {
        question: "How do I know the right package for me?",
        answer:
          "You can book a trial session, and the tutor will suggest the suitable package based on their assessment of the student’s level and needs.",
        order: 3
      },
      {
        question: "What are the refund policy terms?",
        answer:
          "We offer two types of refunds depending on the case:\r\n\r\nFull Refund: \r\nYou’d be eligible for a full refund if all items within the scope are applicable. The cases include but are not limited to:\r\nWhen the session has not been done due to the absence of the tutor.\r\nWhen the session is canceled for any reason at least 8 hours before the scheduled time of the session.\r\nPartial Refund:\r\nIn case the default was from the client’s side with no fault from the tutor or the tutor matchmaking, the client surpassed the eligibility time frame, and other routes were explored. In this case, the client will incur a penalty where they’ll be refunded 20% of the unexecuted hours only.",
        order: 4
      }
    ],
    addons: [
      {
        name: "Set session time week by week",
        fees_egp: 90.0,
        fees_usd: 3.0
      }
    ],
    background:
      "/media/photos/courses/WhatsApp_Image_2024-03-18_at_01.08.01_bc315337.jpg",
    promo: null,
    payment_methods: [
      {
        title: "Instant Payment",
        description:
          "Pay instantly with your bank card or electronic wallet through our electronic payment gateway without the need to wait or review.",
        validation: "auto"
      },
      {
        title: "Pay with Instapay app",
        description:
          "We will display our payment address on the app, and you can transfer through it and attach a transfer picture. We will review it and approve it.",
        validation: "manual",
        payone: "hodaelnas",
        image:
          "/media/photos/WhatsApp_Image_2024-04-02_at_14.09.27_659d0b80.jpg"
      },
      {
        title: "Ewallet",
        description:
          "We will display the designated number for payment, and you will transfer to it and attach the picture in the designated place for that. We will then review and approve.",
        validation: "manual",
        payone: "01030284098"
      }
    ],
    published: true
  };
  return (
    <section className="my_courses">
      <div className="container">
        <div className="row m-0 mb-5">
          <div className="col-12 p-2 mb-2">
            <div className="my_courses_title">
              <img src={availableCoursesIcon} alt="available courses" />
              <h2>{t("availableCourses")}</h2>
            </div>
          </div>
          <div className="col-lg-4 p-2">
            <CourseCard course={course}/>
          </div>
          <div className="col-lg-4 p-2">
            <CourseCard course={course}/>
          </div>
          <div className="col-lg-4 p-2">
            <CourseCard course={course}/>
          </div>
          
        </div>
        <div className="row m-0 mb-2">
          <div className="col-12 p-2">
            <div className="my_courses_title">
              <img src={inReview} alt="available courses" />
              <h2>{t("inReviewCourses")}</h2>
            </div>
          </div>
          <div className="col-lg-4 p-2">
            <CourseCard course={course}/>
          </div>
          <div className="col-lg-4 p-2">
            <CourseCard course={course}/>
          </div>
          <div className="col-lg-4 p-2">
            <CourseCard course={course}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyCourses;
