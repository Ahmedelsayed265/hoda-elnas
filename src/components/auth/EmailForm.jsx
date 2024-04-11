import React, { useState } from "react";
import InputField from "../ui/form-elements/InputField";
import { useTranslation } from "react-i18next";
import PasswordField from "../ui/form-elements/PasswordField";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "./../ui/form-elements/SubmitButton";
import axios from "./../../util/axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setLogged } from "../../redux/slices/authedUser";

const EmailForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    login_type: "email",
    email: "",
    password: ""
  });

  const [, setCookie] = useCookies(["token"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/accounts/login/", formData);
      if (res.status === 200) {
        toast.success(t("auth.loginSuccessfully"));
        navigate("/");
        setCookie("refreshToken", res.data.refresh_token, {
          path: "/",
          secure: true
        });
        dispatch(setLogged(true));
      } else {
        toast.error(t("auth.emailOrPasswordIsWrong"));
      }
    } catch (error) {
      toast.error(t("auth.emailOrPasswordIsWrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-ui" onSubmit={handleSubmit}>
      <InputField
        label={t("auth.email")}
        placeholder={t("auth.emailPlaceHolder")}
        type="email"
        htmlFor="email"
        value={formData.email}
        formData={formData}
        id="email"
        setFormData={setFormData}
        icon={<i className="fa-light fa-envelope"></i>}
      />
      <PasswordField
        label={t("auth.password")}
        htmlFor="password"
        id="password"
        value={formData.password}
        formData={formData}
        setFormData={setFormData}
        icon={<i className="fa-regular fa-lock-keyhole"></i>}
      />
      <div className="d-flex justify-content-end forgot">
        <Link to="/reset-password">{t("auth.forgotPassword")}</Link>
      </div>
      <SubmitButton name={t("login")} loading={loading} />
    </form>
  );
};

export default EmailForm;
