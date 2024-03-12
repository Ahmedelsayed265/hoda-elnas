import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import BestAudios from "./BestAudios";
import BestVisuals from "./BestVisuals";

const Library = () => {
  const { t } = useTranslation();
  return (
    <section className="library">
      <div className="container">
        <h2 className="title">{t("homePage.library")}</h2>
        <p className="section_subtitle">
          {t("homePage.librarySectionSubtitle")}
        </p>
        <div className="row">
          <div className="col-12 p-2">
            <div className="section_title">
              <h3>{t("homePage.bestAudios")}</h3>
              <Link to="/acoustics">
                {t("homePage.allAudios")}{" "}
                <i className="fa-regular fa-arrow-left-long"></i>
              </Link>
            </div>
          </div>
          <div className="col-12 p-2">
            <BestAudios />
          </div>
          <div className="col-12 p-2">
            <div className="section_title">
              <h3>{t("homePage.bestVisuals")}</h3>
              <Link to="/visuals">
                {t("homePage.allVisuals")}{" "}
                <i className="fa-regular fa-arrow-left-long"></i>
              </Link>
            </div>
          </div>
          <div className="col-12 p-2">
            <BestVisuals />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Library;
