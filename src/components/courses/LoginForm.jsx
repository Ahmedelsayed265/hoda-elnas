import React, { useState } from "react";
import InputField from "../ui/form-elements/InputField";
import { useTranslation } from "react-i18next";
import PasswordField from "../ui/form-elements/PasswordField";
import SubmitButton from "../ui/form-elements/SubmitButton";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import axios from "./../../util/axios";
import { toast } from "react-toastify";
import { setLogged } from "../../redux/slices/authedUser";

const LoginForm = ({ setUserId }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [, setCookie] = useCookies(["token"]);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/accounts/login/", formData);
      if (res.status === 200) {
        toast.success(t("auth.loginSuccessfully"));
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
    <div className="">
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
        <SubmitButton name={t("login")} loading={loading} />
      </form>
    </div>
  );
};

export default LoginForm;
