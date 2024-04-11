import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { setLogged } from "../../redux/slices/authedUser";
import PasswordField from "../ui/form-elements/PasswordField";
import PhoneField from "../ui/form-elements/PhoneField";
import SubmitButton from "../ui/form-elements/SubmitButton";
import axios from "./../../util/axios";

const PhoneForm = () => {
  const { t } = useTranslation();
  const [, setCookie] = useCookies(["token"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    login_type: "phone",
    phone: "",
    password: ""
  });

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
      <PhoneField
        label={t("auth.phone")}
        icon={<i className="fa-sharp fa-light fa-phone"></i>}
        formData={formData}
        setFormData={setFormData}
        value={formData.phone}
        id="phone"
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

export default PhoneForm;
