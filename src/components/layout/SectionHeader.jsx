import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import thumb from "../../assets/images/quranIcon.png";

const SectionHeader = ({ pageName, backLinks }) => {
  return (
    <section className="section-header">
      <div className="container">
        <div className="content">
          <h1>{pageName}</h1>
          <p>
            {backLinks.map((link, index) => (
              <Fragment key={index}>
                <Link key={index} to={link.path}>
                  {link.name}
                </Link>{" "}
                /{" "}
              </Fragment>
            ))}
            <span>{pageName}</span>
          </p>
        </div>
        <div className="thunb">
          <img src={thumb} alt="thumb" />
        </div>
      </div>
    </section>
  );
};

export default SectionHeader;
