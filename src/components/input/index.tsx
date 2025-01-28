import { IFormatData } from "../../interface";
import styles from "./input.module.css";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  handleChange:  (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: Partial<IFormatData>;
}

export default function Input({ name, label, handleChange, errors, ...props }: IInputProps) {
  const hasError = errors && errors[name as keyof IFormatData];
  const labelClass = props.disabled ? styles.disabledLabel : '';

  return (
    <div className={`${styles.inputContainer} ${hasError ? styles.error : ""}`}>
      <label htmlFor={name} className={labelClass}>{label}</label>
      <input
        id={name}
        name={name}
        onChange={handleChange}
        aria-invalid={!!hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        {...props}
      />
      {hasError && (
        <p>
          {errors[name as keyof IFormatData]}
        </p>
      )}
    </div>
  );
}
