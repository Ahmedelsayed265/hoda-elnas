import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const JoinSession = () => {
  const { t } = useTranslation();
  const { vConnectLink } = useSelector((state) => state.vConnectLink);
  return (
    <section className="join_session">
      <Link to="/my-courses">{t("backToCourses")}</Link>
      <iframe src={vConnectLink} title="session" frameborder="0"></iframe>
    </section>
  );
};

export default JoinSession;
