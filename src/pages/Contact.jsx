import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "../components/ui/form-elements/InputField";
import TextField from "../components/ui/form-elements/TextField";
import SubmitButton from "./../components/ui/form-elements/SubmitButton";
import axios from "./../util/axios";
import { toast } from "react-toastify";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const form = useRef(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/contact/", formData);
      if (res?.status === 200 || res?.status === 201) {
        toast.success(t("contactPage.success"));
        form.current.reset();
      } else {
        toast.error(t("contactPage.error"));
      }
    } catch (error) {
      toast.error(t("contactPage.error"));
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="contact_section">
      <div className="container">
        <div className="row m-0 justify-content-center">
          <div className="col-12 p-2">
            <h2 className="title">{t("contactPageTitle")}</h2>
          </div>
          <div className="col-lg-10 col-12 p-2">
            <form className="form-ui" ref={form} onSubmit={handleSubmit}>
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
              <SubmitButton
                name={t("send")}
                loading={loading}
                className="w-25 me-auto"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
