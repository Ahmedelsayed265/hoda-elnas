import React from "react";
import VisualCard from "../components/layout/VisualCard";
import { useTranslation } from "react-i18next";

const Visuals = () => {
  const { t } = useTranslation();
  return (
    <section className="courses">
      <div className="container">
        <div className="row m-0">
          <div className="col-12 p-2">
            <div className="search">
              <form action="" className="inner_search__form">
                <input type="text" placeholder={t("lookingForSomthing")} />
              </form>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <VisualCard />
          </div>
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <VisualCard />
          </div>
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <VisualCard />
          </div>
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <VisualCard />
          </div>
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <VisualCard />
          </div>
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <VisualCard />
          </div>
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <VisualCard />
          </div>
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <VisualCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Visuals;
