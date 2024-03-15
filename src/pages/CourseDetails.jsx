import React from "react";
import SectionHeader from "../components/layout/SectionHeader";
import { useTranslation } from "react-i18next";
import poster from "../assets/images/c1.jpeg";
import VideoModal from "../components/ui/VideoModal";
import { Link } from "react-router-dom";

const CourseDetails = () => {
  const [showModal, setShowModal] = React.useState(false);
  const { t } = useTranslation();
  const backLinks = [
    {
      name: t("home"),
      path: "/"
    },
    {
      name: t("courses"),
      path: "/courses"
    }
  ];
  return (
    <>
      <SectionHeader pageName="كورس صفات المؤمن" backLinks={backLinks} />
      <section className="course-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-12 p-3">
              <div
                className="video_wrapper"
                style={{ backgroundImage: `url(${poster})` }}
              >
                <span>يقبل التقسيط</span>
                <div className="play-btn" onClick={() => setShowModal(true)}>
                  <i className="fa-light fa-play"></i>{" "}
                  <div className="waves-block">
                    <div className="waves wave-1"></div>
                    <div className="waves wave-2"></div>
                    <div className="waves wave-3"></div>
                  </div>
                </div>
              </div>
              <Link className="btn" to="/courses/1/subscripe">
                اشترك
              </Link>
              <p className="alreadySub">
                هل أنت مشترك بالفعل؟ <Link to="/login">تسجيل الدخول</Link>
              </p>
            </div>
            <div className="col-lg-7 col-12 p-3">
              <div className="content">
                <h4>مفاتيح فهم القرءان (مقدمة في أصول التفسير)</h4>
                <p>
                  مقرر دراسي يبحث في أصول ومبادئ تفسير القرآن الكريم. يهدف هذا
                  المقرر إلى توجيه الطلاب والمهتمين بالدراسات الإسلامية نحو فهم
                  أعمق وأشمل للقرآن، وذلك من خلال تقديمهم للمفاهيم الأساسية التي
                  تسهل فهم وتأويل النص القرآني.
                </p>
                <h6>أهداف المقرر</h6>
                <ul>
                  <li>
                    تعريف الطلاب بمفهوم تفسير القرآن الكريم وأهميته في فهم الدين
                    الإسلامي.
                  </li>
                  <li>توضيح الأسس والمبادئ الأساسية لتفسير القرآن الكريم.</li>
                  <li>
                    تعريف الطلاب بأهمية الوسطية والاعتدال في تفسير القرآن وتجنب
                    التطرف والتشدد.
                  </li>
                  <li>
                    تقديم الطرق والأساليب المتبعة في تفسير القرآن الكريم وتحليل
                    النصوص القرآنية.
                  </li>
                  <li>
                    تشجيع الطلاب على تطبيق مبادئ التفسير القرآني في فهم النصوص
                    القرآنية بشكل منهجي ومنطقي.
                  </li>
                  <li>
                    تمكين الطلاب من قراءة التفاسير القرآنية بشكل مستقل وفهم
                    مضامينها.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <VideoModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default CourseDetails;
