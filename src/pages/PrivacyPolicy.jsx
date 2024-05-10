import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const privacyPolicy = useSelector((state) => state.privacy.privacy);
  const sortedPrivacyPolicy = [...privacyPolicy].sort(
    (a, b) => a.order - b.order
  );
  return (
    <section className="terms_section">
      <div className="container">
        <div className="row m-0">
          <div className="col-12 p-2">
            <h3>{t("auth.privacyPolicy")}</h3>
          </div>
          <div className="col-12 p-2">
            {sortedPrivacyPolicy.map((privacy) => (
              <Fragment key={privacy.id}>
                <h4>
                  {privacy?.order}. {privacy?.title}
                </h4>
                <p>{privacy?.content}</p>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
