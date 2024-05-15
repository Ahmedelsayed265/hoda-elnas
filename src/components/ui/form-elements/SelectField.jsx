import { Form } from "react-bootstrap";

export default function SelectField({ options, label, ...props }) {
  return (
    <div className="input-field">
      {label && <label htmlFor={props.id}>{label}</label>}
      <Form.Select {...props}>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}
