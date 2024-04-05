import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "./../../util/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import NameField from "../ui/form-elements/NameField";
import InputField from "./../ui/form-elements/InputField";
import PhoneField from "../ui/form-elements/PhoneField";
import PasswordField from "../ui/form-elements/PasswordField";
import Gender from "../ui/form-elements/Gender";
import SubmitButton from "../ui/form-elements/SubmitButton";
import { setLogged } from "../../redux/slices/authedUser";

const RegisterFrom = ({ setStepName }) => {
  const [loading, setLoading] = useState(false);
  const [, setCookie] = useCookies(["token"]);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
    whatsapp_number: "",
    gender: ""
  });
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/accounts/register/", formData);
      if (res.status === 200) {
        toast.success(t("auth.accountCreatedSuccessfully"));
        const loginRes = await axios.post("/accounts/login/", {
          email: formData.email,
          password: formData.password
        });
        setCookie("refreshToken", loginRes.data.refresh_token, {
          path: "/",
          secure: true
        });
        setStepName("payment_method");
        dispatch(setLogged(true));
      }
    } catch (error) {
      toast.error(t("auth.someThingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form_container">
      <form className="form-ui" onSubmit={handleSubmit}>
        {/* name */}
        <NameField setFormData={setFormData} formData={formData} />
        {/* email */}
        <InputField
          label={t("auth.email")}
          placeholder={t("auth.emailPlaceHolder")}
          htmlFor="email"
          value={formData.email}
          formData={formData}
          id={"email"}
          setFormData={setFormData}
          icon={<i className="fa-light fa-envelope"></i>}
        />
        {/* phone */}
        <PhoneField
          label={t("auth.phone")}
          icon={<i className="fa-sharp fa-light fa-phone"></i>}
          formData={formData}
          setFormData={setFormData}
          value={formData.phone_number}
          id="phone_number"
        />
        {/* whats app */}
        <PhoneField
          label={t("auth.whatsapp")}
          icon={<i className="fa-brands fa-whatsapp"></i>}
          formData={formData}
          setFormData={setFormData}
          value={formData.whatsapp_number}
          id="whatsapp_number"
        />
        <div className="form_group">
          <PasswordField
            label={t("auth.password")}
            htmlFor="password"
            id="password"
            value={formData.password}
            formData={formData}
            setFormData={setFormData}
            icon={<i className="fa-regular fa-lock-keyhole"></i>}
          />
          <PasswordField
            label={t("auth.confirmNewPassword")}
            htmlFor="confirm_password"
            id="confirm_password"
            value={formData.confirm_password}
            formData={formData}
            setFormData={setFormData}
            icon={<i className="fa-regular fa-lock-keyhole"></i>}
          />
        </div>
        {/* gender */}
        <Gender
          setFormData={setFormData}
          formData={formData}
          dataKey="gender"
        />
        <SubmitButton name={t("register")} loading={loading} />
      </form>
    </div>
  );
};

export default RegisterFrom;
