import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ShareWithFriend = () => {
  const { t } = useTranslation();
  const [copiedVisible, setCopiedVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("code66").then(() => {
      setCopiedVisible(true);
      setTimeout(() => {
        setCopiedVisible(false);
      }, 1000);
    });
  };

  return (
    <div className="share_with_friend">
      <div className="row m-0">
        <div className="col-12 p-2 mb-2">
          <h3>{t("shareWithFriendTitle")}</h3>
        </div>
        <div className="col-12 p-2">
          <div className="table_header">
            <div className="cell">
              <h6>
                <i className="fa-regular fa-users"></i> {t("invites")}
              </h6>
            </div>
            <div className="cell">
              <h6>
                <i className="fa-light fa-coins"></i> {t("availablePoints")}
              </h6>
            </div>
          </div>
          <div className="table_body">
            <div className="cell">
              <h6>50</h6>
            </div>
            <div className="cell">
              <h6>2,500</h6>
            </div>
          </div>
        </div>
        <div className="col-12 p-2 pt-5">
          <h5>{t("shareWithFriendDesc")}</h5>
          <div className="copyShareLinkArea">
            <h6>code66</h6>
            <span onClick={handleCopy}>
              <i className="fa-regular fa-copy"></i>{" "}
              {copiedVisible ? t("copied") : t("copy")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareWithFriend;
