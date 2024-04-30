import React from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/logo.svg";
import { useSelector } from "react-redux";

const WhatWeOffer = () => {
  const comparsionHeader = useSelector((state) => state.comparsion.header);
  const comparsionBody = useSelector((state) => state.comparsion.body);
  const { t } = useTranslation();

  const renderComparableValue = (value) => {
    if (value === "True" || value === "False") {
      if (value === "True") {
        return <i className="check fa-regular fa-check"></i>;
      } else if (value === "False") {
        return <i className="x fa-regular fa-xmark"></i>;
      }
    } else {
      return value;
    }
  };

  return (
    <section className="what_we_offer">
      <div className="container">
        <div className="title">
          <h3>{t("homePage.whatWeOffer")}</h3>
        </div>
        <div className="row m-0 justify-content-center">
          <div className="col-lg-10 col-12 p-2">
            <div className="table_container">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>
                      <img src={logo} alt="" />
                    </th>
                    {comparsionHeader?.comparable_1 !== null && (
                      <th>{comparsionHeader?.comparable_1}</th>
                    )}
                    {comparsionHeader?.comparable_2 !== null && (
                      <th>{comparsionHeader?.comparable_2}</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {comparsionBody?.map((item) => (
                    <tr key={item?.criteria}>
                      <td className="circled">{item?.criteria}</td>
                      <td>{renderComparableValue(item?.hudaelnas)}</td>
                      {comparsionHeader?.comparable_1 !== null && (
                        <td>{renderComparableValue(item?.comparable_1)}</td>
                      )}
                      {comparsionHeader?.comparable_2 !== null && (
                        <td>{renderComparableValue(item?.comparable_2)}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
