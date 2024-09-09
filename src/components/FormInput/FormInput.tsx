import { Form } from "react-bootstrap";

interface FormInputProps {
  title: string;
  type: "text" | "email" | "password" | "textarea";
  required?: boolean;
  id?: string;
  value: string | number;
  placeholder?: string;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
}

export default function FormInput({
  title,
  type,
  required,
  id,
  value,
  onChange,
  onBlur = () => {},
  placeholder,
  errorMessage,
  min,
  max,
}: FormInputProps): JSX.Element {
  id = id ? id : title;
  return (
    <>
      <Form.Label htmlFor={id}>{title}</Form.Label>
      <Form.Control
        type={type}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        min={min}
        max={max}
        as={type === "textarea" ? "textarea" : undefined}
      />
      <Form.Control.Feedback type="invalid">
        {required && !errorMessage ? "Required field" : errorMessage}
      </Form.Control.Feedback>
    </>
  );
}
