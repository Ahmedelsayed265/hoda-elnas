import React from "react";
import { useSelector } from "react-redux";

const JoinSession = () => {
  const { vConnectLink } = useSelector((state) => state.vConnectLink);
  return (
    <section className="join_session">
      <iframe src={vConnectLink} title="session" frameborder="0"></iframe>
    </section>
  );
};

export default JoinSession;
