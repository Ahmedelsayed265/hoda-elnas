import React, { useState } from "react";
import axios from "./../../../../util/axios";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setLogged } from "../../../../redux/slices/authedUser";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import PhoneField from "../../../ui/form-elements/PhoneField";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import PasswordField from "../../../ui/form-elements/PasswordField";

const PhoneForm = ({ setStepName }) => {
  const { t } = useTranslation();
  const [, setCookie] = useCookies(["token"]);
  const dispatch = useDispatch();
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
        setCookie("refreshToken", res.data.refresh_token, {
          path: "/",
          secure: true
        });
        dispatch(setLogged(true));
        setStepName("payment_method");
      } else {
        toast.error(t("auth.phoneOrPasswordIsWrong"));
      }
    } catch (error) {
      toast.error(t("auth.phoneOrPasswordIsWrong"));
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
