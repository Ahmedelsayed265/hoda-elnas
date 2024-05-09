export default function SelectField({ options, label, ...props }) {
  return (
    <div className="input-field">
      {label && <label htmlFor={props.id}>{label}</label>}
      <select {...props}>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
