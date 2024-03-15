import React, { useState } from "react";
import SectionHeader from "../components/layout/SectionHeader";
import { useTranslation } from "react-i18next";
import InputField from "../components/ui/form-elements/InputField";
import TextField from "../components/ui/form-elements/TextField";
import SubmitButton from './../components/ui/form-elements/SubmitButton';

const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const { t } = useTranslation();
  const backLinks = [
    {
      name: t("home"),
      path: "/"
    }
  ];
  return (
    <>
      <SectionHeader pageName={t("contact")} backLinks={backLinks} />
      <section className="contact_section">
        <div className="container">
          <div className="row m-0 justify-content-center">
            <div className="col-lg-10 col-12 p-2">
              <div className="form-ui">
                <div className="form_group">
                  <div className="form_group">
                    <InputField
                      label={t("auth.fullName")}
                      placeholder={t("auth.enterYourName")}
                      type="text"
                      htmlFor="full_name"
                      value={formData.full_name}
                      formData={formData}
                      id="full_name"
                      setFormData={setFormData}
                    />
                    <InputField
                      label={t("auth.email")}
                      placeholder={t("auth.emailPlaceHolder")}
                      type="email"
                      htmlFor="email"
                      value={formData.email}
                      formData={formData}
                      id="email"
                      setFormData={setFormData}
                    />
                  </div>
                </div>
                <div className="form_group">
                  <InputField
                    label={t("auth.phone")}
                    placeholder="0xxxxxxxxxxxx"
                    type="text"
                    htmlFor="phone"
                    value={formData.phone}
                    formData={formData}
                    id="phone"
                    setFormData={setFormData}
                  />
                  <InputField
                    label={t("auth.subject")}
                    placeholder={t("auth.enterSubject")}
                    type="text"
                    htmlFor="subject"
                    value={formData.subject}
                    formData={formData}
                    id="subject"
                    setFormData={setFormData}
                  />
                </div>
                <TextField
                  label={t("auth.message")}
                  placeholder={t("auth.message")}
                  htmlFor="message"
                  value={formData.message}
                  formData={formData}
                  id="message"
                  setFormData={setFormData}
                />
                <SubmitButton name={t("send")} loading={false} className="w-25 me-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
