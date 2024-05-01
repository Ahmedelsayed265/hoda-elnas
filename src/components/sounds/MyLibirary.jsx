import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import noResults from "../../assets/images/nodata.svg";

const MyLibirary = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cookies] = useCookies(["refreshToken"]);
  const isAuthenticated = cookies.refreshToken ? true : false;
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="row m-0">
      <div className="col-12 p-2">
        <div className="noDataFound">
          <img src={noResults} alt="no results" />
          <h5>{t("sounds.noLibirary")}</h5>
          <p>{t("sounds.noLibrarySub")}</p>
          <button>{t("sounds.listenNow")}</button>
        </div>
      </div>
    </div>
  );
};

export default MyLibirary;
