import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import noResults from "../../assets/images/no-results.svg";
import { useTranslation } from "react-i18next";

const MyPlayLists = () => {
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
          <h5>{t("sounds.noPlayLists")}</h5>
          <p>{t("sounds.noPlayListsSub")}</p>
          <button>{t("sounds.createPlayList")}</button>
        </div>
      </div>
    </div>
  );
};

export default MyPlayLists;
