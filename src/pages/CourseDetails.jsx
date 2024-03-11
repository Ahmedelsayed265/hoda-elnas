import React from "react";
import SectionHeader from "../components/layout/SectionHeader";
import { useTranslation } from "react-i18next";

const CourseDetails = () => {
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
            <div className="col-lg-6 col-12 p-2">
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseDetails;
