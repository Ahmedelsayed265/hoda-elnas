import { useTranslation } from "react-i18next";

export default function SelectField({ options, label, ...props }) {
  const { t } = useTranslation();
  return (
    <div className="input-field">
      {label && <label htmlFor={props.id}>{label}</label>}
      <select {...props}>
        <option selected value={""} disabled>
          {t("dashboard.choose")}
        </option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
