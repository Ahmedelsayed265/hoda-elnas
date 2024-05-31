import React from "react";
import { useTranslation } from "react-i18next";
import feature from "../../../assets/images/features.jpg";

const RoadMap = () => {
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
              <div className="path">
                <div className="flipCard m-auto w-100">
                  <div
                    className="cardFront"
                    style={{ backgroundImage: `url(${feature})` }}
                  />
                  <div className="cardBack">
                    <div className="content">
                      <p>
                        اكتب قصتك الخاصة وشارك في مسابقة القصة القصيرة، حيث
                        ينتظرك عالم من الخيال والإبداع. فرصتك لجذب الانتباه
                        بأحداث مشوقة وشخصيات لا تُنسى.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="path_title">
                  <h3>3 شهور</h3>
                  <h5>( 12 حصة )</h5>
                </div>
              </div>
              <div className="path">
                <div className="flipCard m-auto w-100">
                  <div
                    className="cardFront"
                    style={{ backgroundImage: `url(${feature})` }}
                  />
                  <div className="cardBack">
                    <div className="content">
                      <p>
                        اكتب قصتك الخاصة وشارك في مسابقة القصة القصيرة، حيث
                        ينتظرك عالم من الخيال والإبداع. فرصتك لجذب الانتباه
                        بأحداث مشوقة وشخصيات لا تُنسى.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="path_title">
                  <h3>3 شهور</h3>
                  <h5>( 12 حصة )</h5>
                </div>
              </div>
              <div className="path">
                <div className="flipCard m-auto w-100">
                  <div
                    className="cardFront"
                    style={{ backgroundImage: `url(${feature})` }}
                  />
                  <div className="cardBack">
                    <div className="content">
                      <p>
                        اكتب قصتك الخاصة وشارك في مسابقة القصة القصيرة، حيث
                        ينتظرك عالم من الخيال والإبداع. فرصتك لجذب الانتباه
                        بأحداث مشوقة وشخصيات لا تُنسى.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="path_title">
                  <h3>3 شهور</h3>
                  <h5>( 12 حصة )</h5>
                </div>
              </div>
              <div className="path">
                <div className="flipCard m-auto w-100">
                  <div
                    className="cardFront"
                    style={{ backgroundImage: `url(${feature})` }}
                  />
                  <div className="cardBack">
                    <div className="content">
                      <p>
                        اكتب قصتك الخاصة وشارك في مسابقة القصة القصيرة، حيث
                        ينتظرك عالم من الخيال والإبداع. فرصتك لجذب الانتباه
                        بأحداث مشوقة وشخصيات لا تُنسى.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="path_title">
                  <h3>3 شهور</h3>
                  <h5>( 12 حصة )</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadMap;
