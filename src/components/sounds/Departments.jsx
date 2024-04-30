import React from "react";
import departmentIcon from "../../assets/images/grid.svg";
import { useTranslation } from "react-i18next";

const Departments = () => {
  const { t } = useTranslation();
  return (
    <div className="row m-0">
      <div className="col-12 p-2 mb-2">
        <div className="swiper_pagination_title">
          <h5>
            <img src={departmentIcon} alt="list" /> {t("sounds.departments")}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Departments;
