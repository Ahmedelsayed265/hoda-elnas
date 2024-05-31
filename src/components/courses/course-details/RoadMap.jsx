import React from "react";
import { useTranslation } from "react-i18next";

const RoadMap = ({ learningPath }) => {
  const { t } = useTranslation();
  return (
    <section className="roadmap">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2 mb-4">
            <h3 className="title">{t("learningPath")}</h3>
          </div>
          <div className="col-12 p-2">
            <div className="pathGrid">
              {learningPath?.map((path) => (
                <div className="path" key={path.id}>
                  <div className="flipCard m-auto w-100">
                    <div
                      className="cardFront"
                      style={{
                        backgroundImage: `url(${path?.image})`
                      }}
                    />
                    <div className="cardBack">
                      <div className="content">
                        <p>{path.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="path_title">
                    <h3>{path?.title}</h3>
                    <h5>{path?.sub_title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadMap;
