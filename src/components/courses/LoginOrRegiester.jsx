import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import RegisterFrom from "./RegisterFrom";
import LoginForm from "./LoginForm";

const LoginOrRegister = ({ setStepName }) => {
  const { t } = useTranslation();
  const [authType, setAuthType] = useState("register");

  let targetComponent;
  if (authType === "register") {
    targetComponent = <RegisterFrom setStepName={setStepName} />;
  } else {
    targetComponent = <LoginForm setStepName={setStepName} />;
  }

  return (
    <div className="loginOrRegiester">
      <div className="title">
        <h3>{authType === "login" ? t("login") : t("register")}</h3>
        <p>
          {authType === "login" ? t("auth.noAccount") : t("auth.haveAnAccount")}{" "}
          <span
            onClick={() =>
              setAuthType(authType === "login" ? "register" : "login")
            }
          >
            {authType === "login" ? t("register") : t("login")}
          </span>
        </p>
      </div>
      {targetComponent}
    </div>
  );
};

export default LoginOrRegister;
