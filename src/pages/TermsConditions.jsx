import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const TermsConditions = () => {
  const { t } = useTranslation();
  const termsConditions = useSelector(
    (state) => state.termsConditions.termsConditions
  );
  const sortedTermsConditions = [...termsConditions].sort(
    (a, b) => a.order - b.order
  );
  return (
    <section className="terms_section">
      <div className="container">
        <div className="row m-0">
          <div className="col-12 p-2">
            <h2>{t("auth.termsAndCondition")}</h2>
          </div>
          <div className="col-12 p-2">
            {sortedTermsConditions.map((termsCondition) => (
              <Fragment key={termsCondition.id}>
                <h4>
                  {termsCondition?.order}. {termsCondition?.title}
                </h4>
                <p>{termsCondition?.content}</p>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsConditions;
