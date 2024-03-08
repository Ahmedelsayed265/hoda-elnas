import React, { useState } from "react";
import PhoneField from "../ui/form-elements/PhoneField";
import { useTranslation } from "react-i18next";
import SubmitButton from "../ui/form-elements/SubmitButton";

const ResetByPhone = () => {
  const [loading] = useState(false);
  const [formData, setFormData] = useState({
    phone: ""
  });
  const { t } = useTranslation();
  return (
    <form className="form-ui">
      {/* phone */}
      <PhoneField
        label={t("auth.phone")}
        icon={<i className="fa-sharp fa-light fa-phone"></i>}
        formData={formData}
        setFormData={setFormData}
        value={formData.phone}
        id="phone"
      />
      <SubmitButton name={t("auth.send")} loading={loading} />
    </form>
  );
};

export default ResetByPhone;
