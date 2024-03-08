import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SubmitButton from "../ui/form-elements/SubmitButton";
import InputField from "../ui/form-elements/InputField";
import { toast } from "react-toastify";
import axios from "axios";

const ResetByMail = ({ setFormComponent , setEmail }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    function: "createotp"
  });
  const { t } = useTranslation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/accounts/resetpass/", formData);
      setFormComponent("otp");
      setEmail(formData.email)
    } catch (error) {
      toast.error(t("auth.emailNotExist"));
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
      <SubmitButton name={t("auth.send")} loading={loading} />
    </form>
  );
};

export default ResetByMail;
