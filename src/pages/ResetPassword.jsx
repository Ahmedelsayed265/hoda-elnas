import React, { useState } from "react";
import OtpForm from "../components/auth/OtpForm";
import NewPassword from "../components/auth/NewPassword";
import ResetForm from "./../components/auth/ResetForm";

const ResetPassword = () => {
  const [formComponent, setFormComponent] = useState("phone");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  let component;
  if (formComponent === "phone") {
    component = (
      <ResetForm
        setFormComponent={setFormComponent}
        setEmail={setEmail}
        setPhone={setPhone}
      />
    );
  } else if (formComponent === "otp") {
    component = (
      <OtpForm
        setFormComponent={setFormComponent}
        eamil={email}
        phone={phone}
      />
    );
  } else if (formComponent === "new-password") {
    component = (
      <NewPassword
        eamil={email}
        phone={phone}
      />
    );
  }
  return <section className="auth">{component}</section>;
};

export default ResetPassword;
