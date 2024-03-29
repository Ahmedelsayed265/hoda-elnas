import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const PrivacyPolicy = () => {
  const privacyPolicy = useSelector((state) => state.privacy.privacy);
  const sortedPrivacyPolicy = [...privacyPolicy].sort(
    (a, b) => a.order - b.order
  );
  return (
    <section className="terms_section">
      <div className="container">
        <div className="row m-0">
          <div className="col-lg-9 col-12">
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
