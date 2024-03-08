import React, { useState } from "react";
import PhoneForm from "../components/auth/PhoneForm";
import OtpForm from "../components/auth/OtpForm";
import NewPassword from "../components/auth/NewPassword";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
    new_password: "",
    confrimed_password: ""
  });
  const [formComponent, setFormComponent] = useState("phone");
  let component;
  if (formComponent === "phone") {
    component = (
      <PhoneForm
        formData={formData}
        setFormData={setFormData}
        setFormComponent={setFormComponent}
      />
    );
  } else if (formComponent === "otp") {
    component = (
      <OtpForm
        formData={formData}
        setFormData={setFormData}
        setFormComponent={setFormComponent}
      />
    );
  } else if (formComponent === "new-password") {
    component = (
      <NewPassword
        formData={formData}
        setFormData={setFormData}
        setFormComponent={setFormComponent}
      />
    );
  }
  return <section className="auth">{component}</section>;
};

export default ResetPassword;
