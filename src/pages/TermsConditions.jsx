import React, { Fragment } from "react";
import SectionHeader from "./../components/layout/SectionHeader";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const TermsConditions = () => {
  const termsConditions = useSelector(
    (state) => state.termsConditions.termsConditions
  );
  const sortedTermsConditions = [...termsConditions].sort(
    (a, b) => a.order - b.order
  );
  const { t } = useTranslation();
  const backLinks = [
    {
      name: t("home"),
      path: "/"
    }
  ];
  return (
    <>
      <SectionHeader
        pageName={t("auth.termsAndCondition")}
        backLinks={backLinks}
      />
      <section className="terms_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-12">
              {
                sortedTermsConditions.map((termsCondition) => (
                  <Fragment key={termsCondition.id}>
                    <h4>{termsCondition?.order}. {termsCondition?.title}</h4>
                    <p>{termsCondition?.content}</p>
                  </Fragment>
                ))
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsConditions;
